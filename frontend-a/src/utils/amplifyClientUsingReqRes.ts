import config from "@/config";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingReqRes } from "@aws-amplify/adapter-nextjs/api";

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export const reqResBasedClient = generateServerClientUsingReqRes({
  config,
});
