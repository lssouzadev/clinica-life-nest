import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { RegisterPatientUseCase } from '@application/use-cases/patient/register-patient';

@Module({
  imports: [DatabaseModule],
  controllers: [PatientsController],
  providers: [RegisterPatientUseCase],
})
export class PatientsModule {}
