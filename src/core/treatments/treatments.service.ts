import { Prisma, Treatment } from '@prisma/client';
import { TreatmentsRepository } from 'src/@types/repositories/treatments-repository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProcedureNotFoundError } from '@common/@errors/types';

@Injectable()
export class TreatmentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TreatmentUncheckedCreateInput): Promise<Treatment> {
    const procedure = await this.prisma.procedure.findUnique({
      where: {
        id: data.procedure_id,
      },
    });

    if (!procedure) {
      throw new ProcedureNotFoundError();
    }

    const treatment = await this.prisma.treatment.create({
      data,
    });

    return treatment;
  }

  async findById(id: string) {
    const treatment = await this.prisma.treatment.findUnique({
      where: {
        id,
      },
    });

    if (!treatment) {
      return null;
    }

    return treatment;
  }

  async findManyByPatientId(patientId: string) {
    const treatments = await this.prisma.treatment.findMany({
      where: {
        patient_id: patientId,
      },
    });

    return treatments;
  }
}
