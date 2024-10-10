import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import authorizer from "@utils/authorizer";

@Injectable()
export class AllowUserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const headers = context.switchToHttp().getRequest<Request>().headers;
    const cookie = headers.cookie;
    const auth = await authorizer({ cookie });
    if (auth) {
      const groups = auth["cognito:groups"];
      if (groups?.includes("users")) {
        return true;
      }
    }
    return false;
  }
}
