import { AuthorizationStrategy } from "../src/interfaces";
import { Request } from "express";

export class TestStrategy implements AuthorizationStrategy {
  isAuthorized(request: Request, requiredAuthorization: string): boolean {
    const requestAuthorization: string = request.headers.authorization;

    if (!requiredAuthorization) return true;

    if (requestAuthorization === requiredAuthorization) {
      return true;
    }
  }
}
