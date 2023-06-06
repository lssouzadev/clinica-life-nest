import { AppointmentsRepository } from '@application/repositories/appointments-repository';
import { Injectable } from '@nestjs/common';

interface DeleteAppointmentUseCaseRequest {
  appointmentId: string;
}

@Injectable()
export class DeleteAppointmentUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({ appointmentId }: DeleteAppointmentUseCaseRequest) {
    this.appointmentsRepository.deleteAppointment(appointmentId);
  }
}
