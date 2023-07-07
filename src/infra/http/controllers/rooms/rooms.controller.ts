import { CreateRoomUseCase } from '@application/use-cases/room/create-room';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoomBody } from '@infra/http/dtos/create-room-body';

@Controller('rooms')
export class RoomsController {
  constructor(private createRoomUseCase: CreateRoomUseCase) {}
  @Post()
  async create(@Body() body: CreateRoomBody) {
    const { title } = body;

    await this.createRoomUseCase.execute({
      title,
    });
  }
}
