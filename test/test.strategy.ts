import { AuthorizationStrategy } from '../lib/interfaces/authorization-strategy.interface';
import { Request } from 'express';

export class TestStrategy implements AuthorizationStrategy {
  isAuthorized(request: Request, requiredAuthorization: string): boolean {
    const requestAuthorization: string = request.headers.authorization;

    if (!requiredAuthorization) return true;

    if (
      requestAuthorization === requiredAuthorization
    ) {
      return true;
    }
  }
}