import { DynamicModule, Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

import { LoggerFormat } from './logger.format';
import { LoggerService } from './logger.service';
import { LoggerOption } from './logger.type';
import { RequestLoggerGuard } from './guard/request-logger.guard';
import { ResponseLoggerInterceptor } from './interceptor/response-logger.interceptor';

@Module({})
export class LoggerModule {
  static register(options: LoggerOption): DynamicModule {
    return {
      module: LoggerModule,
      imports: [
        WinstonModule.forRoot({
          transports: [
            new DailyRotateFile({
              ...options,
              format: LoggerFormat.getRotateFileFormat(),
            }),
          ],
        }),
      ],
      providers: [
        {
          provide: APP_GUARD,
          useClass: RequestLoggerGuard,
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: ResponseLoggerInterceptor,
        },
        LoggerService,
      ],
      exports: [LoggerService],
    };
  }
}
