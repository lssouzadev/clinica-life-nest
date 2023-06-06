import { ProceduresRepository } from '@application/repositories/procedures-repository';
import { Injectable } from '@nestjs/common';

interface DeleteProcedureUseCaseRequest {
  procedureId: string;
}

@Injectable()
export class DeleteProcedureUseCase {
  constructor(private proceduresRepository: ProceduresRepository) {}

  async execute({ procedureId }: DeleteProcedureUseCaseRequest): Promise<void> {
    await this.proceduresRepository.delete(procedureId);
  }
}
