import { ProfessionalsRepository } from '@application/repositories/professionals-repository';
import { Injectable } from '@nestjs/common';

interface DeleteProfessionalUseCaseRequest {
  professionalId: string;
}

@Injectable()
export class DeleteProfessionalUseCase {
  constructor(private professionalsRepository: ProfessionalsRepository) {}

  async execute({
    professionalId,
  }: DeleteProfessionalUseCaseRequest): Promise<void> {
    await this.professionalsRepository.delete(professionalId);
  }
}
