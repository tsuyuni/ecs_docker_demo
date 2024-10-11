import CognitoAccessToken from "./CognitoAccessToken";
import CognitoIdToken from "./CognitoIdToken";
import CognitoRefreshToken from "./CognitoRefreshToken";

class CognitoUserSession {
  idToken: CognitoIdToken;
  refreshToken: CognitoRefreshToken;
  accessToken: CognitoAccessToken;

  constructor({
    IdToken,
    RefreshToken,
    AccessToken,
  }: {
    IdToken: CognitoIdToken;
    RefreshToken: CognitoRefreshToken;
    AccessToken: CognitoAccessToken;
  }) {
    this.idToken = IdToken;
    this.refreshToken = RefreshToken;
    this.accessToken = AccessToken;
  }

  isValid() {
    const now = Math.floor(new Date().getTime() / 1000);

    return (
      now < this.accessToken.getExpiration() &&
      now < this.idToken.getExpiration()
    );
  }
}

export default CognitoUserSession;
