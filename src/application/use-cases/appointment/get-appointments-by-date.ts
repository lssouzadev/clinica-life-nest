import { AppointmentsRepository } from '@application/repositories/appointments-repository';
import { Injectable } from '@nestjs/common';
import { Appointment } from '@prisma/client';

interface GetAppointmentsByDateUseCaseRequest {
  date: Date;
}

interface GetAppointmentsByDateUseCaseResponse {
  appointments: Appointment[];
}

@Injectable()
export class GetAppointmentsByDateUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({
    date,
  }: GetAppointmentsByDateUseCaseRequest): Promise<GetAppointmentsByDateUseCaseResponse> {
    const appointments =
      await this.appointmentsRepository.findManyAppointmentsByDate(date);

    return {
      appointments,
    };
  }
}
