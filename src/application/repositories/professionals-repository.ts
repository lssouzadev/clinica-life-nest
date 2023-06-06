import { Professional, Prisma } from '@prisma/client';

export abstract class ProfessionalsRepository {
  abstract create(
    data: Prisma.ProfessionalUncheckedCreateInput,
  ): Promise<Professional>;
  abstract findByCpf(cpf: string): Promise<Professional | null>;
  abstract findById(id: string): Promise<Professional | null>;
  abstract delete(professionalId: string): Promise<void>;
}
