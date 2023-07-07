import { Prisma, ProfessionalRoom } from '@prisma/client';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProfessionalAlreadyRegisteredInThisRoomError } from '@common/@errors/types';

@Injectable()
export class ProfessionalRoomsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProfessionalRoomUncheckedCreateInput) {
    const professionalRoomVerification =
      await this.findByProfessionalIdAndRoomId(
        data.professional_id,
        data.room_id,
      );

    if (professionalRoomVerification) {
      throw new ProfessionalAlreadyRegisteredInThisRoomError();
    }

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
