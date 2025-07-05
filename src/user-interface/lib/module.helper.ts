/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { type Provider } from '@nestjs/common'
import { type ClassProvider, type InjectionToken } from '@nestjs/common'

export const useClass = <T>(token: InjectionToken, implementation: ClassProvider<T>['useClass']): Provider => {
  return {
    provide: token,
    useClass: implementation,
  }
}

export const useFactory = (provide: any, Repository: new (...args: any[]) => any, inject: any[]) => ({
  provide,
  useFactory: (...args: any[]) => new Repository(...args),
  inject,
})
