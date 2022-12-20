import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { LoggerService } from '../logger.service';

@Injectable()
export class RequestLoggerGuard implements CanActivate {
  constructor(private loggerService: LoggerService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.loggerService.logRequest(context);

    return true;
  }
}
