import CognitoJwtToken from "./CognitoJwtToken";

class CognitoAccessToken extends CognitoJwtToken {
  constructor(token: string) {
    super(token);
  }
}

export default CognitoAccessToken;
