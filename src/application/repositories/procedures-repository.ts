import { Prisma, Procedure } from '@prisma/client';

export abstract class ProceduresRepository {
  abstract create(data: Prisma.ProcedureCreateInput): Promise<Procedure>;
  abstract delete(procedureId: string): Promise<void>;
  abstract findById(id: string): Promise<Procedure | null>;
}
