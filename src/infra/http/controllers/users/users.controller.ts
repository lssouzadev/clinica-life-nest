import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RegisterUserBody } from '@infra/http/dtos/register-user-body';
import { RegisterUserUseCase } from '@application/use-cases/user/register-user';
import { AuthGuard } from '@infra/http/auth/auth.guard';

@Controller()
export class UsersController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  @UseGuards(AuthGuard)
  @Post('users')
  async register(@Body() body: RegisterUserBody) {
    const { email, password, name, patientId, professionalId, type } = body;
    await this.registerUserUseCase.execute({
      username: name,
      email,
      password,
      patientId,
      professionalId,
      type,
    });
  }
}
