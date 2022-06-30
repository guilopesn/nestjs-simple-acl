import { AuthorizationStrategy } from '.';

export interface ACLModuleOptions {
  strategy: AuthorizationStrategy;
}
