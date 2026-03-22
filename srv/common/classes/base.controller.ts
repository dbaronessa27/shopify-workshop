import cds from '@sap/cds';
import { HttpException } from '../exceptions/http.exception';
import { Logger } from '../utils/logger';

export abstract class BaseController extends cds.ApplicationService {
  protected readonly logger = new Logger(this.constructor.name);

  async init() {
    await super.init();
    this.logger.info('Initialized');
  }

  executeInBackground(fn: () => Promise<void>) {
    const backgroundEvents = cds.spawn({}, async () => await fn());

    backgroundEvents.on('succeeded', () => {
      this.logger.info('Background job finished successfully');
    });
    backgroundEvents.on('failed', (error: unknown) => {
      this.logger.warn('Background job finished with error', error);
    });
  }

  handleError(req: cds.Request, error: unknown): Error {
    if (error instanceof HttpException) {
      return req.reject(error);
    }

    const message = error instanceof Error ? error.message : 'Unknown error';
    const stack = error instanceof Error ? error.stack : undefined;

    const errorMessage = `Operation failed: ${message}`;
    this.logger.warn(errorMessage, { stack });
    return req.reject(500, errorMessage);
  }
}
