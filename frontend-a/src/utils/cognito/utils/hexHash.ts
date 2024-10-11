import { createHash } from "crypto";

const hash = (buf: Buffer) => {
  const hash = createHash("sha256");
  hash.update(buf);
  const hexHash = hash.digest("hex");
  return hexHash;
};

const hexHash = (hexStr: string) => {
  return hash(Buffer.from(hexStr, "hex"));
};

export default hexHash;
