import { BigInteger } from "jsbn";
import { N } from "./constants";
import calculateU from "./calculateU";
import { createHash } from "crypto";
import hexHash from "./hexHash";
import padHex from "./padHex";
import calculateS from "./calculateS";
import computehkdf from "./computehkdf";

const getPasswordAuthenticationKey = (
  username: string,
  password: string,
  smallAValue: BigInteger,
  largeAValue: BigInteger,
  serverBValue: BigInteger,
  salt: BigInteger
) => {
  if (serverBValue.mod(N).equals(BigInteger.ZERO)) {
    throw new Error("B cannot be zero.");
  }

  const UValue = calculateU(largeAValue, serverBValue);

  if (UValue.equals(BigInteger.ZERO)) {
    throw new Error("U cannot be zero.");
  }

  const usernamePassword = `${process.env.NEXT_PUBLIC_USER_POOL_NAME}${username}:${password}`;
  const hash = createHash("sha256");
  hash.update(usernamePassword);
  const usernamePasswordHash = hash.digest("hex");

  const xValue = new BigInteger(
    hexHash(padHex(salt) + usernamePasswordHash),
    16
  );

  const sValue = calculateS(smallAValue, UValue, xValue, serverBValue);

  const hkdf = computehkdf(
    Buffer.from(padHex(sValue), "hex"),
    Buffer.from(padHex(UValue), "hex")
  );

  return hkdf;
};

export default getPasswordAuthenticationKey;
