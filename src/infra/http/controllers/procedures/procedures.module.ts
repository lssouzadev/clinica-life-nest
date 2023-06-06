import { CreateProcedureUseCase } from '@application/use-cases/procedure/create-procedure';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ProceduresController } from './procedures.controller';
import { DeleteProcedureUseCase } from '@application/use-cases/procedure/delete-procedure';

@Module({
  imports: [DatabaseModule],
  controllers: [ProceduresController],
  providers: [CreateProcedureUseCase, DeleteProcedureUseCase],
})
export class ProceduresModule {}
