import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Clinic, Prisma } from '@prisma/client';

@Injectable()
export class ClinicsService {
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

    if (!clinic) {
      return null;
    }

    return clinic;
  }
}
