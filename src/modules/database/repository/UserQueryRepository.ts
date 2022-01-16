import { User } from 'domain/user/entities/User'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(User)
export class UserQueryRepository extends Repository<User> {}
