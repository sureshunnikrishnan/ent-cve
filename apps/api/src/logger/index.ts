import pino from 'pino';

/**
 * Log levels
 * - fatal: The service/app is going to stop or become unusable. An operator should definitely look into this.
 * - error: Fatal for a specific operation, but the service/app continues servicing other requests.
 * - warn: A note on something that should probably be looked at by an operator.
 * - info: Detail on regular operation.
 * - debug: Anything else, i.e. too verbose to be included in "info" level.
 * - trace: Very detailed application logging.
 */

export type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

export interface LoggerOptions {
  level?: LogLevel;
  name?: string;
  prettyPrint?: boolean;
}

/**
 * Creates a logger instance.
 */
export function createLogger(options: LoggerOptions = {}) {
  const {
    level = (process.env.LOG_LEVEL as LogLevel) || 'info',
    name = 'app',
    prettyPrint = process.env.NODE_ENV !== 'production',
  } = options;

  const pinoOptions: pino.LoggerOptions = {
    name,
    level,
    transport: prettyPrint
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
  };

  return pino(pinoOptions);
}

/**
 * Default logger instance.
 */
export const logger = createLogger();

export default logger;
