import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { DeleteAppointmentUseCase } from '@application/use-cases/appointment/delete-appointment';
import { FetchAppointmentsByRoomAndDateUseCase } from '@application/use-cases/appointment/fetch-appointments-by-room-and-date';
import { GetAppointmentsByDateUseCase } from '@application/use-cases/appointment/get-appointments-by-date';
import { GetPatientAppointmentsHistoryUseCase } from '@application/use-cases/appointment/get-patient-appointments-history';
import { GetProfessionalAppointmentsUseCase } from '@application/use-cases/appointment/get-professional-appointments';
import { RegisterAppointmentUseCase } from '@application/use-cases/appointment/register-appointment';

@Module({
  imports: [DatabaseModule],
  controllers: [AppointmentsController],
  providers: [
    RegisterAppointmentUseCase,
    DeleteAppointmentUseCase,
    FetchAppointmentsByRoomAndDateUseCase,
    GetAppointmentsByDateUseCase,
    GetProfessionalAppointmentsUseCase,
    GetPatientAppointmentsHistoryUseCase,
  ],
})
export class AppointmentsModule {}
