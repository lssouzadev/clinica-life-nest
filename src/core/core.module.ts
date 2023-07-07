import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/core/users/users.module';
import { AppointmentsModule } from 'src/core/appointments/appointments.module';
import { ClinicsModule } from 'src/core/clinics/clinics.module';
import { PatientsModule } from 'src/core/patients/patients.module';
import { ProceduresModule } from 'src/core/procedures/procedures.module';
import { ProfessionalRoomsModule } from 'src/core/professional-rooms/professional-rooms.module';
import { ProfessionalsModule } from 'src/core/professionals/professionals.module';
import { RoomsModule } from 'src/core/rooms/rooms.module';
import { TreatmentsModule } from 'src/core/treatments/treatments.module';

@Module({
  imports: [
    DatabaseModule,
    AppointmentsModule,
    ClinicsModule,
    PatientsModule,
    ProceduresModule,
    ProfessionalRoomsModule,
    ProfessionalsModule,
    RoomsModule,
    TreatmentsModule,
    UsersModule,
  ],
})
export class CoreModule {}
