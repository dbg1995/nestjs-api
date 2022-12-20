import { Module, UnprocessableEntityException, ValidationError, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

import { ErrorService } from './error.service';
import { ForbiddenExceptionFilter } from './filter/forbidden-exception.filter';
import { InternalServerExceptionFilter } from './filter/internal-server-exception.filter';
import { NotFoundExceptionFilter } from './filter/not-found-exception.filter';
import { UnauthorizedExceptionFilter } from './filter/unauthorized-exception.filter';
import { UnprocessableEntityExceptionFilter } from './filter/unprocessable-entity-exception.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: InternalServerExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: UnprocessableEntityExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ForbiddenExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: UnauthorizedExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true,
          transform: true,
          exceptionFactory: (errors: ValidationError[]) => new UnprocessableEntityException(errors),
        }),
    },
    ErrorService,
  ],
  exports: [ErrorService],
})
export class ErrorModule {}
