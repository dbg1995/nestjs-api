import { ArgumentsHost, Catch, ExceptionFilter, UnauthorizedException } from '@nestjs/common';

import { ErrorService } from '../error.service';
import { LoggerService } from '../../logger/logger.service';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  constructor(private errorService: ErrorService, private loggerService: LoggerService) {}

  async catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const lang = ctx.getRequest().i18nLang;
    const status = exception.getStatus();
    const body = { error: await this.errorService.unauthorized(lang) };

    this.loggerService.logError(host, status, body, exception);

    res.status(status).json(body);
  }
}
