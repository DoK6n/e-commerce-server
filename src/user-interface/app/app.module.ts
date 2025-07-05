import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from '~/infrastructure/database/prisma.module'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { LoggingInterceptor } from './interceptors/logging.interceptor'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }), PrismaModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
