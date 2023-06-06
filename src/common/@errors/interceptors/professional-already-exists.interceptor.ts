import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { ProfessionalAlreadyExistsError } from '../types/professional-already-exists-error';

@Injectable()
export class ProfessionalAlreadyExistsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof ProfessionalAlreadyExistsError) {
          throw new ConflictException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
