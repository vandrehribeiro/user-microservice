import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { DatabaseModule } from '../../database/database.module';
// import { ONGsModule } from "../ongs/ongs.module";
// import { TutorsModule } from "../tutors/tutors.module";
import { UsersModule } from "../users/users.module";
import { HashController } from "./hash.controller";
import { hashProviders } from "./hash.providers";
import { HashService } from "./hash.service";
import { AtStrategy, RtStrategy } from "./strategies";

@Module({
    imports: [
        DatabaseModule,
        PassportModule,
        UsersModule,
        // TutorsModule,
        // ONGsModule,
        JwtModule.register({})],
    controllers: [HashController],
    providers: [
        HashService,
        ...hashProviders,
        AtStrategy,
        RtStrategy
    ],
    exports: [HashService]
})

export class HashModule {}