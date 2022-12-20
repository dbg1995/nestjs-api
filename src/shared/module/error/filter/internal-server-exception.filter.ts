import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';

import { ErrorService } from '../error.service';
import { LoggerService } from '../../logger/logger.service';

@Catch()
export class InternalServerExceptionFilter implements ExceptionFilter {
  constructor(private errorService: ErrorService, private loggerService: LoggerService) {}

  async catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const lang = ctx.getRequest().i18nLang;
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const body = { error: await this.errorService.internalServerError(lang) };

    this.loggerService.logError(host, status, body, exception);

    res.status(status).json(body);
  }
}
