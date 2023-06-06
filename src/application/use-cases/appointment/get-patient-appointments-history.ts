import { AppointmentsRepository } from '@application/repositories/appointments-repository';
import { Injectable } from '@nestjs/common';
import { Appointment } from '@prisma/client';

interface GetPatientAppointmentsHistoryUseCaseRequest {
  patientId: string;
}

interface GetPatientAppointmentsHistoryUseCaseResponse {
  appointments: Appointment[];
}

@Injectable()
export class GetPatientAppointmentsHistoryUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({
    patientId,
  }: GetPatientAppointmentsHistoryUseCaseRequest): Promise<GetPatientAppointmentsHistoryUseCaseResponse> {
    const appointments =
      await this.appointmentsRepository.findManyAppointmentsByPatientId(
        patientId,
      );
    return {
      appointments,
    };
  }
}
