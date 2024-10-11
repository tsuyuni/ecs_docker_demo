import { BigInteger } from "jsbn";
import { g, k, N } from "./constants";

const calculateS = (
  smallAValue: BigInteger,
  UValue: BigInteger,
  xValue: BigInteger,
  serverBValue: BigInteger
) => {
  const gModPowXN = g.modPow(xValue, N);
  const intValue = serverBValue.subtract(k.multiply(gModPowXN));
  const result = intValue.modPow(smallAValue.add(UValue.multiply(xValue)), N);
  return result;
};

export default calculateS;
