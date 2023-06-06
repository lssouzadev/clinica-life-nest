import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { GetUserProfileUseCase } from './get-user-profile';
import { hash } from 'bcryptjs';
import { UserNotFoundError } from '@common/@errors/types/user-not-found-error';

let UsersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    UsersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(UsersRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await UsersRepository.create({
      id: 'id-01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      type: 'professional',
      professional_id: 'prof-01',
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual('John Doe');
  });

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });
});
