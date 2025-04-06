import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<{
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
    error: null;
    timestamp: string;
    path: string;
  }> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    return next.handle().pipe(
      map((data: T) => ({
        success: true,
        statusCode: response.statusCode,
        message: 'Operação realizada com sucesso',
        data,
        error: null,
        timestamp: new Date().toISOString(),
        path: request.url,
      })),
    );
  }
}
