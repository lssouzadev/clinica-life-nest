import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTreatmentBody {
  @IsNotEmpty()
  @IsUUID()
  professionalId: string;

  @IsNotEmpty()
  @IsUUID()
  procedureId: string;
}
