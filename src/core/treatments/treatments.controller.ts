import { Body, Controller, Param } from '@nestjs/common';
import { CreateTreatmentBody } from 'src/@types/dtos/create-treatment-body';
import { TreatmentsService } from './treatments.service';
import { ProceduresService } from '../procedures/procedures.service';
import { ProcedureNotFoundError } from '@common/@errors/types';

@Controller('/patient/:patientId/treatment')
export class TreatmentsController {
  constructor(
    private treatmentsService: TreatmentsService,
    private proceduresService: ProceduresService,
  ) {}

  async createTreatment(
    @Body() body: CreateTreatmentBody,
    @Param('patientId') patientId: string,
  ) {
    const { procedureId, professionalId } = body;

    const procedure = await this.proceduresService.findById(procedureId);

    if (!procedure) {
      throw new ProcedureNotFoundError();
    }

    await this.treatmentsService.create({
      title: procedure.title,
      price_treatment: procedure.price_procedure,
      patient_id: patientId,
      procedure_id: procedureId,
      professional_id: professionalId,
    });
  }
}
