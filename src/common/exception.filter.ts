import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

interface IErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus: number;
    let errorMessage: string | string[];

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      errorMessage = (exception.getResponse() as IErrorResponse).message;
    } else if (exception instanceof Error) {
      httpStatus = HttpStatus.BAD_REQUEST;
      errorMessage = exception.message;
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Internal server error';
    }

    const responseBody = {
      success: false,
      statusCode: httpStatus,
      message: errorMessage,
      data: null,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
