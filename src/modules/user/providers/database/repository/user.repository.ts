import { User } from 'modules/user/domain/entities/User'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
