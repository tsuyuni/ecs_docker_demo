import { NextRequest, NextResponse } from "next/server";
import CognitoAccessToken from "./utils/CognitoAccessToken";
import CognitoRefreshToken from "./utils/CognitoRefreshToken";
import CognitoUserSession from "./utils/CognitoUserSession";
import refreshSession from "./utils/refreshSession";

const fetchAuthSession = async (
  request: NextRequest,
  response: NextResponse
) => {
  const lastAuthUserCookie = request.cookies.get(
    `CognitoIdentityServiceProvider.${process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID}.LastAuthUser`
  );

  if (!lastAuthUserCookie?.value) {
    return null;
  }

  const accessTokenCookie = request.cookies.get(
    `CognitoIdentityServiceProvider.${process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID}.${lastAuthUserCookie.value}.accessToken`
  );
  const idTokenCookie = request.cookies.get(
    `CognitoIdentityServiceProvider.${process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID}.${lastAuthUserCookie.value}.idToken`
  );
  const refreshTokenCookie = request.cookies.get(
    `CognitoIdentityServiceProvider.${process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID}.${lastAuthUserCookie.value}.refreshToken`
  );

  if (!accessTokenCookie?.value || !idTokenCookie?.value) {
    return null;
  }

  const accessToken = new CognitoAccessToken(accessTokenCookie.value);
  const idToken = new CognitoAccessToken(idTokenCookie.value);
  const refreshToken = new CognitoRefreshToken(refreshTokenCookie?.value);

  const userSession = new CognitoUserSession({
    IdToken: idToken,
    RefreshToken: refreshToken,
    AccessToken: accessToken,
  });

  if (userSession.isValid()) {
    return userSession;
  }

  if (userSession.refreshToken.token) {
    await refreshSession(refreshToken, lastAuthUserCookie.value, response);
  }
};

export default fetchAuthSession;
