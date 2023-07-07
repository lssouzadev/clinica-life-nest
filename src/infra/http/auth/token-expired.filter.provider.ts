import { Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TokenExpiredFilter } from '@common/filters/http-exception/token-expired.filter';

export const tokenExpiredFilterProvider: Provider = {
  provide: APP_FILTER,
  useClass: TokenExpiredFilter,
};
