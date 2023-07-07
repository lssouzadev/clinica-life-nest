import { Prisma, Procedure } from '@prisma/client';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProceduresService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.ProcedureCreateInput) {
    const procedure = await this.prisma.procedure.create({
      data,
    });

    return procedure;
  }

  async delete(procedureId: string) {
    await this.prisma.procedure.delete({
      where: {
        id: procedureId,
      },
    });
  }

  async findById(id: string): Promise<Procedure | null> {
    const procedure = await this.prisma.procedure.findUnique({
      where: {
        id,
      },
    });

    if (!procedure) {
      return null;
    }

    return procedure;
  }
}
