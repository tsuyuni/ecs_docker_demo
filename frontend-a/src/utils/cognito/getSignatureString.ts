import { createHmac } from "crypto";
import padHex from "./padHex";
import { BigInteger } from "jsbn";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;
const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const infoBits = Buffer.from("Caldera Derived Key", "utf8");

const computehkdf = (ikm: Buffer, salt: Buffer) => {
  const infoBitsBuffer = Buffer.concat([
    infoBits,
    Buffer.from(String.fromCharCode(1), "utf8"), // カウンタを結合
  ]);

  const signer = createHmac("sha256", salt);
  signer.update(ikm);
  const prk = signer.digest();

  const hmac = createHmac("sha256", prk);
  hmac.update(infoBitsBuffer);
  const okm = hmac.digest();

  return okm.slice(0, 16);
};

export const getSignatureString = (
  userPoolName: string,
  username: string,
  secretBlock: string,
  sValue: BigInteger,
  uValue: BigInteger
) => {
  const now = new Date();
  const weekDay = weekNames[now.getUTCDay()];
  const month = monthNames[now.getUTCMonth()];
  const day = now.getUTCDate();
  const hours = ("00" + now.getUTCHours()).slice(-2);
  const minutes = ("00" + now.getUTCMinutes()).slice(-2);
  const seconds = ("00" + now.getUTCSeconds()).slice(-2);
  const year = now.getUTCFullYear();

  // ddd MMM D HH:mm:ss UTC YYYY
  const dateNow = `${weekDay} ${month} ${day} ${hours}:${minutes}:${seconds} UTC ${year}`;

  const bufUPIDaToB = Buffer.from(userPoolName, "utf-8");
  const bufUNaToB = Buffer.from(username, "utf-8");
  const bufSBaToB = Buffer.from(secretBlock, "base64");
  const bufDNaToB = Buffer.from(dateNow, "utf-8");

  const bufConcat = Buffer.concat([
    bufUPIDaToB,
    bufUNaToB,
    bufSBaToB,
    bufDNaToB,
  ]);

  const hkdf = computehkdf(
    Buffer.from(padHex(sValue), "hex"),
    Buffer.from(padHex(uValue), "hex")
  );

  const hmac = createHmac("sha256", hkdf);
  hmac.update(bufConcat);
  const resultFromCrypto = hmac.digest();
  const signatureString = resultFromCrypto.toString("base64");

  return { dateNow, signatureString };
};

export default getSignatureString;
