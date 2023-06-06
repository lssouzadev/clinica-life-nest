import { Prisma, Clinic } from '@prisma/client';
import { ClinicsRepository } from '@application/repositories/clinics-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaClinicsRepository implements ClinicsRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.ClinicCreateInput): Promise<Clinic> {
    const clinic = await this.prisma.clinic.create({
      data,
    });

    return clinic;
  }

  async findById(id: string): Promise<Clinic | null> {
    const clinic = await this.prisma.clinic.findUnique({
      where: {
        id,
      },
    });

    return clinic;
  }
}
