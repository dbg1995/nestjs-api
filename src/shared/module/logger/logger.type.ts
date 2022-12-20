import { LogLevel } from '@nestjs/common';

export type LoggerOption = {
  filename: string;
  dirname: string;
  maxFiles: number;
};

export type LogContent = {
  level: LogLevel;
  timestamp: number;
  message: string;
  context: LogHttpContext;
  stack: [LogHttpContext];
};

export type LogHttpContext = {
  id: string;
  method: string;
  url: string;
  userId?: string;
  status?: number;
  headers: object;
  body: object;
  exception?: object;
};
