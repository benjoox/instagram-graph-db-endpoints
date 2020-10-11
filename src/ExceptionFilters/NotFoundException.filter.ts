import { ExceptionFilter, Catch, NotFoundException, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        response.status(400).json({
            statusCode: 400,
            message: 'Bad Request',
            timestamp: new Date().toISOString(),
            path: request.url
        });
    }
}
