import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { watchPartyRouter } from "./routers/watchPartyRouter";
import { engagementRouter } from "./routers/engagementRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  watchParty: watchPartyRouter,
  engagement: engagementRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
