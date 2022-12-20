import * as path from 'path';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { I18nModule, I18nJsonParser, HeaderResolver, QueryResolver } from 'nestjs-i18n';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  DEFAULT_LANG,
  ENV_PRODUCTION,
  JWT_EXPIRES_IN,
  JWT_SECRET,
  LOG_DIR,
  LOG_FILE_MAX,
  LOG_FILE_NAME,
  NODE_ENV,
} from './constant/common.constant';
import { PagyModule } from './shared/module/pagy/pagy.module';
import { ErrorModule } from './shared/module/error/error.module';
import { LoggerModule } from './shared/module/logger/logger.module';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
    TypeOrmModule.forRoot(),
    I18nModule.forRoot({
      fallbackLanguage: DEFAULT_LANG,
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: NODE_ENV !== ENV_PRODUCTION,
      },
      resolvers: [new HeaderResolver(['lang']), new QueryResolver(['lang'])],
    }),
    PagyModule,
    ErrorModule,
    LoggerModule.register({
      dirname: LOG_DIR,
      filename: LOG_FILE_NAME,
      maxFiles: LOG_FILE_MAX,
    }),
  ],
  exports: [JwtModule, PagyModule, ErrorModule, LoggerModule],
})
export class CoreModule {}
