import { Request } from "express";

export interface AuthorizationStrategy {
  isAuthorized(request: Request, requiredAuthorization: string): boolean;
}
