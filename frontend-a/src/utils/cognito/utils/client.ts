import { z } from "zod";
import {
  RespondToAuthChallenge,
  ClientResponse,
  InitiateAuthUserSrpAuth,
  InitiateAuthRefreshTokenAuth,
} from "../types";

async function request(
  operation: "InitiateAuth",
  params: { AuthFlow: "USER_SRP_AUTH"; [key: string]: any }
): Promise<z.infer<typeof InitiateAuthUserSrpAuth>>;
async function request(
  operation: "InitiateAuth",
  params: { AuthFlow: "REFRESH_TOKEN_AUTH"; [key: string]: any }
): Promise<z.infer<typeof InitiateAuthRefreshTokenAuth>>;
async function request(
  operation: "RespondToAuthChallenge",
  params: { [key: string]: any }
): Promise<z.infer<typeof RespondToAuthChallenge>>;
async function request(
  operation: "InitiateAuth" | "RespondToAuthChallenge",
  params: { [key: string]: any }
) {
  const res = await fetch("https://cognito-idp.ap-northeast-1.amazonaws.com/", {
    method: "POST",
    mode: "cors",
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/x-amz-json-1.1",
      "X-Amz-Target": `AWSCognitoIdentityProviderService.${operation}`,
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error("Cognito request error");
  }

  const data = await res.json();

  console.log(data);

  const { data: safeData, error } = ClientResponse.safeParse(data);

  if (error) {
    throw new Error("Failed to parse response");
  }

  return safeData;
}

const client = {
  request,
};

export default client;
