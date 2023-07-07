import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { TreatmentsController } from './treatments.controller';
import { TreatmentsService } from './treatments.service';
import { ProceduresModule } from '../procedures/procedures.module';

@Module({
  imports: [DatabaseModule, ProceduresModule],
  controllers: [TreatmentsController],
  providers: [TreatmentsService],
  exports: [TreatmentsService],
})
export class TreatmentsModule {}
