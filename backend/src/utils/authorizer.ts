import { CognitoJwtVerifier } from "aws-jwt-verify";

const verifier = CognitoJwtVerifier.create({
  userPoolId: "ap-northeast-1_TetkZJ1SX",
  tokenUse: "access",
  clientId: "4ocbog7c71hmnf9707dgv2bvte",
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
