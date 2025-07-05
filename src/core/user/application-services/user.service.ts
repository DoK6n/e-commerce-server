import { Inject, Injectable } from '@nestjs/common'
import { User } from '~/core/user/domain-model/user'
import { IUserRepository } from '~/core/user/domain-services/user.repository.interface'
import { USER_REPOSITORY } from '~/core/user/domain-services/user.di-tokens'
import { IUserService } from './user.service.interface'

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(): Promise<User> {
    return await this.userRepository.insert({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
    })
  }
}
