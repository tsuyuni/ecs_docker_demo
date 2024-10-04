declare const authorizer: ({ accessToken }: {
    accessToken: string;
}) => Promise<import("aws-jwt-verify/jwt-model").CognitoAccessTokenPayload>;
export default authorizer;
