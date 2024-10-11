import { NextRequest, NextResponse } from "next/server";
import fetchAuthSession from "./utils/cognito/fetchAuthSession";

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next();
  const authSession = await fetchAuthSession(request, response);

  console.log(response);

  return response;
};

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};
