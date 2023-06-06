import { IsNotEmpty } from 'class-validator';

export class RegisterPatientBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  birthday: string;
}
