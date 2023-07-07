import { IsNotEmpty, IsUUID } from 'class-validator';

export class RegisterAppointmentBody {
  @IsNotEmpty()
  dateHour: string;

  @IsNotEmpty()
  @IsUUID()
  professionalId: string;

  @IsNotEmpty()
  @IsUUID()
  patientId: string;

  @IsNotEmpty()
  @IsUUID()
  roomId: string;
}
