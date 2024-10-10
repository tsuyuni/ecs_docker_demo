import generateKeyPair from "@utils/cognito/generateKeyPair";
import getSignatureString from "./getSignatureString";
import generateSymmetricKey from "./generateSymmetricKey";
import { BigInteger } from "jsbn";

export const signIn = async () => {
  try {
    const { a, A } = generateKeyPair();

    const res = await fetch(
      "https://cognito-idp.ap-northeast-1.amazonaws.com/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-amz-json-1.1",
          "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
          Accept: "*/*",
          Host: "cognito-idp.ap-northeast-1.amazonaws.com",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
        },
        body: JSON.stringify({
          AuthFlow: "USER_SRP_AUTH",
          ClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
          AuthParameters: {
            CHALLENGE_NAME: "SRP_A",
            USERNAME: "yuri.tsuchikawa@mairutech.com",
            SRP_A: A.toString(16),
          },
        }),
      }
    );

    if (!res.ok) throw new Error("Failed to initiate auth");

    const data = await res.json();

    const { SALT, SECRET_BLOCK, SRP_B, USERNAME, USER_ID_FOR_SRP } =
      data.ChallengeParameters;

    console.log(SALT, SECRET_BLOCK, SRP_B, USERNAME, USER_ID_FOR_SRP);

    const symmetricKey = generateSymmetricKey(
      A,
      new BigInteger(SRP_B, 16),
      a,
      SALT,
      "yuri.tsuchikawa@mairutech.com",
      "Pass1014"
    );

    const { dateNow, signatureString } = getSignatureString(
      "TetkZJ1SX",
      "yuri.tsuchikawa@mairutech.com",
      SECRET_BLOCK,
      "sValue",
      "uValue"
    );

    const res2 = await fetch(
      "https://cognito-idp.ap-northeast-1.amazonaws.com/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-amz-json-1.1",
          "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
          Accept: "*/*",
          Host: "cognito-idp.ap-northeast-1.amazonaws.com",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
        },
        body: JSON.stringify({
          ChallengeName: "PASSWORD_VERIFIER",
          ChallengeResponses: {
            PASSWORD_CLAIM_SIGNATURE: signatureString,
            PASSWORD_CLAIM_SECRET_BLOCK: SECRET_BLOCK,
            TIMESTAMP: dateNow,
            USERNAME: "yuri.tsuchikawa@mairutech.com",
          },
          ClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
        }),
      }
    );

    console.log(res2);
  } catch (err) {
    console.error(err);
  }
};
