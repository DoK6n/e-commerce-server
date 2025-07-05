import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>()
    const { method, url } = request
    const ctx = `${context.getClass().name} ➜ ${context.getHandler().name}()`
    const now = Date.now()

    return next.handle().pipe(
      tap(response => {
        const ms = `+${Date.now() - now}ms`
        this.logger.log(`${method} ${url} \u001B[33m${ms}\u001B[0m`, ctx)
        this.logger.debug(response, ctx)

        return response
      }),
    )
  }
}
