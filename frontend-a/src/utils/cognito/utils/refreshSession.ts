import CognitoRefreshToken from "./CognitoRefreshToken";
import client from "./client";
import { NextResponse } from "next/server";

const refreshSession = async (
  refreshToken: CognitoRefreshToken,
  username: string,
  response: NextResponse
) => {
  const { AuthenticationResult } = await client.request("InitiateAuth", {
    ClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
    AuthFlow: "REFRESH_TOKEN_AUTH",
    AuthParameters: {
      REFRESH_TOKEN: refreshToken.token,
    },
  });

  response.cookies.set({
    name: `CognitoIdentityServiceProvider.${process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID}.LastAuthUser`,
    value: username,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  response.cookies.set({
    name: `CognitoIdentityServiceProvider.${process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID}.${username}.refreshToken`,
    value: refreshToken.token,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  response.cookies.set({
    name: `CognitoIdentityServiceProvider.${process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID}.${username}.accessToken`,
    value: AuthenticationResult.AccessToken,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  response.cookies.set({
    name: `CognitoIdentityServiceProvider.${process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID}.${username}.idToken`,
    value: AuthenticationResult.IdToken,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
};

export default refreshSession;
