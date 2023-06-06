import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { TreatmentsController } from './treatments.controller';
import { CreateTreatmentUseCase } from '@application/use-cases/treatment/create-treatment';

@Module({
  imports: [DatabaseModule],
  controllers: [TreatmentsController],
  providers: [CreateTreatmentUseCase],
})
export class TreatmentsModule {}
