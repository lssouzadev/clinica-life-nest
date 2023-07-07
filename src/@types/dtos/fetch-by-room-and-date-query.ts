import { IsNotEmpty } from 'class-validator';

export class FetchByRoomAndDateQuery {
  @IsNotEmpty()
  date: string;
}
