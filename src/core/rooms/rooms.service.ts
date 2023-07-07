import { Prisma } from '@prisma/client';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomsService {
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
