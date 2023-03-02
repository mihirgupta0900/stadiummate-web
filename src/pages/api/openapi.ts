import { type NextApiRequest, type NextApiResponse } from "next";
import { generateOpenApiDocument } from "trpc-openapi";
import { appRouter } from "~/server/api/root";

/* 👇 */
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "tRPC OpenAPI",
  version: "1.0.0",
  baseUrl: "http://localhost:3000",
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json(openApiDocument);
}
