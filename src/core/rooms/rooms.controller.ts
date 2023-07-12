import { Body, Controller, Get, Post } from '@nestjs/common';
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
  @Get()
  async findAll() {
    return await this.roomsService.findAll();
  }
}
