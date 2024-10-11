import { createHmac } from "crypto";

const infoBits = Buffer.from("Caldera Derived Key", "utf8");

const computehkdf = (ikm: Buffer, salt: Buffer) => {
  const infoBitsBuffer = Buffer.concat([
    infoBits,
    Buffer.from(String.fromCharCode(1), "utf8"),
  ]);

  const hash$1 = createHmac("sha256", salt);
  hash$1.update(ikm);
  const prk = hash$1.digest();

  const hash$2 = createHmac("sha256", prk);
  hash$2.update(infoBitsBuffer);
  const okm = hash$2.digest();

  const currentHex = okm.slice(0, 16);

  return currentHex;
};

export default computehkdf;
