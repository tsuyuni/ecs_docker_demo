import { CognitoJwtVerifier } from "aws-jwt-verify";

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID!,
  tokenUse: "access",
  clientId: process.env.COGNITO_USER_POOL_CLIENT_ID!,
});

const authorizer = async ({ cookie }: { cookie: string }) => {
  try {
    const lastAuthUser = cookie.replace(
      new RegExp(
        `^.*CognitoIdentityServiceProvider.${process.env.COGNITO_USER_POOL_CLIENT_ID}.LastAuthUser=(.*?);.*$`
      ),
      "$1"
    );
    const accessToken = cookie.replace(
      new RegExp(
        `^.*CognitoIdentityServiceProvider.${process.env.COGNITO_USER_POOL_CLIENT_ID}.${lastAuthUser}.accessToken=(.*?);.*$`
      ),
      "$1"
    );
    const payload = await verifier.verify(accessToken);
    return payload;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default authorizer;
