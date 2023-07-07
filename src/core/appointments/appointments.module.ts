import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { ProfessionalRoomsModule } from '../professional-rooms/professional-rooms.module';

@Module({
  imports: [DatabaseModule, ProfessionalRoomsModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
