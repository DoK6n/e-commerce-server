import { type User } from '~/core/user/domain-model/user'

export interface IUserService {
  createUser(): Promise<User>
}
