import { type Address } from "abitype";
import { ethers } from "ethers";
import { env } from "process";
import { addWalletSchema } from "~/components/shared/Sidebar";
import { prisma } from "~/server/db";
import { FAN_TOKEN_ADDRESS } from "~/utils/contants";
import { fanTokenAbi, mintToken } from "~/utils/fanToken";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure.query(({ ctx }) =>
    prisma.user.findUnique({ where: { id: ctx.session.user.id } })
  ),
  addWalletAddress: protectedProcedure
    .input(addWalletSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          walletAddress: input.walletAddress,
        },
      });
      return user;
    }),
  getTokenBalance: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });
    if (!user?.walletAddress) {
      return BigInt(0);
    }

    const provider = new ethers.JsonRpcProvider(env.NEXT_PUBLIC_RPC_URL);
    const contract = new ethers.Contract(
      FAN_TOKEN_ADDRESS,
      fanTokenAbi,
      provider
    );
    return contract.balanceOf?.(user.walletAddress) as Promise<bigint>;
  }),
  awardToken: protectedProcedure.mutation(async ({ ctx }) => {
    // award token
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        walletAddress: true,
      },
    });

    let txHash: string | undefined;
    if (user?.walletAddress) {
      const tx = await mintToken(user.walletAddress as Address, BigInt(10e18));
      txHash = tx.hash;
    }

    return {
      txHash,
    };
  }),
});
