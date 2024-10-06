import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingReqRes } from "@aws-amplify/adapter-nextjs/api";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: {
      Cognito: {
        userPoolId: "ap-northeast-1_TetkZJ1SX",
        userPoolClientId: "4ocbog7c71hmnf9707dgv2bvte",
      },
    },
  },
});

export const reqResBasedClient = generateServerClientUsingReqRes({
  config: {
    Auth: {
      Cognito: {
        userPoolId: "ap-northeast-1_TetkZJ1SX",
        userPoolClientId: "4ocbog7c71hmnf9707dgv2bvte",
      },
    },
  },
});
