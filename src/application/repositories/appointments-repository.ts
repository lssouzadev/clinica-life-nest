import { Prisma, Appointment } from '@prisma/client';

export abstract class AppointmentsRepository {
  abstract create(
    data: Prisma.AppointmentUncheckedCreateInput,
  ): Promise<Appointment>;
  abstract findAppointmentByRoomIdAndDateHour(
    dateHour: Date,
    roomId: string,
  ): Promise<Appointment | null>;
  abstract findAppointmentByProfessionalIdAndDate(
    professionalId: string,
    date: Date,
  ): Promise<Appointment | null>;
  abstract findManyAppointmentsByProfessionalIdAndDate(
    professionalId: string,
    date: Date,
  ): Promise<Appointment[]>;
  abstract deleteAppointment(appointmentId: string): Promise<void>;
  abstract findManyAppointmentsByDate(date: Date): Promise<Appointment[]>;
  abstract findManyAppointmentsByPatientId(
    patientId: string,
  ): Promise<Appointment[]>;
  abstract findManyAppointmentsByRoomAndDate(
    roomId: string,
    date: Date,
  ): Promise<Appointment[]>;
}
