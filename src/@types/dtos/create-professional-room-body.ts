import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProfessionalRoomBody {
  @IsNotEmpty()
  @IsUUID()
  professionalId: string;
}
