import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;
    // if (request.originalUrl == HEALTH_PATH) {
    //   return next.handle();
    // }
    const logMessage = `HTTP Request - Method: ${method}, URL: ${url}, Body: ${JSON.stringify(body)}`;

    this.logger.log(logMessage);

    return next.handle().pipe(
      tap((res) => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        const responseBody = res?.data;

        const logResponseMessage = `HTTP Response - Status: ${statusCode}`;
        this.logger.log(logResponseMessage);
      }),
    );
  }
}
