import { Body, Controller, Post, UseGuards, Get, Req } from '@nestjs/common';
import { RegisterUserBody } from 'src/@types/dtos/register-user-body';
import { AuthGuard } from '@infra/auth/auth.guard';
import { Request } from 'express';
import { UsersService } from './users.service';
import { hash } from 'bcryptjs';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post('users')
  async register(@Body() body: RegisterUserBody) {
    const { email, password, name, patientId, professionalId, type } = body;

    const password_hash = await hash(password, 6);

    await this.usersService.create({
      name,
      email,
      password_hash,
      patient_id: patientId,
      professional_id: professionalId,
      type,
    });
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getUser(@Req() req: Request) {
    const { sub } = req.user;
    const user = await this.usersService.findById(sub);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      professionalId: user.professional_id,
      patientId: user.patient_id,
    };
  }
}
