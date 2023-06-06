import { IsNotEmpty } from 'class-validator';

export class CreateProcedureBody {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  priceProcedure: string;

  @IsNotEmpty()
  costProcedure: string;
}
