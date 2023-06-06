import { InMemoryProfessionalRoomsRepository } from '@test/repositories/in-memory-professional-rooms-repository';
import { CreateProfessionalRoomUseCase } from './create-professional-room';

let professionalRoomsRepository: InMemoryProfessionalRoomsRepository;
let sut: CreateProfessionalRoomUseCase;

describe('Create Professional-Room Use Case', () => {
  beforeEach(() => {
    professionalRoomsRepository = new InMemoryProfessionalRoomsRepository();
    sut = new CreateProfessionalRoomUseCase(professionalRoomsRepository);
  });

  it('should be able to create a professional room', async () => {
    const { professionalRoom } = await sut.execute({
      professionalId: 'professional-01',
      roomId: 'room-01',
    });

    expect(professionalRoom.id).toEqual(expect.any(String));
  });
});
