import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const stackErrors = status >= 500 ? exception.stack : '';
        const message = exception.message;
        const description = exception.getResponse();

        res.status(status).json({
            statusCode: status,
            message,
            description,
            timestamp: new Date().toISOString(),
            path: request.url,
            stackErrors
        });
    }
}
