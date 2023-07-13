import { Prisma, Patient } from '@prisma/client';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PatientAlreadyExistsError } from '@common/@errors/types';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PatientCreateInput): Promise<Patient> {
    const patientWithSameCpf = await this.prisma.patient.findUnique({
      where: {
        cpf: data.cpf,
      },
    });

    if (patientWithSameCpf) {
      throw new PatientAlreadyExistsError();
    }
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

  async findAll() {
    return await this.prisma.patient.findMany();
  }
}
