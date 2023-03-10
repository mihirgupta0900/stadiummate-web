import { TRPCError } from "@trpc/server";
import { type Address } from "abitype";
import { z } from "zod";
import { createWatchPartySchema } from "~/pages/watchparty";
import { prisma } from "~/server/db";
import { mintToken } from "~/utils/fanToken";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const watchPartyRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return prisma.watchParty.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        time: {
          gt: new Date(),
        },
      },
      include: {
        attendees: true,
      },
    });
  }),
  create: protectedProcedure
    .input(createWatchPartySchema)
    .mutation(async ({ input, ctx }) => {
      const watchParty = await prisma.watchParty.create({
        data: {
          ...input,
          hostId: ctx.session.user.id,
        },
      });

      // const user = await prisma.user.findUnique({
      //   where: {
      //     id: ctx.session.user.id,
      //   },
      //   select: {
      //     walletAddress: true,
      //   },
      // });

      // let txHash: string | undefined;
      // if (user?.walletAddress) {
      //   const tx = await mintToken(
      //     user.walletAddress as Address,
      //     BigInt(10e18)
      //   );
      //   txHash = tx.hash;
      // }

      // return { watchParty, txHash };
      return watchParty;
    }),

  join: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const watchParty = await prisma.watchParty.findUnique({
        where: {
          id: input.id,
        },
        include: {
          attendees: true,
        },
      });

      if (!watchParty) {
        throw new Error("Watch party not found");
      }

      if (watchParty.capacity <= watchParty.attendees.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Watch party is full",
        });
      }

      await prisma.watchParty.update({
        where: {
          id: input.id,
        },
        data: {
          attendees: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });

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
        const tx = await mintToken(
          user.walletAddress as Address,
          BigInt(10e18)
        );
        txHash = tx.hash;
      }

      return {
        txHash,
      };
    }),
});
