import { Prisma, Treatment } from '@prisma/client';
import { TreatmentsRepository } from '@application/repositories/treatments-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaTreatmentsRepository implements TreatmentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TreatmentUncheckedCreateInput): Promise<Treatment> {
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
