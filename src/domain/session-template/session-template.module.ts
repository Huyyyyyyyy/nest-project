import { Module } from "@nestjs/common";
import { SessionTemplateController } from "./session-template.controller";

@Module({
    imports : [],
    controllers: [SessionTemplateController],
    providers : []
})
export class SessionTemplateModule{

}