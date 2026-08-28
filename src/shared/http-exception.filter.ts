import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";

import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message = "Error interno del servidor";

    if (status === 400) {
      message = "Solicitud incorrecta";
    } else if (status === 401) {
      message = "No autorizado";
    } else if (status === 403) {
      message = "Acceso prohibido";
    } else if (status === 404) {
      message = "Recurso no encontrado";
    } else if (status === 409) {
      message = "Conflicto";
    } else if (status >= 500) {
      message = "Error interno del servidor";
    }

    let details = "Ocurrió un error";

    if (typeof exceptionResponse === "string") {
      details = exceptionResponse;
    } else if (
      typeof exceptionResponse === "object" &&
      exceptionResponse !== null &&
      "message" in exceptionResponse
    ) {
      const exceptionMessage = (exceptionResponse as any).message;

      if (Array.isArray(exceptionMessage)) {
        details = exceptionMessage.join(", ");
      } else {
        details = exceptionMessage;
      }
    }

    response.status(status).json({
      success: false,
      code: status,
      message: message,
      data: null,
      error: {
        details: details,
      },
    });
  }
}