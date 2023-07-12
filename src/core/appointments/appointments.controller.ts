import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { RegisterAppointmentBody } from 'src/@types/dtos/register-appointment-body';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FetchByRoomAndDateQuery } from 'src/@types/dtos/fetch-by-room-and-date-query';
import { GetAppointmentsByDateQuery } from 'src/@types/dtos/get-appointments-by-date-query';
import { GetByProfessionalQuery } from 'src/@types/dtos/get-by-professional-query';
import { AppointmentsService } from './appointments.service';

dayjs.extend(utc);

@Controller()
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Post('appointments')
  async register(@Body() body: RegisterAppointmentBody) {
    const { dateHour, patientId, professionalId, roomId } = body;

    await this.appointmentsService.register({
      dateHour: new Date(dateHour),
      patientId,
      professionalId,
      roomId,
    });
  }

  @Delete('appointments/:id/delete')
  async delete(@Param('id') appointmentId: string) {
    await this.appointmentsService.delete(appointmentId);
  }

  @Get('/rooms/:roomId/appointments')
  async fetchManyByRoomAndDate(
    @Param('roomId') roomId: string,
    @Query() query: FetchByRoomAndDateQuery,
  ) {
    const { date } = query;

    await this.appointmentsService.fetchAppointmentsByRoomAndDate(roomId, date);
  }

  @Get('/appointments/get')
  async getByDate(@Query() query: GetAppointmentsByDateQuery) {
    const { date } = query;

    await this.appointmentsService.getAppointmentsByDate(date);
  }

  @Get('appointments/get-available')
  async getAvailableSchedules(
    @Query() query: { room_id: string; date: string },
  ) {
    const { date, room_id } = query;
    return await await this.appointmentsService.getAvailableSchedules(
      room_id,
      date,
    );
  }

  @Get('/professionals/:professionalId/appointments')
  async getByProfessional(
    @Param('professionalId') professionalId: string,
    @Query() query: GetByProfessionalQuery,
  ) {
    const { date } = query;

    const { appointments } =
      await this.appointmentsService.getProfessionalAppointments(
        professionalId,
        date,
      );

    return appointments;
  }

  @Get('/patients/:patientId/appointments')
  async patientHistory(@Param('patientId') patientId: string) {
    await this.appointmentsService.getPatientAppointments(patientId);
  }
}
