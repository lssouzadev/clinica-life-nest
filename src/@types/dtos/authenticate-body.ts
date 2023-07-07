import { IsNotEmpty } from 'class-validator';

export class AuthenticateBody {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
