import { Prisma, Appointment } from '@prisma/client';
import { AppointmentsRepository } from 'src/@types/repositories/appointments-repository';
import { randomUUID } from 'crypto';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
  public items: Appointment[] = [];
  async create(data: Prisma.AppointmentUncheckedCreateInput) {
    const appointment = {
      id: data.id ?? randomUUID(),
      date_hour: new Date(data.date_hour),
      professional_id: data.professional_id,
      patient_id: data.patient_id,
      room_id: data.room_id,
    };

    this.items.push(appointment);

    return appointment;
  }

  async findAppointmentByRoomIdAndDateHour(dateHour: Date, roomId: string) {
    const appointmentsRoom = this.items.filter(
      (item) => item.room_id === roomId,
    );

    const appointment = appointmentsRoom.find((item) =>
      dayjs.utc(item.date_hour).isSame(dayjs.utc(dateHour)),
    );

    if (!appointment) {
      return null;
    }

    return appointment;
  }

  async findManyAppointmentsByProfessionalIdAndDate(
    professionalId: string,
    date: Date,
  ) {
    const appointments = this.items.filter((item) => {
      const startOfDay = dayjs.utc(date).startOf('day');
      const endOfDay = dayjs.utc(date).endOf('day');

      const dateJs = dayjs.utc(item.date_hour);

      return (
        dateJs.isAfter(startOfDay) &&
        dateJs.isBefore(endOfDay) &&
        item.professional_id === professionalId
      );
    });

    return appointments;
  }

  async deleteAppointment(appointmentId: string) {
    const appointmentIndex = this.items.findIndex(
      (item) => item.id === appointmentId,
    );

    this.items.splice(appointmentIndex, 1);
  }

  async findAppointmentByProfessionalIdAndDate(
    professionalId: string,
    date: Date,
  ) {
    const appointment = this.items.find((item) => {
      const startOfDay = dayjs.utc(date).startOf('day');
      const endOfDay = dayjs.utc(date).endOf('day');

      const dateJs = dayjs.utc(item.date_hour);

      return (
        dateJs.isAfter(startOfDay) &&
        dateJs.isBefore(endOfDay) &&
        item.professional_id === professionalId
      );
    });

    if (!appointment) {
      return null;
    }

    return appointment;
  }

  async findManyAppointmentsByDate(date: Date) {
    const appointments = this.items.filter((item) => {
      const startOfDay = dayjs.utc(date).startOf('day');
      const endOfDay = dayjs.utc(date).endOf('day');

      const dateJs = dayjs.utc(item.date_hour);

      return dateJs.isAfter(startOfDay) && dateJs.isBefore(endOfDay);
    });

    return appointments;
  }

  async findManyAppointmentsByPatientId(patientId: string) {
    const appointments = this.items.filter(
      (item) => item.patient_id === patientId,
    );

    return appointments;
  }

  async findManyAppointmentsByRoomAndDate(roomId: string, date: Date) {
    const appointments = this.items.filter((item) => {
      const startOfDay = dayjs.utc(date).startOf('day');
      const endOfDay = dayjs.utc(date).endOf('day');

      const dateJs = dayjs.utc(item.date_hour);

      return (
        dateJs.isAfter(startOfDay) &&
        dateJs.isBefore(endOfDay) &&
        item.room_id === roomId
      );
    });

    return appointments;
  }
}
