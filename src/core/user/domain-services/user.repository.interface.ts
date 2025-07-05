import { User } from '~/core/user/domain-model/user'

export interface IUserRepository {
  insert(user: Pick<User, 'name' | 'email' | 'password'>): Promise<User>
}
