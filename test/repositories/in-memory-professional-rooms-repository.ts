import { Prisma, ProfessionalRoom } from '@prisma/client';
import { ProfessionalRoomsRepository } from '@application/repositories/professional-rooms-repository';
import { randomUUID } from 'crypto';

export class InMemoryProfessionalRoomsRepository
  implements ProfessionalRoomsRepository
{
  public items: ProfessionalRoom[] = [];

  async create(data: Prisma.ProfessionalRoomUncheckedCreateInput) {
    const professionalRoom = {
      id: data.id ?? randomUUID(),
      professional_id: data.professional_id,
      room_id: data.room_id,
    };

    this.items.push(professionalRoom);

    return professionalRoom;
  }

  async findByProfessionalIdAndRoomId(professionalId: string, roomId: string) {
    const professionalRoom = this.items.find(
      (item) =>
        item.professional_id === professionalId && item.room_id === roomId,
    );

    if (!professionalRoom) {
      return null;
    }

    return professionalRoom;
  }
}
