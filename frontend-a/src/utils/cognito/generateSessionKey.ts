import { BigInteger } from "jsbn";
import { g, k, N } from "./constants";
import hexHash from "./hexHash";
import padHex from "./padHex";

const calculateS = (
  aValue: BigInteger,
  UValue: BigInteger,
  xValue: BigInteger,
  serverBValue: BigInteger
) => {
  const gModPowXN = g.modPow(xValue, N);
  const intValue$1 = serverBValue.subtract(k.multiply(gModPowXN));
  const intValue$2 = intValue$1.modPow(aValue.add(UValue.multiply(xValue)), N);
  return intValue$2.mod(N);
};

const generateSessionKey = (
  aValue: BigInteger,
  UValue: BigInteger,
  xValue: BigInteger,
  serverBValue: BigInteger
) => {
  const SValue = calculateS(aValue, UValue, xValue, serverBValue);
  const SHexHash = hexHash(padHex(SValue));
  return new BigInteger(SHexHash, 16);
};

export default generateSessionKey;
