import * as error from '@common/@errors/types';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { ProfessionalRoomsService } from '../professional-rooms/professional-rooms.service';

interface AppointmentsProps {
  dateHour: Date;
  professionalId: string;
  patientId: string;
  roomId: string;
}

@Injectable()
export class AppointmentsService {
  constructor(
    private prisma: PrismaService,
    private professionalRoomsService: ProfessionalRoomsService,
  ) {}

  async register({
    dateHour,
    professionalId,
    patientId,
    roomId,
  }: AppointmentsProps) {
    const professionalRoomVerification =
      await this.professionalRoomsService.findByProfessionalIdAndRoomId(
        professionalId,
        roomId,
      );

    if (!professionalRoomVerification) {
      throw new error.ProfessionalNotAllowedError();
    }

    const professional = await this.prisma.professional.findUnique({
      where: {
        id: professionalId,
      },
    });

    if (!professional) {
      throw new error.ProfessionalNotFoundError();
    }

    const patient = await this.prisma.patient.findUnique({
      where: {
        id: patientId,
      },
    });

    if (!patient) {
      throw new error.PatientNotFoundError();
    }

    const checkRoomExists = await this.prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });

    if (!checkRoomExists) {
      throw new error.RoomNotFoundError();
    }

    const startOfDay = dayjs.utc(dateHour).set('hour', 7).set('minute', 0);
    const endOfDay = dayjs.utc(dateHour).set('hour', 21).set('minute', 0);

    const dateHourFns = dayjs.utc(dateHour);

    if (dateHourFns.minute() !== 0) {
      if (dateHourFns.minute() !== 30) {
        throw new error.InvalidAppointmentTimeError();
      }
    }

    if (dateHourFns.isBefore(startOfDay) || dateHourFns.isAfter(endOfDay)) {
      throw new error.OutOfOfficeHoursError();
    }

    const professionalAppointments = await this.prisma.appointment.findFirst({
      where: {
        AND: [
          {
            date_hour: dayjs.utc(dateHour).toDate(),
          },
          {
            professional_id: professionalId,
          },
        ],
      },
    });

    if (professionalAppointments) {
      throw new error.ProfessionalUnavailableError();
    }

    const appointmentSameRoomAndDateHour =
      await this.prisma.appointment.findFirst({
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

    if (appointmentSameRoomAndDateHour) {
      throw new error.AppointmentAlreadyExistsError();
    }

    const appointment = await this.prisma.appointment.create({
      data: {
        date_hour: dateHourFns.toDate(),
        professional_id: professionalId,
        professional_name: professional.name,
        patient_id: patientId,
        patient_name: patient.name,
        room_id: roomId,
      },
    });

    return appointment;
  }

  async getProfessionalAppointments(professionalId: string, dateHour: string) {
    const getAppointments = await this.prisma.appointment.findMany({
      where: {
        AND: [
          {
            date_hour: {
              gte: dayjs.utc(dateHour).startOf('day').toDate(),
              lt: dayjs.utc(dateHour).endOf('day').toDate(),
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

  async getPatientAppointments(patientId: string) {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        patient_id: patientId,
      },
    });

    return appointments;
  }

  async getAppointmentsByDate(dateHour: string) {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        date_hour: {
          gte: dayjs.utc(dateHour).startOf('day').toDate(),
          lt: dayjs.utc(dateHour).endOf('day').toDate(),
        },
      },
    });

    return appointments;
  }

  async getAvailableSchedules(room_id: string, date: string) {
    const agendamentos = await this.prisma.appointment.findMany({
      where: {
        AND: [
          {
            date_hour: {
              gte: dayjs.utc(date).startOf('day').toDate(),
              lt: dayjs.utc(date).endOf('day').toDate(),
            },
          },
          {
            room_id,
          },
        ],
      },
    });

    const horariosOcupados = agendamentos.map((agendamento) =>
      dayjs.utc(agendamento.date_hour).toISOString(),
    );
    console.log(`horarios ocupados: ${horariosOcupados}`);

    const dataInicio = dayjs
      .utc(date)
      .set('hour', 7)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0)
      .toISOString(); // Define o horário inicial (7:00)

    console.log(`data de inicio: ${dataInicio}`);

    const dataFim = dayjs
      .utc(date)
      .set('hour', 21)
      .set('minute', 0)
      .set('second', 0)
      .toISOString(); // Define o horário final (21:00)

    const horariosDisponiveis = [];

    let horaAtual = dayjs.utc(dataInicio).toISOString();

    console.log(`hora atual ${horaAtual}`);

    let horaArredondada = horaAtual;
    const check = !horariosOcupados.includes(horaAtual);
    console.log(`check: ${check}`);

    while (horaAtual <= dataFim) {
      horaArredondada = dayjs.utc(horaAtual).toISOString();
      // Arredonda para a hora mais próxima
      console.log(`hora arredondada ${horaArredondada}`);

      if (!horariosOcupados.includes(horaArredondada)) {
        console.log(`hora incluida: ${horaArredondada}`);
        horariosDisponiveis.push(horaArredondada);
      }

      horaAtual = dayjs.utc(horaAtual).add(30, 'minute').toISOString(); // Incrementa 30 minutos
    }

    return horariosDisponiveis;
  }

  async fetchAppointmentsByRoomAndDate(dateHour: string, roomId: string) {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        AND: [
          {
            date_hour: {
              gte: dayjs.utc(dateHour).startOf('day').toDate(),
              lt: dayjs.utc(dateHour).endOf('day').toDate(),
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

  async delete(appointmentId: string) {
    await this.prisma.appointment.delete({
      where: {
        id: appointmentId,
      },
    });
  }
}
