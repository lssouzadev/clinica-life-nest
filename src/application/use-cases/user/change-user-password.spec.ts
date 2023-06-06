import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { ChangeUserPasswordUseCase } from './change-user-password';
import { compare, hash } from 'bcryptjs';
import { InvalidCredentialsError } from '@common/@errors/types/invalid-credentials-error';

let usersRepository: InMemoryUsersRepository;
let sut: ChangeUserPasswordUseCase;

describe('Change User Password Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new ChangeUserPasswordUseCase(usersRepository);
  });

  it('should be able to change a user password', async () => {
    await usersRepository.create({
      id: 'id-01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      type: 'professional',
      professional_id: 'prof-01',
    });

    const newPassword = '12345678';

    const { user } = await sut.execute({
      userId: 'id-01',
      oldPassword: '123456',
      newPassword,
    });

    const isCorrectlyPasswordMatches = await compare(
      newPassword,
      user.password_hash,
    );

    expect(isCorrectlyPasswordMatches).toEqual(true);
  });

  it('should not be able to change a user password with a wrong old password', async () => {
    await usersRepository.create({
      id: 'id-01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      type: 'professional',
      professional_id: 'prof-01',
    });

    const newPassword = '12345678';

    await expect(() =>
      sut.execute({
        userId: 'id-01',
        oldPassword: 'wrong-password',
        newPassword,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
