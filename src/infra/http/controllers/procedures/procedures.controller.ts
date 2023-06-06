import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateProcedureBody } from '@infra/http/dtos/create-procedure-body';
import { CreateProcedureUseCase } from '@application/use-cases/procedure/create-procedure';
import { DeleteProcedureUseCase } from '@application/use-cases/procedure/delete-procedure';

@Controller('procedures')
export class ProceduresController {
  constructor(
    private createProcedureUseCase: CreateProcedureUseCase,
    private deleteProcedureUseCase: DeleteProcedureUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateProcedureBody) {
    const { title, costProcedure, priceProcedure } = body;

    await this.createProcedureUseCase.execute({
      title,
      costProcedure,
      priceProcedure,
    });
  }

  @Delete(':procedureId/delete')
  async deleteProcedure(@Param('procedureId') procedureId: string) {
    await this.deleteProcedureUseCase.execute({
      procedureId,
    });
  }
}
