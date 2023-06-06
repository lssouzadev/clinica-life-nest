import { RegisterClinicUseCase } from '@application/use-cases/clinic/register-clinic';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterClinicBody } from '@infra/http/dtos/register-clinic-body';

@Controller('/clinics')
export class ClinicsController {
  constructor(private registerClinicUseCase: RegisterClinicUseCase) {}

  @Post()
  async register(@Body() body: RegisterClinicBody) {
    const { name, address, phone } = body;

    await this.registerClinicUseCase.execute({
      name,
      address,
      phone,
    });
  }
}
