import { z } from "zod";
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
    .input(z.object({}))
    .mutation(async ({ input, ctx }) => {
      //   ctx.session.user.
      //
    }),
});
