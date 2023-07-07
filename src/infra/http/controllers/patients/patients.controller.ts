import { RegisterPatientUseCase } from '@application/use-cases/patient/register-patient';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterPatientBody } from '@infra/http/dtos/register-patient-body';

@Controller('patients')
export class PatientsController {
  constructor(private registerPatientUseCase: RegisterPatientUseCase) {}

  @Post()
  async register(@Body() body: RegisterPatientBody) {
    const { name, cpf, birthday, phone } = body;

    await this.registerPatientUseCase.execute({
      name,
      cpf,
      birthday,
      phone,
    });
  }
}
