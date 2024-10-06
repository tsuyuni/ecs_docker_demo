import { fetchAuthSession } from "aws-amplify/auth/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "@utils/amplifyClientUsingReqRes";

export const middleware = async (
  request: NextRequest,
  response: NextResponse
) => {
  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      try {
        const authSession = await fetchAuthSession(contextSpec, {});
        return !!authSession.tokens;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });

  if (request.nextUrl.pathname !== "/login" && !authenticated) {
    request.nextUrl.pathname = "/login";
    return NextResponse.redirect(request.nextUrl);
  }
};

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};
