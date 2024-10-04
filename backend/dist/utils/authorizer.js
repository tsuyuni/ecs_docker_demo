"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_jwt_verify_1 = require("aws-jwt-verify");
const verifier = aws_jwt_verify_1.CognitoJwtVerifier.create({
    userPoolId: "ap-northeast-1_9paDaYdg8",
    tokenUse: "access",
    clientId: "6bm8sl7k778ak37e40cbgk16ca",
});
const authorizer = async ({ accessToken }) => {
    try {
        const payload = await verifier.verify(accessToken);
        console.log("Token is valid. Payload:", payload);
        return payload;
    }
    catch (err) {
        console.log("Token not valid!", err);
        return null;
    }
};
exports.default = authorizer;
//# sourceMappingURL=authorizer.js.map