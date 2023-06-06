import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AppointmentsRepository } from '@application/repositories/appointments-repository';
import { PrismaAppointmentsRepository } from './prisma/repositories/prisma-appointments-repository';
import { ClinicsRepository } from '@application/repositories/clinics-repository';
import { PrismaClinicsRepository } from './prisma/repositories/prisma-clinics-repository';
import { PatientsRepository } from '@application/repositories/patients-repository';
import { PrismaPatientsRepository } from './prisma/repositories/prisma-patients-repository';
import { ProceduresRepository } from '@application/repositories/procedures-repository';
import { PrismaProceduresRepository } from './prisma/repositories/prisma-procedures-repository';
import { ProfessionalRoomsRepository } from '@application/repositories/professional-rooms-repository';
import { PrismaProfessionalRoomsRepository } from './prisma/repositories/prisma-professional-rooms-repository';
import { ProfessionalsRepository } from '@application/repositories/professionals-repository';
import { PrismaProfessionalsRepository } from './prisma/repositories/prisma-professionals-repository';
import { RoomsRepository } from '@application/repositories/rooms-repository';
import { PrismaRoomsRepository } from './prisma/repositories/prisma-rooms-repository';
import { TreatmentsRepository } from '@application/repositories/treatments-repository';
import { PrismaTreatmentsRepository } from './prisma/repositories/prisma-treatments-repository';
import { UsersRepository } from '@application/repositories/users-repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: AppointmentsRepository,
      useClass: PrismaAppointmentsRepository,
    },

    {
      provide: ClinicsRepository,
      useClass: PrismaClinicsRepository,
    },

    {
      provide: PatientsRepository,
      useClass: PrismaPatientsRepository,
    },

    {
      provide: ProceduresRepository,
      useClass: PrismaProceduresRepository,
    },

    {
      provide: ProfessionalRoomsRepository,
      useClass: PrismaProfessionalRoomsRepository,
    },

    {
      provide: ProfessionalsRepository,
      useClass: PrismaProfessionalsRepository,
    },

    {
      provide: RoomsRepository,
      useClass: PrismaRoomsRepository,
    },
    {
      provide: TreatmentsRepository,
      useClass: PrismaTreatmentsRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },

    {
      provide: RoomsRepository,
      useClass: PrismaRoomsRepository,
    },
  ],
  exports: [
    AppointmentsRepository,
    ClinicsRepository,
    PatientsRepository,
    ProceduresRepository,
    ProfessionalRoomsRepository,
    ProfessionalsRepository,
    RoomsRepository,
    TreatmentsRepository,
    UsersRepository,
    RoomsRepository,
  ],
})
export class DatabaseModule {}
