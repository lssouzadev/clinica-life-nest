import { InvalidCredentialsError } from '@common/@errors/types/invalid-credentials-error';
import { compare } from 'bcryptjs';
import { UsersRepository } from '@application/repositories/users-repository';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from '@env/index';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  token: string;
}

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordCorrectlyMatch = await compare(
      password,
      user.password_hash,
    );

    if (!isPasswordCorrectlyMatch) {
      throw new InvalidCredentialsError();
    }

    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        username: user.email,
      },
      {
        secret: env.JWT_SECRET,
        expiresIn: '7 days',
      },
    );

    console.log(token);

    return {
      token,
    };
  }
}
