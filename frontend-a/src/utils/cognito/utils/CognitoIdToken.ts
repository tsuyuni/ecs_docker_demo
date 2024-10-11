import CognitoJwtToken from "./CognitoJwtToken";

class CognitoIdToken extends CognitoJwtToken {
  constructor(token: string) {
    super(token);
  }
}

export default CognitoIdToken;
