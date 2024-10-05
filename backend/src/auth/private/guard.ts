import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import authorizer from "src/utils/authorizer";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const headers = context.switchToHttp().getRequest<Request>().headers;
    const cookie = headers.cookie;
    const accessToken = cookie
      ?.split(";")
      ?.filter((c) => c.includes("accessToken="))[0]
      ?.split("accessToken=")[1];
    const auth = await authorizer({ accessToken });
    return Boolean(auth);
  }
}
