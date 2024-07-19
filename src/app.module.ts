import { Module } from '@nestjs/common';
import { UserModule } from './domain/user/user.module';
import { SessionTemplateModule } from './domain/session-template/session-template.module';
import { AuthModule } from './domain/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './domain/auth/guard/auth.guard';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    UserModule,
    SessionTemplateModule,
    AuthModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
