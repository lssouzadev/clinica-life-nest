import { Module } from '@nestjs/common';
import { HttpModule } from '../http.module';
import { AuthController } from './auth.controller';
import { AuthenticateUserUseCase } from '@application/use-cases/user/authenticate';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule, HttpModule, JwtModule],
  providers: [AuthenticateUserUseCase],
  controllers: [AuthController],
  exports: [AuthenticateUserUseCase, JwtModule],
})
export class AuthModule {}
