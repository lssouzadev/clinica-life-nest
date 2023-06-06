import { Patient, Prisma } from '@prisma/client';

export abstract class PatientsRepository {
  abstract create(data: Prisma.PatientCreateInput): Promise<Patient>;
  abstract findByDocument(cpf: string): Promise<Patient | null>;
  abstract findById(id: string): Promise<Patient | null>;
}
