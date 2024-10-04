import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import authorizer from "@utils/authorizer";

@Injectable()
export class AllowUserAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const headers = context.switchToHttp().getRequest<Request>().headers;
    const cookie = headers.cookie;
    const accessToken = cookie
      ?.split(";")
      ?.filter((c) => c.includes("accessToken="))[0]
      ?.split("accessToken=")[1];
    const auth = await authorizer({ accessToken });
    const groups = auth["cognito:groups"];
    return groups.includes("users");
  }
}
