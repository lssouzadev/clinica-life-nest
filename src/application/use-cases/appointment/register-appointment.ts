import { AppointmentsRepository } from '@application/repositories/appointments-repository';
import { Appointment } from '@prisma/client';
import { OutOfOfficeHoursError } from '@common/@errors/types/ out-of-office-hours-error';
import { InvalidAppointmentTimeError } from '@common/@errors/types/invalid-appointment-time-error';
import { AppointmentAlreadyExistsError } from '@common/@errors/types/appointment-already-exists-error';
import { ProfessionalUnavailableError } from '@common/@errors/types/professional-unavailable-error';
import { ProfessionalRoomsRepository } from '@application/repositories/professional-rooms-repository';
import { ProfessionalNotAllowedError } from '@common/@errors/types/professional-not-allowed-error';
import { ProfessionalsRepository } from '@application/repositories/professionals-repository';
import { RoomsRepository } from '@application/repositories/rooms-repository';
import { PatientsRepository } from '@application/repositories/patients-repository';
import { ProfessionalNotFoundError } from '@common/@errors/types/professional-not-found-error';
import { PatientNotFoundError } from '@common/@errors/types/patient-not-found-error';
import { RoomNotFoundError } from '@common/@errors/types/room-not-found-error';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Injectable } from '@nestjs/common';

dayjs.extend(utc);

interface AppointmentUseCaseRequest {
  dateHour: Date;
  professionalId: string;
  patientId: string;
  roomId: string;
}

interface AppointmentUseCaseResponse {
  appointment: Appointment;
}

@Injectable()
export class RegisterAppointmentUseCase {
  constructor(
    private appointmentsRepository: AppointmentsRepository,
    private professionalRoomsRepository: ProfessionalRoomsRepository,
    private professionalsRepository: ProfessionalsRepository,
    private roomsRepository: RoomsRepository,
    private patientsRepository: PatientsRepository,
  ) {}

  async execute({
    dateHour,
    professionalId,
    patientId,
    roomId,
  }: AppointmentUseCaseRequest): Promise<AppointmentUseCaseResponse> {
    const professionalRoomVerification =
      await this.professionalRoomsRepository.findByProfessionalIdAndRoomId(
        professionalId,
        roomId,
      );

    if (!professionalRoomVerification) {
      throw new ProfessionalNotAllowedError();
    }

    const checkProfessionalExists = await this.professionalsRepository.findById(
      professionalId,
    );

    if (!checkProfessionalExists) {
      throw new ProfessionalNotFoundError();
    }

    const checkPatientExists = await this.patientsRepository.findById(
      patientId,
    );

    if (!checkPatientExists) {
      throw new PatientNotFoundError();
    }

    const checkRoomExists = await this.roomsRepository.findById(roomId);

    if (!checkRoomExists) {
      throw new RoomNotFoundError();
    }

    const startOfDay = dayjs.utc(dateHour).set('hour', 7).set('minute', 0);
    const endOfDay = dayjs.utc(dateHour).set('hour', 21).set('minute', 0);

    const dateHourFns = dayjs.utc(dateHour);

    if (dateHourFns.minute() !== 0) {
      if (dateHourFns.minute() !== 30) {
        throw new InvalidAppointmentTimeError();
      }
    }

    if (dateHourFns.isBefore(startOfDay || dateHourFns.isAfter(endOfDay))) {
      throw new OutOfOfficeHoursError();
    }

    const professionalAppointments =
      await this.appointmentsRepository.findAppointmentByProfessionalIdAndDate(
        professionalId,
        dateHour,
      );

    if (professionalAppointments) {
      throw new ProfessionalUnavailableError();
    }

    const appointmentSameRoomAndDateHour =
      await this.appointmentsRepository.findAppointmentByRoomIdAndDateHour(
        dateHour,
        roomId,
      );

    if (appointmentSameRoomAndDateHour) {
      throw new AppointmentAlreadyExistsError();
    }

    const appointment = await this.appointmentsRepository.create({
      date_hour: dateHourFns.toDate(),
      professional_id: professionalId,
      patient_id: patientId,
      room_id: roomId,
    });

    return {
      appointment,
    };
  }
}
