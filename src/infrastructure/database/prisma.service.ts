import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'
import { createPrismaQueryEventHandler } from 'prisma-query-log'

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, 'query'> implements OnModuleInit {
  private readonly logger = new Logger('SQL')

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
      errorFormat: 'minimal',
    })

    this.$on(
      'query',
      createPrismaQueryEventHandler({
        logger: query => {
          this.logger.verbose(query)
        },
        format: false,
        queryDuration: true,
        colorQuery: '\u001B[96m',
        colorParameter: '\u001B[90m',
      }),
    )
  }

  async onModuleInit() {
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close()
    })
  }
}
