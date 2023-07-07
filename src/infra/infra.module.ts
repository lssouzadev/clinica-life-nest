import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AuthController],
})
export class InfraModule {}
