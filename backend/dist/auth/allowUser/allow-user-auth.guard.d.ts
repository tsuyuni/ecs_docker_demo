import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class AllowUserAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
