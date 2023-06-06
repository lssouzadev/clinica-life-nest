import { AppointmentsRepository } from '@application/repositories/appointments-repository';
import { Injectable } from '@nestjs/common';
import { Appointment } from '@prisma/client';

interface FetchAppointmentsByRoomAndDateUseCaseRequest {
  roomId: string;
  date: Date;
}

interface FetchAppointmentsByRoomAndDateUseCaseResponse {
  appointments: Appointment[];
}

@Injectable()
export class FetchAppointmentsByRoomAndDateUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({
    roomId,
    date,
  }: FetchAppointmentsByRoomAndDateUseCaseRequest): Promise<FetchAppointmentsByRoomAndDateUseCaseResponse> {
    const appointments =
      await this.appointmentsRepository.findManyAppointmentsByRoomAndDate(
        roomId,
        date,
      );

    return {
      appointments,
    };
  }
}
