import cds from '@sap/cds';

type LoggerInstance = ReturnType<typeof cds.log>;

export class Logger {
  private readonly instance: LoggerInstance;
  constructor(name: string) {
    this.instance = cds.log(name);
  }

  private sanitizeArgs(args: unknown[]) {
    return args.map((arg) => {
      if (typeof arg === 'object' && arg !== null && !(arg instanceof Error)) {
        return JSON.stringify(arg);
      }

      return arg;
    });
  }

  info(...args: unknown[]) {
    this.instance.info(...this.sanitizeArgs(args));
  }

  warn(...args: unknown[]) {
    this.instance.warn(...this.sanitizeArgs(args));
  }

  error(...args: unknown[]) {
    this.instance.error(...this.sanitizeArgs(args));
  }

  debug(...args: unknown[]) {
    this.instance.debug(...this.sanitizeArgs(args));
  }
}
