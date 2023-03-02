import axios from "axios";
import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { v4 } from "uuid";

export const voiceRouter = createTRPCRouter({
  getToken: publicProcedure
    .input(
      z.object({
        role: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return axios
        .post(`${env.TOKEN_ENDPOINT}api/token`, {
          user_id: v4(),
          room_id: env.ROOM_ID,
          role: input.role,
        })
        .then((res) =>
          z
            .object({
              token: z.string(),
            })
            .parse(res.data)
        );
    }),
});
