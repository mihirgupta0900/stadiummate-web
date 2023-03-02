import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { type NextApiResponse } from "next";

export const handleError = (res: NextApiResponse, error: unknown) => {
  if (error instanceof TRPCError) {
    return res
      .status(getHTTPStatusCodeFromError(error))
      .json({ message: error.message });
  } else {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
