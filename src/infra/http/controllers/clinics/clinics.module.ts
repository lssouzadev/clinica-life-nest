import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ClinicsController } from './clinics.controller';
import { RegisterClinicUseCase } from '@application/use-cases/clinic/register-clinic';

@Module({
  imports: [DatabaseModule],
  controllers: [ClinicsController],
  providers: [RegisterClinicUseCase],
})
export class ClinicsModule {}
