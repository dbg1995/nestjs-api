import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';

import { LoggerService } from '../logger.service';

export type Response<T> = {
  data: T;
};

@Injectable()
export class ResponseLoggerInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        console.log(data);
        this.loggerService.logResponse(context, HttpStatus.OK, data);

        return data;
      }),
    );
  }
}
