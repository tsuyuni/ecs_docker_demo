class CognitoJwtToken {
  jwtToken: string;
  payload: object & { exp?: number };

  constructor(token: string) {
    this.jwtToken = token;
    this.payload = this.decodePayload();
  }

  getJwtToken() {
    return this.jwtToken;
  }

  getExpiration() {
    return this.payload.exp || 0;
  }

  decodePayload(): object {
    const payload = this.jwtToken.split(".")[1];
    try {
      return JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
    } catch (err) {
      return {};
    }
  }
}

export default CognitoJwtToken;
