import { Body, Controller, Post, UseGuards, Get, Req } from '@nestjs/common';
import { RegisterUserBody } from '@infra/http/dtos/register-user-body';
import { RegisterUserUseCase } from '@application/use-cases/user/register-user';
import { AuthGuard } from '@infra/http/auth/auth.guard';
import { GetUserProfileUseCase } from '@application/use-cases/user/get-user-profile';
import { Request } from 'express';

@Controller()
export class UsersController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
    private getUserProfileUseCase: GetUserProfileUseCase,
  ) {}

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

  @UseGuards(AuthGuard)
  @Get('me')
  async getUser(@Req() req: Request) {
    const { sub } = req.user;
    const { user } = await this.getUserProfileUseCase.execute({
      userId: sub,
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      professionalId: user.professional_id,
      patientId: user.patient_id,
    };
  }
}
