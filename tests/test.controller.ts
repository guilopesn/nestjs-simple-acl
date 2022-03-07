import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, RequiredAuthorization } from "../src";
import { TestAuthorizations } from "./test.authorizations";

@UseGuards(AuthorizationGuard)
@Controller("test")
export class TestController {
  @RequiredAuthorization(TestAuthorizations.TEST_GET)
  @Get()
  async testGet(): Promise<string> {
    return "Ok";
  }

  @RequiredAuthorization(TestAuthorizations.TEST_POST)
  @Post()
  async testPost(): Promise<string> {
    return "Ok";
  }
}
