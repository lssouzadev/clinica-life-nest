import { Body, Controller, Post } from '@nestjs/common';
import { RegisterClinicBody } from 'src/@types/dtos/register-clinic-body';
import { ClinicsService } from './clinics.service';

@Controller('/clinics')
export class ClinicsController {
  constructor(private clinicsService: ClinicsService) {}

  @Post()
  async register(@Body() body: RegisterClinicBody) {
    const { name, address, phone } = body;

    await this.clinicsService.create({
      name,
      address,
      phone,
    });
  }
}
