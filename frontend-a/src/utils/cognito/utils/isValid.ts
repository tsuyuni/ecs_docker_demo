const isValid = (token: string) => {
  const payload = token.split(".")[1];
  try {
    return JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
  } catch (err) {
    return false;
  }
};
