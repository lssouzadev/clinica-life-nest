import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { RegisterUserUseCase } from '@application/use-cases/user/register-user';
import { JwtModule } from '@nestjs/jwt';
import { GetUserProfileUseCase } from '@application/use-cases/user/get-user-profile';

@Module({
  imports: [DatabaseModule, JwtModule],
  controllers: [UsersController],
  providers: [RegisterUserUseCase, GetUserProfileUseCase],
})
export class UsersModule {}
