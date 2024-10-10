import createClient from "openapi-fetch";
import { paths } from "@backend/schema";
import { cookies } from "next/headers";

export const client = createClient<paths>({
  baseUrl: `http://backend:8080`,
  headers: {
    "Content-Type": "application/json",
    Cookie: cookies().toString(),
  },
  cache: "no-cache",
});
