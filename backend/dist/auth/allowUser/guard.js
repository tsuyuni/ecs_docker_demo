"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowUserAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const authorizer_1 = require("../../utils/authorizer");
let AllowUserAuthGuard = class AllowUserAuthGuard {
    async canActivate(context) {
        const headers = context.switchToHttp().getRequest().headers;
        const cookie = headers.cookie;
        const accessToken = cookie
            ?.split(";")
            ?.filter((c) => c.includes("accessToken="))[0]
            ?.split("accessToken=")[1];
        const auth = await (0, authorizer_1.default)({ accessToken });
        const groups = auth["cognito:groups"];
        return groups.includes("users");
    }
};
exports.AllowUserAuthGuard = AllowUserAuthGuard;
exports.AllowUserAuthGuard = AllowUserAuthGuard = __decorate([
    (0, common_1.Injectable)()
], AllowUserAuthGuard);
//# sourceMappingURL=guard.js.map