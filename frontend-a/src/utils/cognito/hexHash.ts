import { createHash } from "crypto";

const hexHash = (hexStr: string) => {
  const hash = createHash("sha256");
  hash.update(hexStr);
  const hexHash = hash.digest("hex");
  return hexHash;
};

export default hexHash;
