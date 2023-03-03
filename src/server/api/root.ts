import { createTRPCRouter } from "~/server/api/trpc";
import { watchPartyRouter } from "./routers/watchPartyRouter";
import { engagementRouter } from "./routers/engagementRouter";
import { userRouter } from "./routers/userRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  watchParty: watchPartyRouter,
  engagement: engagementRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
