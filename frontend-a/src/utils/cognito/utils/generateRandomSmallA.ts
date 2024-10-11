import { randomBytes } from "crypto";
import { BigInteger } from "jsbn";

const generateRandomSmallA = () => {
  const hexRandom = randomBytes(128).toString("hex");
  const randomBigInt = new BigInteger(hexRandom, 16);
  return randomBigInt;
};

export default generateRandomSmallA;
