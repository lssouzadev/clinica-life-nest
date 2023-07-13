import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateProfessionalRoomBody } from 'src/@types/dtos/create-professional-room-body';
import { ProfessionalRoomsService } from './professional-rooms.service';

@Controller('/room')
export class ProfessionalRoomsController {
  constructor(private professionalRoomsService: ProfessionalRoomsService) {}
  @Post('/:roomId/enable-professional')
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
  @Get()
  async findByProfessional(@Query() query: { professionalId: string }) {
    const { professionalId } = query;

    return await this.professionalRoomsService.findByProfessionalId(
      professionalId,
    );
  }
}
