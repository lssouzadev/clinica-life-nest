import { Prisma, Procedure } from '@prisma/client';
import { ProceduresRepository } from '@application/repositories/procedures-repository';
import { randomUUID } from 'crypto';

export class InMemoryProceduresRepository implements ProceduresRepository {
  public items: Procedure[] = [];
  async create(data: Prisma.ProcedureCreateInput) {
    const procedure = {
      id: data.id ?? randomUUID(),
      title: data.title,
      price_procedure: data.price_procedure,
      cost_procedure: data.cost_procedure,
    };

    this.items.push(procedure);

    return procedure;
  }

  async delete(procedureId: string) {
    const procedureIndex = this.items.findIndex(
      (item) => item.id === procedureId,
    );

    this.items.splice(procedureIndex, 1);
  }

  async findById(id: string) {
    const procedure = this.items.find((item) => item.id === id);

    if (!procedure) {
      return null;
    }

    return procedure;
  }
}
