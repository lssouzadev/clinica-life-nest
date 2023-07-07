import { Module } from '@nestjs/common';
import { HttpModule } from '../http.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@infra/database/database.module';
import { AuthService } from './auth.service';
import { TokenExpiredFilter } from '@common/filters/http-exception/token-expired.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    DatabaseModule,
    HttpModule,
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [
    AuthService,
    { provide: APP_FILTER, useClass: TokenExpiredFilter },
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
