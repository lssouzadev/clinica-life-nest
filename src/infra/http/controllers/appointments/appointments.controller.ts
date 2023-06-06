import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { RegisterAppointmentUseCase } from '@application/use-cases/appointment/register-appointment';
import { RegisterAppointmentBody } from '@infra/http/dtos/register-appointment-body';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DeleteAppointmentUseCase } from '@application/use-cases/appointment/delete-appointment';
import { FetchAppointmentsByRoomAndDateUseCase } from '@application/use-cases/appointment/fetch-appointments-by-room-and-date';
import { FetchByRoomAndDateQuery } from '@infra/http/dtos/fetch-by-room-and-date-query';
import { GetAppointmentsByDateUseCase } from '@application/use-cases/appointment/get-appointments-by-date';
import { GetAppointmentsByDateQuery } from '@infra/http/dtos/get-appointments-by-date-query';
import { GetByProfessionalQuery } from '@infra/http/dtos/get-by-professional-query';
import { GetProfessionalAppointmentsUseCase } from '@application/use-cases/appointment/get-professional-appointments';
import { GetPatientAppointmentsHistoryUseCase } from '@application/use-cases/appointment/get-patient-appointments-history';

dayjs.extend(utc);

@Controller()
export class AppointmentsController {
  constructor(
    private registerAppointmentUseCase: RegisterAppointmentUseCase,
    private deleteAppointmentUseCase: DeleteAppointmentUseCase,
    private fetchAppointmentsByRoomAndDateUseCase: FetchAppointmentsByRoomAndDateUseCase,
    private getAppointmentsByDateUseCase: GetAppointmentsByDateUseCase,
    private getProfessionalAppointmentsUseCase: GetProfessionalAppointmentsUseCase,
    private getPatientAppointmentsHistoryUseCase: GetPatientAppointmentsHistoryUseCase,
  ) {}

  @Post('appointments')
  async register(@Body() body: RegisterAppointmentBody) {
    const { dateHour, patientId, professionalId, roomId } = body;

    await this.registerAppointmentUseCase.execute({
      dateHour: new Date(dateHour),
      patientId,
      professionalId,
      roomId,
    });
  }

  @Delete('appointments/:id/delete')
  async delete(@Param('id') appointmentId: string) {
    await this.deleteAppointmentUseCase.execute({
      appointmentId,
    });
  }

  @Get('/rooms/:roomId/appointments')
  async fetchManyByRoomAndDate(
    @Param('roomId') roomId: string,
    @Query() query: FetchByRoomAndDateQuery,
  ) {
    const { date } = query;

    const dateFormat = dayjs.utc(date).toDate();

    await this.fetchAppointmentsByRoomAndDateUseCase.execute({
      roomId,
      date: dateFormat,
    });
  }

  @Get('/appointments/get')
  async getByDate(@Query() query: GetAppointmentsByDateQuery) {
    const { date } = query;

    const dateFormat = dayjs.utc(date).toDate();

    await this.getAppointmentsByDateUseCase.execute({
      date: dateFormat,
    });
  }

  @Get('/professionals/:professionalId/appointments')
  async getByProfessional(
    @Param('professionalId') professionalId: string,
    @Query() query: GetByProfessionalQuery,
  ) {
    const { date } = query;

    const dateFormat = dayjs.utc(date).toDate();

    await this.getProfessionalAppointmentsUseCase.execute({
      professionalId,
      date: dateFormat,
    });
  }

  @Get('/patients/:patientId/appointments')
  async patientHistory(@Param('patientId') patientId: string) {
    await this.getPatientAppointmentsHistoryUseCase.execute({
      patientId,
    });
  }
}
