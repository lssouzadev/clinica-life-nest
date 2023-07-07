import { Body, Controller, Post } from '@nestjs/common';
import { RegisterPatientBody } from 'src/@types/dtos/register-patient-body';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @Post()
  async register(@Body() body: RegisterPatientBody) {
    const { name, cpf, birthday, phone } = body;

    await this.patientsService.create({
      name,
      cpf,
      birthday,
      phone,
    });
  }
}
