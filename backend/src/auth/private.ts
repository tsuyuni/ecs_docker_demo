import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import authorizer from "@utils/authorizer";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const headers = request.headers;
    const cookie = headers.cookie;
    const accessToken = cookie
      ?.split(";")
      ?.filter((c) => c.includes("accessToken="))[0]
      ?.split("accessToken=")[1];
    const auth = await authorizer({ accessToken });
    request["guard"] = auth;
    return Boolean(auth);
  }
}
