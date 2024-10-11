import { BigInteger } from "jsbn";
import padHex from "./padHex";
import hexHash from "./hexHash";

const calculateU = (A: BigInteger, B: BigInteger) => {
  const UHexHash = hexHash(padHex(A) + padHex(B));
  const finalU = new BigInteger(UHexHash, 16);
  return finalU;
};

export default calculateU;
