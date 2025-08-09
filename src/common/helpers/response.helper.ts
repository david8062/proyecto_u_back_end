// src/common/helpers/response.helper.ts

export interface SuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  timestamp: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
  data: null | Record<string, unknown>;
  timestamp: string;
}

export class ResponseHelper {
  static success<T>(
    data: T,
    message = 'Operación exitosa',
  ): SuccessResponse<T> {
    return {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  static error(
    message = 'Ocurrió un error',
    data: null | Record<string, unknown> = null,
  ): ErrorResponse {
    return {
      success: false,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }
}
