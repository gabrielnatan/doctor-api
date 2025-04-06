import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Erro interno no servidor';

    let message: string;

    if (typeof errorResponse === 'string') {
      message = errorResponse;
    } else if (
      typeof errorResponse === 'object' &&
      errorResponse !== null &&
      'message' in errorResponse
    ) {
      message = (errorResponse as { message: string }).message;
    } else {
      message = 'Erro inesperado';
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      data: null,
      error: exception instanceof Error ? exception.stack : null,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
