import { InitiateAuth, RespondToAuthChallenge } from "../types";

const client = {
  initiateAuth: async (params: any) => {
    const res = await fetch(
      "https://cognito-idp.ap-northeast-1.amazonaws.com/",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "application/x-amz-json-1.1",
          "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
        },
        body: JSON.stringify(params),
      }
    );

    if (!res.ok) {
      throw new Error("Cognito request error");
    }

    const data = await res.json();

    const { data: safeData, error } = InitiateAuth.safeParse(data);

    if (error) {
      throw new Error("Failed to parse response");
    }

    if (safeData.ChallengeName !== "PASSWORD_VERIFIER") {
      throw new Error("Unexpected challenge name");
    }

    return safeData;
  },

  respondToAuthChallenge: async (params: any) => {
    const res = await fetch(
      "https://cognito-idp.ap-northeast-1.amazonaws.com/",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "application/x-amz-json-1.1",
          "X-Amz-Target":
            "AWSCognitoIdentityProviderService.RespondToAuthChallenge",
        },
        body: JSON.stringify(params),
      }
    );

    if (!res.ok) {
      throw new Error("Cognito request error");
    }

    const data = await res.json();

    const { data: safeData, error } = RespondToAuthChallenge.safeParse(data);

    if (error) {
      throw new Error("Failed to parse response");
    }

    return safeData;
  },
};

export default client;
