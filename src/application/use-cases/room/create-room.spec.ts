import { InMemoryRoomsRepository } from '@test/repositories/in-memory-rooms-repository';
import { CreateRoomUseCase } from './create-room';

let roomsRepository: InMemoryRoomsRepository;
let sut: CreateRoomUseCase;

describe('Create Room Use Case', () => {
  beforeEach(() => {
    roomsRepository = new InMemoryRoomsRepository();
    sut = new CreateRoomUseCase(roomsRepository);
  });

  it('should be able to create room', async () => {
    const { room } = await sut.execute({
      title: 'Sala-01',
    });

    expect(room.id).toEqual(expect.any(String));
  });
});
