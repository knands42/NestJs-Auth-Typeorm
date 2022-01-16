import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserPersistenceRepository } from './repository/UserPersistenceRepository'
import { UserQueryRepository } from './repository/UserQueryRepository'
import { UserPersistenceRepositoryAdapter } from './providers/UserPersistenceRepositoryAdapter'
import { UserQueryRepositoryAdapter } from './providers/UserQueryRepositoryAdapter'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPersistenceRepository, UserQueryRepository])
  ],
  providers: [
    {
      provide: 'UserPersistenceRepositoryPort',
      useClass: UserPersistenceRepositoryAdapter
    },
    {
      provide: 'UserQueryRepositoryPort',
      useClass: UserQueryRepositoryAdapter
    }
  ],
  exports: [
    {
      provide: 'UserPersistenceRepositoryPort',
      useClass: UserPersistenceRepositoryAdapter
    },
    {
      provide: 'UserQueryRepositoryPort',
      useClass: UserQueryRepositoryAdapter
    }
  ]
})
export class DatabaseModule {}
