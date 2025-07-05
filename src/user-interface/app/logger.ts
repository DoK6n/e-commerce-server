import { ConsoleLogger } from '@nestjs/common'
import { format } from 'date-fns'

export class CustomLogger extends ConsoleLogger {
  protected getTimestamp(): string {
    return format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')
  }
}
