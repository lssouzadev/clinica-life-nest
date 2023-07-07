import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotAcceptableException,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { InvalidAppointmentTimeError } from '@common/@errors/types';

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
