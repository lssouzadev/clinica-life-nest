import { IsNotEmpty, IsUUID } from 'class-validator';

export class RegisterProfessionalBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  specialty: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsUUID()
  clinicId: string;
}
