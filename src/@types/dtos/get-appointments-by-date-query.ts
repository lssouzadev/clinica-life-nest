import { IsNotEmpty } from 'class-validator';

export class GetAppointmentsByDateQuery {
  @IsNotEmpty()
  date: string;
}
