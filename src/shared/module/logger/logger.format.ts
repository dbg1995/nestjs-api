import { format } from 'winston';
import { Format } from 'logform';

import { LogContent } from './logger.type';

export class LoggerFormat {
  static REQUEST = 'REQUEST';
  static RESPONSE = 'RESPONSE';
  static ERROR = 'ERROR';
  static TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss Z';

  static getRotateFileFormat(): Format {
    return format.combine(format.timestamp({ format: this.TIMESTAMP_FORMAT }), this.writeToFile());
  }

  private static writeToFile(): Format {
    return format.printf((logContent: LogContent) => {
      switch (logContent.message) {
        case this.REQUEST:
          return this.formatRequest(logContent);
        case this.RESPONSE:
          return this.formatResponse(logContent);
        case this.ERROR:
          return this.formatError(logContent);
      }
    });
  }

  private static formatRequest(logContent: LogContent): string {
    const level = logContent.level.toUpperCase();
    const { timestamp, message, context } = logContent;
    const { id, method, url } = context;
    const headers = JSON.stringify(context.headers);
    const body = JSON.stringify(context.body);

    return `${level}\t ${timestamp}\t ${message}\t ${id}\t ${method}\t ${url}\t headers=${headers}\t body=${body}`;
  }

  private static formatResponse(logContent: LogContent) {
    const level = logContent.level.toUpperCase();
    const { timestamp, message, context } = logContent;
    const { id, method, url, userId, status } = context;
    const headers = JSON.stringify(context.headers);
    const body = JSON.stringify(context.body);

    return `${level}\t ${timestamp}\t ${message}\t ${id}\t ${method}\t ${url}\t ${userId}\t ${status}\t headers=${headers}\t body=${body}`;
  }

  private static formatError(logContent: LogContent) {
    const level = logContent.level.toUpperCase();
    const {
      timestamp,
      message,
      stack: [context],
    } = logContent;
    const { id, method, url, userId, status } = context;
    const headers = JSON.stringify(context.headers);
    const body = JSON.stringify(context.body);
    const exception = JSON.stringify(context.exception, Object.getOwnPropertyNames(context.exception));

    return `${level}\t ${timestamp}\t ${message}\t ${id}\t ${method}\t ${url}\t ${userId}\t ${status}\t headers=${headers}\t body=${body}\t exception=${exception}`;
  }
}
