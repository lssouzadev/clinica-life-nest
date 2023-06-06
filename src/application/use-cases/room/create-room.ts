import { Room } from '@prisma/client';
import { RoomsRepository } from '@application/repositories/rooms-repository';
import { Injectable } from '@nestjs/common';

interface CreateRoomUseCaseRequest {
  title: string;
}

interface CreateRoomUseCaseResponse {
  room: Room;
}

@Injectable()
export class CreateRoomUseCase {
  constructor(private roomsRepository: RoomsRepository) {}
  async execute({
    title,
  }: CreateRoomUseCaseRequest): Promise<CreateRoomUseCaseResponse> {
    const room = await this.roomsRepository.create({
      title,
    });

    return {
      room,
    };
  }
}
