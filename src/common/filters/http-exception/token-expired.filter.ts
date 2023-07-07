import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { TokenExpiredError } from '@common/@errors/types/token-expired-error';
import { Response } from 'express';

@Catch(TokenExpiredError)
export class TokenExpiredFilter<T extends TokenExpiredError>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message;
    const status = 401;

    response.status(status).json({
      message,
      timestamp: new Date().toISOString(),
      code: 'token.expired',
    });
  }
}
