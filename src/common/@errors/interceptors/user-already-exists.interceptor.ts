import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { UserAlreadyExistsError } from '../types/user-already-exists-error';

@Injectable()
export class UserAlreadyExistsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof UserAlreadyExistsError) {
          throw new ConflictException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
