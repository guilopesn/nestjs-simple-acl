import { CustomDecorator, SetMetadata } from "@nestjs/common";

export const AUTHORIZATION_KEY = "authorization";

export const RequiredAuthorization = (
  authorization: string
): CustomDecorator<string> => {
  return SetMetadata(AUTHORIZATION_KEY, authorization);
};
