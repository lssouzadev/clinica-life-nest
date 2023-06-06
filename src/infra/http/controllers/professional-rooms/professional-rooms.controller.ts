import { Body, Controller, Param } from '@nestjs/common';
import { CreateProfessionalRoomBody } from '@infra/http/dtos/create-professional-room-body';
import { CreateProfessionalRoomUseCase } from '@application/use-cases/professional-room/create-professional-room';

@Controller('/room/:roomId/enable-professional')
export class ProfessionalRoomsController {
  constructor(
    private createProfessionalRoomUseCase: CreateProfessionalRoomUseCase,
  ) {}
  async create(
    @Param('roomId') roomId: string,
    @Body() body: CreateProfessionalRoomBody,
  ) {
    const { professionalId } = body;

    await this.createProfessionalRoomUseCase.execute({
      professionalId,
      roomId,
    });
  }
}
