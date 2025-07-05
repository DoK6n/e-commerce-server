import { Controller, Get, NotFoundException } from '@nestjs/common'
import { AppService } from './app.service'
import { TypedRoute } from '@nestia/core'
import t from 'typia'

interface Article {
  id: string & t.tags.Format<'uuid'>
  title: string
  body: string
  created_at: string & t.tags.Format<'date-time'>
  files: string[]
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('not-found')
  notFound(): string {
    throw new NotFoundException('Not Found')
  }

  @TypedRoute.Get('random')
  random(): { message: string; data: Article } | { message: string; errors: t.IValidation.IError[] } {
    const data: Article = {
      id: crypto.randomUUID(),
      // id: '123',
      title: 'Hello nestia users',
      body: 'Just use `TypedRoute.Get()` function like this',
      created_at: '2023-04-23T12:04:54.168Z',
      files: [],
    }

    const result = t.validate(data)
    if (!result.success) {
      return {
        message: 'Invalid data',
        errors: result.errors,
      }
    }

    return {
      message: 'ok',
      data: result.data,
    }
  }
}
