import { ProfessionalRoomsRepository } from '@application/repositories/professional-rooms-repository';
import { ProfessionalRoom } from '@prisma/client';
import { ProfessionalAlreadyRegisteredInThisRoomError } from '@common/@errors/types/professional-already-registered-in-this-room-error';
import { Injectable } from '@nestjs/common';

interface CreateProfessionalRoomUseCaseRequest {
  professionalId: string;
  roomId: string;
}

interface CreateProfessionalRoomUseCaseResponse {
  professionalRoom: ProfessionalRoom;
}

@Injectable()
export class CreateProfessionalRoomUseCase {
  constructor(
    private professionalRoomsRepository: ProfessionalRoomsRepository,
  ) {}

  async execute({
    professionalId,
    roomId,
  }: CreateProfessionalRoomUseCaseRequest): Promise<CreateProfessionalRoomUseCaseResponse> {
    const professionalRoomVerification =
      await this.professionalRoomsRepository.findByProfessionalIdAndRoomId(
        professionalId,
        roomId,
      );

    if (professionalRoomVerification) {
      throw new ProfessionalAlreadyRegisteredInThisRoomError();
    }

    const professionalRoom = await this.professionalRoomsRepository.create({
      professional_id: professionalId,
      room_id: roomId,
    });

    return {
      professionalRoom,
    };
  }
}
