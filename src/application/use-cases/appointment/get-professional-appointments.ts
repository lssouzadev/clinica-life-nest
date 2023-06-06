import { AppointmentsRepository } from '@application/repositories/appointments-repository';
import { Injectable } from '@nestjs/common';
import { Appointment } from '@prisma/client';

interface GetProfessionalAppointmentsUseCaseRequest {
  date: Date;
  professionalId: string;
}

interface GetProfessionalAppointmentsUseCaseResponse {
  appointments: Appointment[];
}

@Injectable()
export class GetProfessionalAppointmentsUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({
    date,
    professionalId,
  }: GetProfessionalAppointmentsUseCaseRequest): Promise<GetProfessionalAppointmentsUseCaseResponse> {
    const appointments =
      await this.appointmentsRepository.findManyAppointmentsByProfessionalIdAndDate(
        professionalId,
        date,
      );

    return {
      appointments,
    };
  }
}
