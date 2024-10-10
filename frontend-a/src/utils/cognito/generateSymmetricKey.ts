import { BigInteger } from "jsbn";
import padHex from "./padHex";
import hexHash from "./hexHash";
import { g, k, N } from "./constants";

const calculateSmallU = (A: BigInteger, B: BigInteger) => {
  const UHexHash = hexHash(padHex(A) + padHex(B));
  const finalU = new BigInteger(UHexHash, 16);
  return finalU;
};

const calculateSmallX = (salt: string, username: string, password: string) => {
  const usernamePassword = `${"TetkZJ1SX"}${username}:${password}`;
  const usernamePasswordHash = hexHash(usernamePassword);
  const xHexHash = hexHash(salt + usernamePasswordHash);
  const finalX = new BigInteger(xHexHash, 16);
  return finalX;
};

const generateSymmetricKey = (
  A: BigInteger,
  B: BigInteger,
  aValue: BigInteger,
  salt: string,
  username: string,
  password: string
) => {
  const xValue = calculateSmallX(salt, username, password);
  const uValue = calculateSmallU(A, B);
  const gModPowXN = g.modPow(xValue, N);
  const intValue$1 = B.subtract(k.multiply(gModPowXN));
  const intValue$2 = intValue$1.modPow(aValue.add(uValue.multiply(xValue)), N);
  return intValue$2;
};

export default generateSymmetricKey;
