export class ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T | null;
  error: any | null;

  constructor(success: boolean, code: number, message: string, data: T | null, error: any | null = null) {
    this.success = success;
    this.code = code;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  static success<T>(data: T, message = "Operacion realizada con exito", code = 200): ApiResponse<T> {
    return new ApiResponse<T>(true, code, message, data, null);
  }
}