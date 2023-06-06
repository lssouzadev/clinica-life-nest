import { TreatmentsRepository } from '@application/repositories/treatments-repository';
import { Injectable } from '@nestjs/common';
import { Treatment } from '@prisma/client';

interface FetchPatientTreatmentsUseCaseRequest {
  patientId: string;
}

interface FetchPatientTreatmentsUseCaseResponse {
  treatments: Treatment[];
}

@Injectable()
export class FetchPatientTreatmentsUseCase {
  constructor(private treatmentsRepository: TreatmentsRepository) {}

  async execute({
    patientId,
  }: FetchPatientTreatmentsUseCaseRequest): Promise<FetchPatientTreatmentsUseCaseResponse> {
    const treatments = await this.treatmentsRepository.findManyByPatientId(
      patientId,
    );

    return {
      treatments,
    };
  }
}
