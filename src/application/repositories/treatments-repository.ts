import { Prisma, Treatment } from '@prisma/client';

export abstract class TreatmentsRepository {
  abstract create(
    data: Prisma.TreatmentUncheckedCreateInput,
  ): Promise<Treatment>;
  abstract findById(id: string): Promise<Treatment | null>;
  abstract findManyByPatientId(patientId: string): Promise<Treatment[]>;
}
