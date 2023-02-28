import type { QnA, Slide } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export enum EngagementType {
  QnA = "QnA",
  Slide = "slide",
}

export type Engagement =
  | { type: EngagementType.QnA; data: QnA }
  | {
      type: EngagementType.Slide;
      data: Slide;
    };

export const engagementRouter = createTRPCRouter({
  getAvailable: protectedProcedure.query(async ({ ctx }) => {
    const [qnAs, slides] = await Promise.all([
      prisma.qnA.findMany({
        where: {
          AND: [
            {
              active: true,
            },
            {
              QnAResponses: {
                some: {
                  userId: {
                    not: ctx.session.user.id,
                  },
                },
              },
            },
          ],
        },
      }),
      prisma.slide.findMany({
        where: {
          AND: [
            {
              active: true,
            },
            {
              SlideSeen: {
                some: {
                  userId: {
                    not: ctx.session.user.id,
                  },
                },
              },
            },
          ],
        },
      }),
    ]);

    const engagements: Engagement[] = [];
    qnAs.forEach((qna) => {
      engagements.push({ data: qna, type: EngagementType.QnA });
    });
    slides.forEach((slide) => {
      engagements.push({ data: slide, type: EngagementType.Slide });
    });

    return engagements;
  }),
  respondToQnA: protectedProcedure
    .input(
      z.object({
        qnaId: z.string(),
        response: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await prisma.qnAResponses.create({
        data: {
          qnaId: input.qnaId,
          userId: ctx.session.user.id,
          response: input.response,
        },
      });

      return { success: true };
    }),
  seeSlide: protectedProcedure
    .input(
      z.object({
        slideId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await prisma.slideSeen.create({
        data: {
          slideId: input.slideId,
          userId: ctx.session.user.id,
        },
      });

      return { success: true };
    }),
});
