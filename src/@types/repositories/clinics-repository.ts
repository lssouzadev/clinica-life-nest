import { Clinic, Prisma } from '@prisma/client';

export abstract class ClinicsRepository {
  abstract create(data: Prisma.ClinicCreateInput): Promise<Clinic>;
  abstract findById(id: string): Promise<Clinic | null>;
}
