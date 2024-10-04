import { CognitoJwtVerifier } from "aws-jwt-verify";

const verifier = CognitoJwtVerifier.create({
  userPoolId: "ap-northeast-1_9paDaYdg8",
  tokenUse: "access",
  clientId: "6bm8sl7k778ak37e40cbgk16ca",
});

const authorizer = async ({ accessToken }: { accessToken: string }) => {
  try {
    const payload = await verifier.verify(accessToken);
    console.log("Token is valid. Payload:", payload);
    return payload;
  } catch (err) {
    console.log("Token not valid!", err);
    return null;
  }
};

export default authorizer;
