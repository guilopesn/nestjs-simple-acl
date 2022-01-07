import { Module } from "@nestjs/common";
import { ACLModule } from "../lib";
import { TestAuthorizations } from "./test.authorizations";
import { TestController } from "./test.controller";
import { TestStrategy } from "./test.strategy";

@Module({
    imports: [
        ACLModule.forRoot({
            strategy: new TestStrategy()
        }),
        ACLModule.registerAuthorizations([TestAuthorizations]),
    ],
    controllers: [TestController],
    providers: [],
    exports: []
})
export class TestModule {}