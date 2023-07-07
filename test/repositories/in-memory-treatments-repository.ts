import { Prisma, Treatment } from '@prisma/client';
import { TreatmentsRepository } from 'src/@types/repositories/treatments-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryTreatmentsRepository implements TreatmentsRepository {
  public items: Treatment[] = [];
  async create(data: Prisma.TreatmentUncheckedCreateInput) {
    const treatment = {
      id: data.id ?? randomUUID(),
      title: data.title,
      price_treatment: data.price_treatment,
      professional_id: data.professional_id,
      patient_id: data.patient_id,
      procedure_id: data.procedure_id,
      created_at: new Date(),
      finished_at: data.finished_at ? new Date(data.finished_at) : null,
    };

    this.items.push(treatment);

    return treatment;
  }

  async findById(id: string) {
    const treatment = this.items.find((item) => item.id === id);

    if (!treatment) {
      return null;
    }

    return treatment;
  }

  async findManyByPatientId(patientId: string) {
    const treatments = this.items.filter(
      (item) => item.patient_id === patientId,
    );

    return treatments;
  }
}
