import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './domain/user/user.module';
import { SessionTemplateModule } from './domain/session-template/session-template.module';
import { AuthModule } from './domain/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './domain/guard/auth.guard';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { HealthModule } from './domain/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    HealthModule,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
