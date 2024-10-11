class CognitoRefreshToken {
  token: string;

  constructor(token?: string) {
    this.token = token || "";
  }
}

export default CognitoRefreshToken;
