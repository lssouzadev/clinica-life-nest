import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateProfessionalRoomBody } from 'src/@types/dtos/create-professional-room-body';
import { ProfessionalRoomsService } from './professional-rooms.service';

@Controller('/room/:roomId/enable-professional')
export class ProfessionalRoomsController {
  constructor(private professionalRoomsService: ProfessionalRoomsService) {}
  @Post()
  async create(
    @Param('roomId') roomId: string,
    @Body() body: CreateProfessionalRoomBody,
  ) {
    const { professionalId } = body;

    await this.professionalRoomsService.create({
      professional_id: professionalId,
      room_id: roomId,
    });
  }
}
