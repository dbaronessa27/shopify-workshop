export class HttpException extends Error {
  readonly code: number;
  readonly message: string;
  readonly target: string;
  originalError: HttpException | null = null;

  constructor(code: number, message: string, target?: unknown) {
    super(message);
    this.code = code;
    this.message = message;
    this.target = typeof target === 'string' ? target : JSON.stringify(target);
  }

  setOriginalError(error: HttpException): this {
    if (this.originalError) {
      throw new Error('Original error is already set');
    }

    this.originalError = error;
    return this;
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string, target?: unknown) {
    super(400, message, target);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string, target?: unknown) {
    super(401, message, target);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string, target?: unknown) {
    super(403, message, target);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string, target?: unknown) {
    super(404, message, target);
  }
}

export class ConflictException extends HttpException {
  constructor(message: string, target?: unknown) {
    super(409, message, target);
  }
}

export class UnprocessableEntityException extends HttpException {
  constructor(message: string, target?: unknown) {
    super(422, message, target);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string, target?: unknown) {
    super(500, message, target);
  }
}

export class NotImplementedException extends HttpException {
  constructor(message: string, target?: unknown) {
    super(501, message, target);
  }
}

export class ServiceUnavailableException extends HttpException {
  constructor(message: string, target?: unknown) {
    super(503, message, target);
  }
}
