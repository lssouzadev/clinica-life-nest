import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { CreateRoomUseCase } from '@application/use-cases/room/create-room';

@Module({
  imports: [DatabaseModule],
  controllers: [RoomsController],
  providers: [CreateRoomUseCase],
})
export class RoomsModule {}
