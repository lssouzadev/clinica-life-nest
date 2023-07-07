import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateProcedureBody } from 'src/@types/dtos/create-procedure-body';
import { ProceduresService } from './procedures.service';

@Controller('procedures')
export class ProceduresController {
  constructor(private proceduresService: ProceduresService) {}

  @Post()
  async create(@Body() body: CreateProcedureBody) {
    const { title, costProcedure, priceProcedure } = body;

    await this.proceduresService.create({
      title,
      cost_procedure: costProcedure,
      price_procedure: priceProcedure,
    });
  }

  @Delete(':procedureId/delete')
  async deleteProcedure(@Param('procedureId') procedureId: string) {
    await this.proceduresService.delete(procedureId);
  }
}
