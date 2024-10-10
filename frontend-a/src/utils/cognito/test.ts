import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "./amazon-cognito-identity-js/lib/index";

const test = () => {
  const cognitoUserPool = new CognitoUserPool({
    UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID!,
    ClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID!,
  });
  const cognitoUser = new CognitoUser({
    Username: "yuri.tsuchikawa@mairutech.com",
    Pool: cognitoUserPool,
  });
  const authenticationDetails = new AuthenticationDetails({
    Username: "yuri.tsuchikawa@mairutech.com",
    Password: "Pass1014",
  });
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      console.log("onSuccess", result);
    },
    onFailure: (err) => {
      console.log("onFailure", err);
    },
    newPasswordRequired: (userAttributes, requiredAttributes) => {
      console.log("newPasswordRequired", userAttributes, requiredAttributes);
    },
  });
};

export default test;
