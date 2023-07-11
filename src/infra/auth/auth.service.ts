import { InvalidCredentialsError } from '@common/@errors/types/invalid-credentials-error';
import { compare } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from '@env/index';
import { User } from '@prisma/client';
import { UserNotFoundError } from '@common/@errors/types/user-not-found-error';
import { UsersService } from 'src/core/users/users.service';

interface PayloadProps {
  sub: string;
  email: string;
}

interface AuthenticateUseCaseResponse {
  token: string;
  refreshToken: string;
  user: User;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

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

    const payload = { sub: user.id, email: user.email };

    const { access_token, refresh_token } = await this.tokenGenerate(payload);

    return {
      access_token,
      refresh_token,
      id: user.id,
      name: user.name,
      email: user.email,
      professionalId: user.professional_id,
    };
  }

  async tokenGenerate(payload: PayloadProps) {
    const access_token = await this.jwtService.signAsync(payload, {
      secret: env.JWT_SECRET,
      expiresIn: '30s',
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: env.JWT_SECRET,
      expiresIn: '7 days',
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async refresh(refresh_token: string) {
    const { user } = await this.verifyRefreshToken(refresh_token);
    return await this.tokenGenerate({ email: user.email, sub: user.id });
  }

  private async verifyRefreshToken(refresh_token: string) {
    if (!refresh_token) {
      throw new UserNotFoundError();
    }

    const email = this.jwtService.decode(refresh_token)['email'];

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    try {
      this.jwtService.verify(refresh_token, {
        secret: env.JWT_SECRET,
      });
      return {
        user: {
          ...user,
          password_hash: undefined,
        },
      };
    } catch (err) {
      throw new UserNotFoundError();
    }
  }
}
