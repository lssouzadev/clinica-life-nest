import { ProceduresRepository } from '@application/repositories/procedures-repository';
import { Injectable } from '@nestjs/common';
import { Procedure } from '@prisma/client';

interface CreateProcedureUseCaseRequest {
  title: string;
  priceProcedure: string;
  costProcedure: string;
}

interface CreateProcedureUseCaseResponse {
  procedure: Procedure;
}

@Injectable()
export class CreateProcedureUseCase {
  constructor(private proceduresRepository: ProceduresRepository) {}

  async execute({
    title,
    priceProcedure,
    costProcedure,
  }: CreateProcedureUseCaseRequest): Promise<CreateProcedureUseCaseResponse> {
    const procedure = await this.proceduresRepository.create({
      title,
      price_procedure: priceProcedure,
      cost_procedure: costProcedure,
    });

    return {
      procedure,
    };
  }
}
