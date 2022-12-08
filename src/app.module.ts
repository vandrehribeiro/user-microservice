import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { HashModule } from './modules/hash/hash.module';
import { AtGuard } from './modules/hash/common/guards';
import { RolesGuard } from './roles/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HashModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard
    },
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  
  ],
})
export class AppModule {}
