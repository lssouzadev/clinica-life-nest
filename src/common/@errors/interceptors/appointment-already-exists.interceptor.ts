import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { AppointmentAlreadyExistsError } from '../types/appointment-already-exists-error';

@Injectable()
export class AppointmentAlreadyExistsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof AppointmentAlreadyExistsError) {
          throw new ConflictException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
