import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ResponseHelper } from '../helpers/response.helper';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, unknown> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => ResponseHelper.success(data)),
      catchError((err: unknown) => {
        let errorMessage = 'Unexpected error';
        let errorData: Record<string, unknown> | null = null;

        if (err instanceof Error) {
          errorMessage = err.message;
        }

        if (err && typeof err === 'object' && 'response' in err) {
          const maybeResponse = (err as { response?: unknown }).response;
          if (maybeResponse && typeof maybeResponse === 'object') {
            errorData = maybeResponse as Record<string, unknown>;
          }
        }

        throw new HttpException(
          ResponseHelper.error(errorMessage, errorData),
          400,
        );
      }),
    );
  }
}
