import { Prisma } from '@prisma/client';
import { RoomsRepository } from '@application/repositories/rooms-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaRoomsRepository implements RoomsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.RoomUncheckedCreateInput) {
    const room = await this.prisma.room.create({
      data,
    });

    return room;
  }

  async findById(id: string) {
    const room = await this.prisma.room.findUnique({
      where: {
        id,
      },
    });

    if (!room) {
      return null;
    }

    return room;
  }
}
