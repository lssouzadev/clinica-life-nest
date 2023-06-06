import { CreateTreatmentUseCase } from '@application/use-cases/treatment/create-treatment';
import { Body, Controller, Param } from '@nestjs/common';
import { CreateTreatmentBody } from '@infra/http/dtos/create-treatment-body';

@Controller('/patient/:patientId/treatment')
export class TreatmentsController {
  constructor(private createTreatmentUseCase: CreateTreatmentUseCase) {}

  async createTreatment(
    @Body() body: CreateTreatmentBody,
    @Param('patientId') patientId: string,
  ) {
    const { procedureId, professionalId } = body;

    await this.createTreatmentUseCase.execute({
      patientId,
      procedureId,
      professionalId,
    });
  }
}
