import { User } from '../../entities/User'

export interface QueryUserUserCase {
  findAll(): Promise<User[]>
}