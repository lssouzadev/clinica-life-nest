import { AppointmentsRepository } from '@application/repositories/appointments-repository';
import { Injectable } from '@nestjs/common';
import { Appointment } from '@prisma/client';

interface GetProfessionalAppointmentsUseCaseRequest {
  date: Date;
  professionalId: string;
}

interface GetProfessionalAppointmentsUseCaseResponse {
  appointments: {
    id: string;
    date_hour: Date;
    professional_id: string;
    patient_id: string;
    patientName: string;
    room_id: string;
  }[];
}

@Injectable()
export class GetProfessionalAppointmentsUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({
    date,
    professionalId,
  }: GetProfessionalAppointmentsUseCaseRequest): Promise<GetProfessionalAppointmentsUseCaseResponse> {
    const getAppointments =
      await this.appointmentsRepository.findManyAppointmentsByProfessionalIdAndDate(
        professionalId,
        date,
      );

    const appointments = getAppointments.map((appointment) => {
      return {
        id: appointment.id,
        date_hour: appointment.date_hour,
        professional_id: appointment.professional_id,
        professional_name: appointment.professional_name,
        patient_id: appointment.patient_id,
        patientName: appointment.patient_name,
        room_id: appointment.room_id,
      };
    });

    return {
      appointments,
    };
  }
}
