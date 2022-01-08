<h1 align="center">NestJS Simple ACL</h1>

<p align="center">
  A simple easy to use access control level module for NestJS
</p>

<p align="center">
  <a href="https://github.com/guilopesn/nestjs-simple-acl/actions" target="_blank"><img src="https://github.com/guilopesn/nestjs-simple-acl/actions/workflows/analyse-code-quality.yml/badge.svg" alt="Code Quality Status" /></a>
  <a href="https://github.com/guilopesn/nestjs-simple-acl/actions" target="_blank"><img src="https://github.com/guilopesn/nestjs-simple-acl/actions/workflows/build-and-test.yml/badge.svg?branch=master" alt="Test Status" /></a>
  <a href="https://www.npmjs.com/~guilopesn" target="_blank"><img src="https://img.shields.io/npm/v/nestjs-simple-acl.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~guilopesn" target="_blank"><img src="https://img.shields.io/npm/l/nestjs-simple-acl.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~guilopesn" target="_blank"><img src="https://img.shields.io/npm/dm/nestjs-simple-acl.svg" alt="NPM Downloads" /></a>
</p>

## Description

[Nest Simple ACL](https://github.com/guilopesn/nestjs-simple-acl) framework TypeScript starter repository [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ npm install --save nestjs-simple-acl
```

## Basic Usage

### Authorization Strategy

The first thing you need to do to implement an AuthorizationStrategy. Here is an example based on user role authorization:

**role.model.ts**

```typescript
export class Roles {
  name: string;
  authorizations: string[];
}
```

**user.model.ts**

```typescript
import { Role } from './role.model';

export class User {
  name: string;
  email: string;
  password: string;
  role: Role;
}
```

If you are using the JWT authentication approach with Passport.js, this guard should work for you:

**role-authorization.strategy.ts**

```typescript
import { Request } from 'express';
import { AuthorizationStrategy } from 'nestjs-simple-acl';
import { User } from './user.model';

export class RoleAuthorizationStrategy implements AuthorizationStrategy {
  isAuthorized(request: Request, requiredAuthorization: string): boolean {
    // User injected on every jwt authenticated request
    const user: User = request.user as User;

    if (
      // Checks if required authorization is present on user's role authorizations
      user.role.authorizations.some(
        authorization => authorization.name === requiredAuthorization,
      )
    ) {
      // If so, grant access
      return true;
    }

    // If not, deny access
    return false;
  }
}
```

Now you import ACLModule on app.module.js.

**app.module.ts**

```typescript
import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ACLModule } from 'nestjs-simple-acl';
import { RoleAuthorizationStrategy } from './strategies/role.strategy';

@Module({
  imports: [
    ACLModule.forRoot({
      strategy: new RoleAuthorizationStrategy(),
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
```

### Authorizations List

You will need to create ENUM containing your app's or module's authorizations list. Here is an example:

**test.authorizations.ts**

```typescript
export enum TestAuthorizations {
  SEARCH = 'SEARCH',
  CREATE = 'CREATE'
}
```

Then you need to register the authorizations on ACLModule.

**app.module.ts**

```typescript
import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ACLModule } from 'nestjs-simple-acl';
import { RoleAuthorizationStrategy } from './strategies/role.strategy';
import { TestAuthorizations } from "./test.authorizations";

@Module({
  imports: [
    ACLModule.forRoot({
      strategy: new RoleAuthorizationStrategy(),
    }),
    ACLModule.registerAuthorizations([TestAuthorizations]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
```

### Controller Usage

Now you will need to use the AuthorizationGuard on your controller and anotate the functions that should be protected with @RequiredAuthorization() decorator passing the required authorization as parameter.

```typescript
import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, RequiredAuthorization } from "nest-simple-acl";
import { TestAuthorizations } from "./test.authorizations";

@UseGuards(AuthorizationGuard)
@Controller('test')
export class TestController {
    
    @RequiredAuthorization(TestAuthorizations.SEARCH)
    @Get()
    async search(): Promise<string> {
        return 'Ok';
    }

    @RequiredAuthorization(TestAuthorizations.CREATE)
    @Post()
    async create(): Promise<string> {
        return 'Ok';
    }
}
```

That's it!

## Test

```bash
# e2e tests
$ npm run test:e2e
```

## Stay in touch

- Author - [Guilherme Nogueira](mailto:guilherme.lopesn@gmail.com)

## License

NestJS Simple ACL [MIT licensed](LICENSE).
