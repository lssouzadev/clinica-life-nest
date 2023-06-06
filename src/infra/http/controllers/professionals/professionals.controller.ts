import { RegisterProfessionalUseCase } from '@application/use-cases/professional/register-professional';
import { Body, Controller } from '@nestjs/common';
import { RegisterProfessionalBody } from '@infra/http/dtos/register-professional-body';

@Controller('professionals')
export class ProfessionalsController {
  constructor(
    private registerProfessionalUseCase: RegisterProfessionalUseCase,
  ) {}

  async registerProfessional(@Body() body: RegisterProfessionalBody) {
    const { name, cpf, specialty, phone, clinicId } = body;

    await this.registerProfessionalUseCase.execute({
      name,
      cpf,
      specialty,
      phone,
      clinicId,
    });
  }
}
