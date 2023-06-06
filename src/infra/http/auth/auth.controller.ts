import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticateBody } from '../dtos/authenticate-body';
import { AuthenticateUserUseCase } from '@application/use-cases/user/authenticate';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('sessions')
export class AuthController {
  constructor(private authenticateUseCase: AuthenticateUserUseCase) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(ThrottlerGuard)
  @Post()
  async authenticate(@Body() body: AuthenticateBody) {
    const { email, password } = body;

    await this.authenticateUseCase.execute({
      email,
      password,
    });
  }
}
