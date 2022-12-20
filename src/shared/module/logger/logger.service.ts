import { ArgumentsHost, ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { v4 } from 'uuid';

import { LoggerFormat } from './logger.format';

@Injectable()
export class LoggerService {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {}

  logRequest(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      request.id = v4();

      this.logger.log(LoggerFormat.REQUEST, {
        id: request.id,
        method: request.method,
        url: request.originalUrl,
        headers: request.headers,
        body: request.body,
      });
    } catch (error) {}
  }

  logResponse(context: ExecutionContext, status: number, body: object) {
    try {
      const request = context.switchToHttp().getRequest();

      this.logger.log(LoggerFormat.RESPONSE, {
        id: request.id,
        method: request.method,
        url: request.originalUrl,
        userId: request?.currentUser?.id?.toString(),
        status,
        headers: request.headers,
        body: request.method == 'GET' ? null : body,
      });
    } catch (error) {}
  }

  logError(context: ArgumentsHost, status: number, body: object, exception: Error) {
    try {
      const request = context.switchToHttp().getRequest();

      this.logger.error(LoggerFormat.ERROR, {
        id: request.id,
        method: request.method,
        url: request.originalUrl,
        userId: request?.currentUser?.id?.toString(),
        status,
        headers: request.headers,
        body,
        exception,
      });
    } catch (error) {}
  }
}
