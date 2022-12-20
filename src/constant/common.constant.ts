import 'dotenv/config';

export const SHORT_LENGTH = 255;
export const LONG_LENGTH = 1000;
export const DEFAULT_PAGY_PAGE = 1;
export const DEFAULT_PAGY_COUNT = 15;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const RESPONSE_META_OK = 'ok';
export const RESPONSE_META_FAILED = 'failed';
export const SERVER_HOST = process.env.SERVER_HOST;
export const SERVER_PORT = process.env.SERVER_PORT;
export const NODE_ENV = process.env.NEST_ENV;
export const ENV_DEVELOPMENT = 'development';
export const ENV_TESTING = 'testing';
export const ENV_STAGING = 'staging';
export const ENV_PRODUCTION = 'production';
export const DEFAULT_LANG = 'ja';
export const CLIENT_DOMAIN =
  process.env.CLIENT_DOMAIN.indexOf(',') < 0 ? process.env.CLIENT_DOMAIN : process.env.CLIENT_DOMAIN.split(',');
export const LOG_FILE_MAX = parseInt(process.env.LOG_FILE_MAX);
export const LOG_DIR = process.env.LOG_DIR;
export const LOG_FILE_NAME = `${process.env.NODE_ENV}-%DATE%.log`;
