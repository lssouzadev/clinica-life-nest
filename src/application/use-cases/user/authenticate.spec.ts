import { AuthenticateUserUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { InvalidCredentialsError } from '@common/@errors/types/invalid-credentials-error';
import { JwtService } from '@nestjs/jwt';

let jwtService: JwtService;
let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUserUseCase;

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    jwtService = new JwtService();
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUserUseCase(usersRepository, jwtService);
  });

  it('should be able to authenticate professional', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      type: 'professional',
      professional_id: 'prof-01',
    });

    const { token } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(token).toEqual(expect.any(String));
  });

  it('should not be able to authenticate user with wrong email', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      type: 'professional',
      professional_id: 'prof-01',
    });

    await expect(() =>
      sut.execute({
        email: 'different@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate user with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      type: 'professional',
      professional_id: 'prof-01',
    });

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
