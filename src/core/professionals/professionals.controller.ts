import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterProfessionalBody } from 'src/@types/dtos/register-professional-body';
import { ProfessionalsService } from './professionals.service';

@Controller('professionals')
export class ProfessionalsController {
  constructor(private professionalsService: ProfessionalsService) {}
  @Post()
  async registerProfessional(@Body() body: RegisterProfessionalBody) {
    const { name, cpf, specialty, phone, clinicId } = body;

    await this.professionalsService.create({
      name,
      cpf,
      specialty,
      phone,
      clinic_id: clinicId,
    });
  }
  @Get()
  async findAllProfessionals() {
    return await this.professionalsService.findAll();
  }
}
