import { Prisma, ProfessionalRoom } from '@prisma/client';

export abstract class ProfessionalRoomsRepository {
  abstract create(
    data: Prisma.ProfessionalRoomUncheckedCreateInput,
  ): Promise<ProfessionalRoom>;
  abstract findByProfessionalIdAndRoomId(
    professionalId: string,
    roomId: string,
  ): Promise<ProfessionalRoom | null>;
}
