import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './controllers/users/users.module';
import { AppointmentsModule } from './controllers/appointments/appointments.module';
import { ClinicsModule } from './controllers/clinics/clinics.module';
import { PatientsModule } from './controllers/patients/patients.module';
import { ProceduresModule } from './controllers/procedures/procedures.module';
import { ProfessionalRoomsModule } from './controllers/professional-rooms/professional-rooms.module';
import { ProfessionalsModule } from './controllers/professionals/professionals.module';
import { RoomsModule } from './controllers/rooms/rooms.module';
import { TreatmentsModule } from './controllers/treatments/treatments.module';

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
export class HttpModule {}
