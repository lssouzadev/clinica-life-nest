import { IsNotEmpty, MinLength, ValidateIf } from 'class-validator';

export class RegisterUserBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  type: string;

  @MinLength(6)
  professionalId: string | null;

  @ValidateIf((patientId) => patientId === String)
  patientId: string | null;
}
