import { User } from '../../entities/User'

export interface QueryUserUserCase {
  findAll(): Promise<User[]>
  findById(id: string): Promise<User>
}
