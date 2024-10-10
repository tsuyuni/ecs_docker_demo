import { BigInteger } from "jsbn";
import { randomBytes } from "crypto";
import { g, N } from "./constants";

const generateRandomSmallA = () => {
  const hexRandom = randomBytes(128).toString("hex");
  const randomBigInt = new BigInteger(hexRandom, 16);
  return randomBigInt;
};

const calculateA = () => {
  const a = generateRandomSmallA();
  const A = g.modPow(a, N);
  if (A.equals(BigInteger.ZERO))
    throw new Error("Illegal paramater. A mod N cannot be 0.");
  return { a, A };
};

export default calculateA;
