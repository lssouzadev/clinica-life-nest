import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ProfessionalRoomsController } from './professional-rooms.controller';
import { ProfessionalRoomsService } from './professional-rooms.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfessionalRoomsController],
  providers: [ProfessionalRoomsService],
  exports: [ProfessionalRoomsService],
})
export class ProfessionalRoomsModule {}
