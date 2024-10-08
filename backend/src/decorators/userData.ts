import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserData = createParamDecorator(
  (property: "sub", context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const data = request["guard"];
    return data[property];
  }
);
