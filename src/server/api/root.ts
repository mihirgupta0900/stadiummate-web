import { createTRPCRouter } from "~/server/api/trpc";
import { watchPartyRouter } from "./routers/watchPartyRouter";
import { engagementRouter } from "./routers/engagementRouter";
import { voiceRouter } from "./routers/voiceRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  watchParty: watchPartyRouter,
  engagement: engagementRouter,
  voice: voiceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
