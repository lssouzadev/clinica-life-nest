import { Prisma } from '@prisma/client';
import { ProfessionalsRepository } from '@application/repositories/professionals-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaProfessionalsRepository implements ProfessionalsRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.ProfessionalUncheckedCreateInput) {
    const professional = await this.prisma.professional.create({
      data,
    });

    return professional;
  }

  async findByCpf(cpf: string) {
    const professional = await this.prisma.professional.findUnique({
      where: {
        cpf,
      },
    });

    if (!professional) {
      return null;
    }

    return professional;
  }

  async findById(id: string) {
    const professional = await this.prisma.professional.findUnique({
      where: {
        id,
      },
    });

    if (!professional) {
      return null;
    }

    return professional;
  }

  async delete(professionalId: string) {
    await this.prisma.professional.delete({
      where: {
        id: professionalId,
      },
    });
  }
}
