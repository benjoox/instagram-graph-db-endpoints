import { ExceptionFilter, Catch, NotFoundException, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        response.status(status).json({
            statusCode: status,
            message: 'Resource not found',
            timestamp: new Date().toISOString(),
            path: request.url
        });
    }
}
