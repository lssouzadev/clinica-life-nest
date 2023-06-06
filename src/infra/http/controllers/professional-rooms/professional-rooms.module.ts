import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ProfessionalRoomsController } from './professional-rooms.controller';
import { CreateProfessionalRoomUseCase } from '@application/use-cases/professional-room/create-professional-room';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfessionalRoomsController],
  providers: [CreateProfessionalRoomUseCase],
})
export class ProfessionalRoomsModule {}
