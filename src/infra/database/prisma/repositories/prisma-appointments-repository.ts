import { Prisma } from '@prisma/client';
import { AppointmentsRepository } from '@application/repositories/appointments-repository';
import { PrismaService } from '../prisma.service';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Injectable } from '@nestjs/common';

dayjs.extend(utc);

@Injectable()
export class PrismaAppointmentsRepository implements AppointmentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AppointmentUncheckedCreateInput) {
    const appointment = await this.prisma.appointment.create({
      data,
    });

    return appointment;
  }

  async findAppointmentByDateHour(dateHour: Date) {
    const appointment = await this.prisma.appointment.findFirst({
      where: {
        date_hour: dateHour,
      },
    });

    if (!appointment) {
      return null;
    }

    return appointment;
  }

  async findManyAppointmentsByProfessionalIdAndDate(
    professionalId: string,
    date: Date,
  ) {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        AND: [
          {
            date_hour: {
              gte: dayjs.utc(date).startOf('day').toDate(),
              lt: dayjs.utc(date).endOf('day').toDate(),
            },
          },
          {
            professional_id: professionalId,
          },
        ],
      },
      orderBy: {
        date_hour: 'asc',
      },
    });
    return appointments;
  }

  async findAppointmentByProfessionalIdAndDate(
    professionalId: string,
    date: Date,
  ) {
    const appointment = await this.prisma.appointment.findFirst({
      where: {
        AND: [
          {
            date_hour: dayjs.utc(date).toDate(),
          },
          {
            professional_id: professionalId,
          },
        ],
      },
    });
    return appointment;
  }

  async deleteAppointment(appointmentId: string) {
    await this.prisma.appointment.delete({
      where: {
        id: appointmentId,
      },
    });
  }

  async findAppointmentByRoomIdAndDateHour(dateHour: Date, roomId: string) {
    const appointment = await this.prisma.appointment.findFirst({
      where: {
        AND: [
          {
            date_hour: dayjs.utc(dateHour).toDate(),
          },
          {
            room_id: roomId,
          },
        ],
      },
      orderBy: {
        date_hour: 'asc',
      },
    });

    if (!appointment) {
      return null;
    }

    return appointment;
  }

  async findManyAppointmentsByDate(date: Date) {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        date_hour: {
          gte: dayjs.utc(date).startOf('day').toDate(),
          lt: dayjs.utc(date).endOf('day').toDate(),
        },
      },
    });

    return appointments;
  }

  async findManyAppointmentsByPatientId(patientId: string) {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        patient_id: patientId,
      },
    });

    return appointments;
  }

  async findManyAppointmentsByRoomAndDate(roomId: string, date: Date) {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        AND: [
          {
            date_hour: {
              gte: dayjs.utc(date).startOf('day').toDate(),
              lt: dayjs.utc(date).endOf('day').toDate(),
            },
          },
          {
            room_id: roomId,
          },
        ],
      },
      orderBy: {
        date_hour: 'asc',
      },
    });

    return appointments;
  }
}
