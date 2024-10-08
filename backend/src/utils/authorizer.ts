import { CognitoJwtVerifier } from "aws-jwt-verify";

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID!,
  tokenUse: "access",
  clientId: process.env.COGNITO_USER_POOL_CLIENT_ID!,
});

const authorizer = async ({ accessToken }: { accessToken: string }) => {
  try {
    const payload = await verifier.verify(accessToken);
    console.log(payload);
    return payload;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default authorizer;
