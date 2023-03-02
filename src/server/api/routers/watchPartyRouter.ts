import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createWatchPartySchema } from "~/pages/watchparty";
import { prisma } from "~/server/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const watchPartyRouter = createTRPCRouter({
  getAll: publicProcedure
    .meta({ openapi: { method: "GET", path: "/watchParty/getAll" } })
    .input(z.undefined())
    .output(
      z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          time: z.date(),
          capacity: z.number(),
          hostId: z.string(),
          createdAt: z.date(),
          updatedAt: z.date(),
          coverImage: z.string(),
          location: z.string(),
          cost: z.number(),
          // attendees: z.array(
          //   z
          //     .object({
          //       id: z.string(),
          //       // watchPartyId: z.string(),
          //       createdAt: z.string(),
          //       updatedAt: z.string(),
          //       email: z.string(),
          //       name: z.string(),
          //       image: z.string(),
          //       watchPartiesHosting: z.any(),
          //       watchPartiesAttending: z.any(),

          //     })
          //     .passthrough()
          // ),
          attendees: z.array(z.any()),
        })
      )
    )
    .query(async () => {
      const watchParties = await prisma.watchParty.findMany({
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

      return watchParties;
    }),
  create: protectedProcedure
    .input(createWatchPartySchema)
    .mutation(async ({ input, ctx }) => {
      const watchParty = await prisma.watchParty.create({
        data: {
          ...input,
          hostId: ctx.idToken.uid,
        },
      });

      // award token

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
              id: ctx.idToken.uid,
            },
          },
        },
      });

      // award token
    }),
  test: protectedProcedure
    .meta({ openapi: { method: "GET", path: "/test", protect: true } })
    .input(z.undefined())
    .output(z.string())
    .query(({ ctx }) => {
      return ctx.idToken.uid;
    }),
});
