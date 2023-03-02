import { createOpenApiNextHandler } from "trpc-openapi";
import { appRouter } from "~/server/api/root";
import { getFirebaseUserFromHeader } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { initFirebaseAdmin } from "~/utils/firebaseAdmin";

initFirebaseAdmin();

export default createOpenApiNextHandler({
  router: appRouter,
  createContext: async ({ req }) => {
    const idToken = await getFirebaseUserFromHeader(req);

    return {
      idToken,
      prisma,
    };
  },
});
