import { Prisma, Clinic } from '@prisma/client';
import { ClinicsRepository } from 'src/@types/repositories/clinics-repository';
import { randomUUID } from 'crypto';

export class InMemoryClinicsRepository implements ClinicsRepository {
  public items: Clinic[] = [];

  async create(data: Prisma.ClinicCreateInput) {
    const clinic = {
      id: data.id ?? randomUUID(),
      name: data.name,
      address: data.address ?? null,
      phone: data.phone ?? null,
    };

    this.items.push(clinic);

    return clinic;
  }

  async findById(id: string) {
    const clinic = this.items.find((item) => item.id === id);

    if (!clinic) {
      return null;
    }

    return clinic;
  }
}
