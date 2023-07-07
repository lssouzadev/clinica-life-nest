import { Prisma, Patient } from '@prisma/client';
import { PatientsRepository } from 'src/@types/repositories/patients-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryPatientsRepository implements PatientsRepository {
  public items: Patient[] = [];

  async create(data: Prisma.PatientCreateInput) {
    const patient = {
      id: data.id ?? randomUUID(),
      name: data.name,
      cpf: data.cpf,
      birthday: data.birthday,
      address: data.address ?? null,
      phone: data.phone,
      created_at: new Date(),
    };

    this.items.push(patient);

    return patient;
  }

  async findByDocument(cpf: string) {
    const patient = this.items.find((item) => item.cpf === cpf);

    if (!patient) {
      return null;
    }

    return patient;
  }

  async findById(id: string) {
    const patient = this.items.find((item) => item.id === id);

    if (!patient) {
      return null;
    }

    return patient;
  }
}
