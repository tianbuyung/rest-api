import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { AppLoggerService } from './app-logger/app-logger.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

type ErrorResponseObj = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new AppLoggerService(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponseObj: ErrorResponseObj = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    // Add more Prisma Error Types if you want
    if (exception instanceof HttpException) {
      errorResponseObj.statusCode = exception.getStatus();
      errorResponseObj.response = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      errorResponseObj.statusCode = 422;
      errorResponseObj.response = exception.message.replaceAll(/\n/g, ' ');
    } else {
      errorResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      errorResponseObj.response = 'Internal Server Error';
    }

    response.status(errorResponseObj.statusCode).json(errorResponseObj);

    this.logger.error(errorResponseObj.response, AllExceptionsFilter.name);

    super.catch(exception, host);
  }
}
