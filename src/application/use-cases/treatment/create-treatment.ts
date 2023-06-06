import { ProceduresRepository } from '@application/repositories/procedures-repository';
import { TreatmentsRepository } from '@application/repositories/treatments-repository';
import { Treatment } from '@prisma/client';
import { ProcedureNotFoundError } from '@common/@errors/types/procedure-not-found-error';
import { Injectable } from '@nestjs/common';

interface CreateTreatmentUseCaseRequest {
  procedureId: string;
  professionalId: string;
  patientId: string;
}

interface CreateTreatmentUseCaseResponse {
  treatment: Treatment;
}

@Injectable()
export class CreateTreatmentUseCase {
  constructor(
    private treatmentsRepository: TreatmentsRepository,
    private proceduresRepository: ProceduresRepository,
  ) {}

  async execute({
    procedureId,
    professionalId,
    patientId,
  }: CreateTreatmentUseCaseRequest): Promise<CreateTreatmentUseCaseResponse> {
    const procedure = await this.proceduresRepository.findById(procedureId);

    if (!procedure) {
      throw new ProcedureNotFoundError();
    }

    const treatment = await this.treatmentsRepository.create({
      title: procedure.title,
      procedure_id: procedureId,
      patient_id: patientId,
      price_treatment: procedure.price_procedure,
      professional_id: professionalId,
    });

    return {
      treatment,
    };
  }
}
