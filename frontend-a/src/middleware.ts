// import { fetchAuthSession } from "aws-amplify/auth/server";
import {
  CognitoRefreshToken,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import ServerCookieStorage from "@utils/serverCookieStorage";
// import { cognitoUserPool } from "./utils/cognitoUserPool";

export const middleware = async (request: NextRequest) => {};

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};
