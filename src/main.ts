import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from '~/user-interface/app/app.module'
import { PrismaService } from '~/infrastructure/database/prisma.service'
import { Logger } from '@nestjs/common'
import { CustomLogger } from './user-interface/app/logger'

async function bootstrap() {
  const PORT = process.env.PORT ?? 3000
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: new CustomLogger({
      prefix: 'e-commerce',
      json: process.env.NODE_ENV === 'production',
      timestamp: true,
    }),
  })

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  await app.listen(PORT, () => {
    Logger.log(`

      🚀 Host: http://localhost:${PORT}

`)
  })
}
void bootstrap()
