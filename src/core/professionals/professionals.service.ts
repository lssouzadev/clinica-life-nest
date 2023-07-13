import { Prisma } from '@prisma/client';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProfessionalAlreadyExistsError } from '@common/@errors/types';

@Injectable()
export class ProfessionalsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProfessionalUncheckedCreateInput) {
    const professionalWithSameCpf = await this.findByCpf(data.cpf);

    if (professionalWithSameCpf) {
      throw new ProfessionalAlreadyExistsError();
    }
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

  async findAll() {
    return await this.prisma.professional.findMany();
  }
}
