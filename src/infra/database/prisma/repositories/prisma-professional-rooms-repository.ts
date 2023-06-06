import { Prisma, ProfessionalRoom } from '@prisma/client';
import { ProfessionalRoomsRepository } from '@application/repositories/professional-rooms-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaProfessionalRoomsRepository
  implements ProfessionalRoomsRepository
{
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.ProfessionalRoomUncheckedCreateInput) {
    const professionalRoom = await this.prisma.professionalRoom.create({
      data,
    });

    return professionalRoom;
  }

  async findByProfessionalIdAndRoomId(
    professionalId: string,
    roomId: string,
  ): Promise<ProfessionalRoom | null> {
    const professionalRoom = await this.prisma.professionalRoom.findFirst({
      where: {
        AND: [
          {
            professional_id: professionalId,
          },
          {
            room_id: roomId,
          },
        ],
      },
    });

    if (!professionalRoom) {
      return null;
    }

    return professionalRoom;
  }
}
