import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoomBody } from 'src/@types/dtos/create-room-body';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}
  @Post()
  async create(@Body() body: CreateRoomBody) {
    const { title } = body;

    await this.roomsService.create({
      title,
    });
  }
}
