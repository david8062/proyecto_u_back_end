import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ResponseHelper } from '../helpers/response.helper';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, unknown> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => ResponseHelper.success(data)),
      catchError((err: unknown) => {
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Unexpected error';
        let errorData: Record<string, unknown> | null = null;

        if (err instanceof HttpException) {
          status = err.getStatus();
          const response = err.getResponse();
          message =
            typeof response === 'string'
              ? response
              : ((response as any)?.message ?? message);
          errorData =
            typeof response === 'object'
              ? (response as Record<string, unknown>)
              : null;
        } else if (err instanceof Error) {
          message = err.message;
        }

        return throwError(
          () =>
            new HttpException(ResponseHelper.error(message, errorData), status),
        );
      }),
    );
  }
}
