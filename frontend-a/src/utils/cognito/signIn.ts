"use client";

import { SignInInput } from "./types";
import generateRandomSmallA from "./utils/generateRandomSmallA";
import calculateA from "./utils/calculateA";
import client from "./utils/client";
import { BigInteger } from "jsbn";
import getPasswordAuthenticationKey from "./utils/getPasswordAuthenticationKey";
import getNowString from "./utils/getNowString";
import { createHmac } from "crypto";
import Cookies from "js-cookie";

const signIn = async ({ email, password }: SignInInput) => {
  const smallAValue = generateRandomSmallA();
  const largeAValue = calculateA(smallAValue);

  const { ChallengeParameters } = await client.request("InitiateAuth", {
    AuthFlow: "USER_SRP_AUTH",
    ClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      SRP_A: largeAValue.toString(16),
    },
  });

  const serverBValue = new BigInteger(ChallengeParameters.SRP_B, 16);
  const salt = new BigInteger(ChallengeParameters.SALT, 16);

  const hkdf = getPasswordAuthenticationKey(
    ChallengeParameters.USER_ID_FOR_SRP,
    password,
    smallAValue,
    largeAValue,
    serverBValue,
    salt
  );

  const dateNow = getNowString();

  const bufUPIDaToB = Buffer.from(
    process.env.NEXT_PUBLIC_USER_POOL_NAME!,
    "utf-8"
  );
  const bufUNaToB = Buffer.from(ChallengeParameters.USER_ID_FOR_SRP, "utf-8");
  const bufSBaToB = Buffer.from(ChallengeParameters.SECRET_BLOCK, "base64");
  const bufDNaToB = Buffer.from(dateNow, "utf-8");

  const bufConcat = Buffer.concat([
    bufUPIDaToB,
    bufUNaToB,
    bufSBaToB,
    bufDNaToB,
  ]);

  const hmac = createHmac("sha256", hkdf);
  hmac.update(bufConcat);
  const resultFromCrypto = hmac.digest();
  const signatureString = resultFromCrypto.toString("base64");

  const { AuthenticationResult } = await client.request(
    "RespondToAuthChallenge",
    {
      ChallengeName: "PASSWORD_VERIFIER",
      ClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
      ChallengeResponses: {
        USERNAME: ChallengeParameters.USER_ID_FOR_SRP,
        PASSWORD_CLAIM_SECRET_BLOCK: ChallengeParameters.SECRET_BLOCK,
        TIMESTAMP: dateNow,
        PASSWORD_CLAIM_SIGNATURE: signatureString,
      },
    }
  );

  console.log(AuthenticationResult);

  Cookies.set(
    `CognitoIdentityServiceProvider.${process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID}.LastAuthUser`,
    ChallengeParameters.USER_ID_FOR_SRP,
    {
      secure: true,
      sameSite: "Lax",
      expires: 365,
    }
  );
  Cookies.set(
    `CognitoIdentityServiceProvider.${process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID}.${ChallengeParameters.USER_ID_FOR_SRP}.accessToken`,
    AuthenticationResult.AccessToken,
    {
      secure: true,
      sameSite: "Lax",
      expires: 365,
    }
  );
  Cookies.set(
    `CognitoIdentityServiceProvider.${process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID}.${ChallengeParameters.USER_ID_FOR_SRP}.idToken`,
    AuthenticationResult.IdToken,
    {
      secure: true,
      sameSite: "Lax",
      expires: 365,
    }
  );
  Cookies.set(
    `CognitoIdentityServiceProvider.${process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID}.${ChallengeParameters.USER_ID_FOR_SRP}.refreshToken`,
    AuthenticationResult.RefreshToken,
    {
      secure: true,
      sameSite: "Lax",
      expires: 365,
    }
  );
};

export default signIn;
