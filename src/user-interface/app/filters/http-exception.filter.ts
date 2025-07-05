import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common'
import { FastifyReply } from 'fastify'

@Catch(HttpException)
export class HttpExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name)

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: FastifyReply<any> = ctx.getResponse<FastifyReply>()
    const status = exception.getStatus()

    const exceptionStack =
      exception.cause && typeof exception.cause === 'object' && 'stack' in exception.cause
        ? (exception.cause as Error).stack
        : exception.stack

    this.logger.error(`${status} ➜ ${exception.name}`, exceptionStack)

    response.status(status).send(exception.getResponse())
  }
}
