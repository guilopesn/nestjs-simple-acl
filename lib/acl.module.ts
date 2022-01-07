import { Module, DynamicModule } from "@nestjs/common";
import { ACLModuleOptions } from "./interfaces/acl-module-options.interface";
import { AuthorizationStrategy } from "./interfaces/authorization-strategy.interface";

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class ACLModule {
  private static authorizationStrategy: AuthorizationStrategy;

  public static getAuthorizationStrategy(): AuthorizationStrategy {
    return this.authorizationStrategy;
  }

  private static registeredAuthorizations: string[] = [];

  public static getRegisteredAuthorizations(): string[] {
    return ACLModule.registeredAuthorizations;
  }

  public static hasRegisteredAuthorizations(authorization: string): boolean {
    return ACLModule.registeredAuthorizations.includes(authorization);
  }

  public static forRoot(options: ACLModuleOptions): DynamicModule {
    ACLModule.authorizationStrategy = options.strategy;

    return {
      module: ACLModule,
    };
  }

  public static registerAuthorizations(
    authorizationsToRegister: any[]
  ): DynamicModule {
    authorizationsToRegister.forEach((authorizationToRegister) => {
      ACLModule.registeredAuthorizations =
        ACLModule.registeredAuthorizations.concat(
          Object.values(authorizationToRegister)
        );
    });

    return {
      module: ACLModule,
    };
  }
}