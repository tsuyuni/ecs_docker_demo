import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import authorizer from "@utils/authorizer";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const headers = request.headers;
    const cookie = headers.cookie;
    const auth = await authorizer({ cookie });
    if (auth) {
      request["guard"] = auth;
      return true;
    }
    return false;
  }
}
