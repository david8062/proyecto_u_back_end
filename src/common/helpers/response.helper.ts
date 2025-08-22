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
  ): SuccessResponse<T> | T {
    // 🚨 Evita doble envoltura
    if (
      data &&
      typeof data === 'object' &&
      'success' in data &&
      'message' in data &&
      'data' in data &&
      'timestamp' in data
    ) {
      return data as T;
    }

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
