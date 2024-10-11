import { BigInteger } from "jsbn";
import { g, N } from "./constants";

const calculateA = (a: BigInteger) => {
  const A = g.modPow(a, N);

  if (A.equals(BigInteger.ZERO)) {
    throw new Error("Illegal paramater. A mod N cannot be 0.");
  }

  return A;
};

export default calculateA;
