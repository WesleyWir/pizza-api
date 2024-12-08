import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class ResponseFormat<T> {
  @ApiProperty({
    description: 'Indicates whether the response data is an array.',
    example: true,
  })
  isArray: boolean;

  @ApiProperty({
    description: 'The requested API path.',
    example: '/api/orders',
  })
  path: string;

  @ApiProperty({
    description: 'The duration of the request in milliseconds.',
    example: '120ms',
  })
  duration: string;

  @ApiProperty({
    description: 'The HTTP method used for the request (GET, POST, etc.).',
    example: 'GET',
  })
  method: string;

  @ApiProperty({
    description: 'The actual response data.',
    example: { id: 1, name: 'Margherita', price: 12.5 },
  })
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseFormat<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormat<T>> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    return next.handle().pipe(
      map((data) => ({
        data,
        isArray: Array.isArray(data),
        path: request.path,
        duration: `${Date.now() - now}ms`,
        method: request.method,
      })),
    );
  }
}
