import { z } from "zod";
import { createWatchPartySchema } from "~/pages/watchparty";
import { prisma } from "~/server/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const watchPartyRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return prisma.watchParty.findMany({
      orderBy: {
        createdAt: "desc",
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

      return watchParty;
    }),
});
