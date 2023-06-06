import { RegisterPatientUseCase } from '@application/use-cases/patient/register-patient';
import { Body, Controller } from '@nestjs/common';
import { RegisterPatientBody } from '@infra/http/dtos/register-patient-body';

@Controller()
export class PatientsController {
  constructor(private registerPatientUseCase: RegisterPatientUseCase) {}

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
