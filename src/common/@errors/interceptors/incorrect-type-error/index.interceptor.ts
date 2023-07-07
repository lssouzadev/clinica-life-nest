import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotAcceptableException,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { IncorrectTypeError } from '@common/@errors/types';

@Injectable()
export class IncorrectTypeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof IncorrectTypeError) {
          throw new NotAcceptableException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
