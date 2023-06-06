import { Prisma, Patient } from '@prisma/client';
import { PatientsRepository } from '@application/repositories/patients-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaPatientsRepository implements PatientsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PatientCreateInput): Promise<Patient> {
    const patient = await this.prisma.patient.create({
      data,
    });

    return patient;
  }

  async findByDocument(cpf: string): Promise<Patient | null> {
    const patient = await this.prisma.patient.findUnique({
      where: {
        cpf,
      },
    });

    if (!patient) {
      return null;
    }

    return patient;
  }

  async findById(id: string) {
    const patient = await this.prisma.patient.findUnique({
      where: {
        id,
      },
    });

    if (!patient) {
      return null;
    }

    return patient;
  }
}
