import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ACLModule } from '..';
import { AUTHORIZATION_KEY } from '../decorators/required-authorization.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const requiredAuthorization: string = this.reflector.get<string>(
      AUTHORIZATION_KEY,
      context.getHandler(),
    );

    if (!requiredAuthorization) return true;

    if (!ACLModule.hasRegisteredAuthorizations(requiredAuthorization))
      throw new InternalServerErrorException(
        'Required authorization is not registered on module',
      );

    const request: Request = context.switchToHttp().getRequest();

    return ACLModule.getAuthorizationStrategy().isAuthorized(
      request,
      requiredAuthorization,
    );
  }
}
