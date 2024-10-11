import { z } from "zod";

export type SignInInput = {
  email: string;
  password: string;
};

export const InitiateAuthUserSrpAuth = z.object({
  ChallengeName: z.string(),
  ChallengeParameters: z.object({
    SALT: z.string(),
    SECRET_BLOCK: z.string(),
    SRP_B: z.string(),
    USER_ID_FOR_SRP: z.string(),
  }),
});

export const InitiateAuthRefreshTokenAuth = z.object({
  AuthenticationResult: z.object({
    AccessToken: z.string(),
    ExpiresIn: z.number(),
    IdToken: z.string(),
    RefreshToken: z.undefined(),
    TokenType: z.string(),
  }),
  ChallengeParameters: z.object({}),
});

const InitiateAuth = z.union([
  InitiateAuthUserSrpAuth,
  InitiateAuthRefreshTokenAuth,
]);

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

export const ClientResponse = z.union([InitiateAuth, RespondToAuthChallenge]);
