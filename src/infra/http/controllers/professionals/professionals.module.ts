import { RegisterProfessionalUseCase } from '@application/use-cases/professional/register-professional';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ProfessionalsController } from './professionals.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfessionalsController],
  providers: [RegisterProfessionalUseCase],
})
export class ProfessionalsModule {}
