import { User } from 'domain/user/entities/User'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(User)
export class UserPersistenceRepository extends Repository<User> {}
