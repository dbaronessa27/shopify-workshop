import { Logger } from '../utils/logger';

export const logDecoratorError = (context: any, ...args: unknown[]): void => {
  if (context.logger instanceof Logger) {
    context.logger.warn(...args);
  }
};
