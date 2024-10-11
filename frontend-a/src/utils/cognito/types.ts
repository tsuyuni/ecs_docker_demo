import { z } from "zod";

export type SignInInput = {
  email: string;
  password: string;
};

export const InitiateAuth = z.object({
  ChallengeName: z.string(),
  ChallengeParameters: z.object({
    SALT: z.string(),
    SECRET_BLOCK: z.string(),
    SRP_B: z.string(),
    USERNAME: z.string(),
    USER_ID_FOR_SRP: z.string(),
  }),
});

export const RespondToAuthChallenge = z.object({
  AuthenticationResult: z.object({
    AccessToken: z.string(),
    ExpiresIn: z.number(),
    IdToken: z.string(),
    RefreshToken: z.string(),
    TokenType: z.string(),
  }),
  ChallengeParameters: z.object({}),
});
