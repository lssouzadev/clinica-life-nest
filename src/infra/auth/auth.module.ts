import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@infra/database/database.module';
import { AuthService } from './auth.service';
import { TokenExpiredFilter } from '@common/filters/http-exception/token-expired.filter';
import { APP_FILTER } from '@nestjs/core';
import { UsersService } from '@application/users/users.service';
import { CoreModule } from '@application/core.module';

@Module({
  imports: [
    DatabaseModule,
    CoreModule,
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    { provide: APP_FILTER, useClass: TokenExpiredFilter },
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
