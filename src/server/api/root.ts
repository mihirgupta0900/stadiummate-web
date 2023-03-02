import { createTRPCRouter, getFirebaseUserFromHeader } from "~/server/api/trpc";
import { watchPartyRouter } from "./routers/watchPartyRouter";
import { engagementRouter } from "./routers/engagementRouter";
import { type NextApiRequest } from "next";
import { prisma } from "../db";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  watchParty: watchPartyRouter,
  engagement: engagementRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const getAuthorizedCaller = async (req: NextApiRequest) => {
  const idToken = await getFirebaseUserFromHeader(req);

  return appRouter.createCaller({
    idToken,
    prisma,
  });
};
