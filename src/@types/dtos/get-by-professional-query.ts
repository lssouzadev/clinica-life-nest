import { IsNotEmpty } from 'class-validator';

export class GetByProfessionalQuery {
  @IsNotEmpty()
  date: string;
}
