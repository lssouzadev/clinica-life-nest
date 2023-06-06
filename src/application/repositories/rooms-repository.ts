import { Prisma, Room } from '@prisma/client';

export abstract class RoomsRepository {
  abstract create(data: Prisma.RoomCreateInput): Promise<Room>;
  abstract findById(id: string): Promise<Room | null>;
}
