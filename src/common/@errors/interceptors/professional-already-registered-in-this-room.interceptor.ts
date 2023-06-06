import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { ProfessionalAlreadyRegisteredInThisRoomError } from '../types/professional-already-registered-in-this-room-error';

@Injectable()
export class ProfessionalAlreadyRegisteredInThisRoomInterceptor
  implements NestInterceptor
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof ProfessionalAlreadyRegisteredInThisRoomError) {
          throw new ConflictException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
