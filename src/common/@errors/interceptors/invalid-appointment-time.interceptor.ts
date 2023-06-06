import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotAcceptableException,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { InvalidAppointmentTimeError } from '../types/invalid-appointment-time-error';

@Injectable()
export class InvalidAppointmentTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof InvalidAppointmentTimeError) {
          throw new NotAcceptableException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
