import { ArgumentsHost, Catch, ExceptionFilter, UnprocessableEntityException, ValidationError } from '@nestjs/common';

import { ErrorService } from '../error.service';
import { LoggerService } from '../../logger/logger.service';

@Catch(UnprocessableEntityException)
export class UnprocessableEntityExceptionFilter implements ExceptionFilter {
  constructor(private errorService: ErrorService, private loggerService: LoggerService) {}

  async catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const lang = ctx.getRequest().i18nLang;
    const status = exception.getStatus();
    const validationErrors: ValidationError[] = exception.getResponse()['message'];
    const body = { error: await this.errorService.unprocessableEntity(lang, validationErrors) };

    this.loggerService.logError(host, status, body, exception);

    res.status(status).json(body);
  }
}
