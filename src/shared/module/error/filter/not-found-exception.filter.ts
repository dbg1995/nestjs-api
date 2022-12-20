import { ExceptionFilter, Catch, NotFoundException, ArgumentsHost } from '@nestjs/common';

import { ErrorService } from '../error.service';
import { LoggerService } from '../../logger/logger.service';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  constructor(private errorService: ErrorService, private loggerService: LoggerService) {}

  async catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const lang = ctx.getRequest().i18nLang;
    const status = exception.getStatus();
    const body = { error: await this.errorService.notFoundError(lang) };

    this.loggerService.logError(host, status, body, exception);

    res.status(status).json(body);
  }
}
