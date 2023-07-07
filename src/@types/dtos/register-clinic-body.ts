import { IsNotEmpty } from 'class-validator';

export class RegisterClinicBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  phone: string;
}
