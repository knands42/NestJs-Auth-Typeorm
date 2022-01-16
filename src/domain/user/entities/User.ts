import { Exclude } from 'class-transformer'
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

enum UserPermissions {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE'
}

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column({ name: 'avatar_url' })
  avatarUrl: string

  @Exclude()
  @Column()
  password: string

  @Exclude()
  @Column({ name: 'email_verified', type: 'boolean', default: false })
  emailVerified: boolean

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  roles: UserRoles

  @Column('text', { array: true })
  permissions: UserPermissions[]

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date

  @BeforeInsert()
  cleanEmail() {
    this.email = this.email.toLowerCase().trim()
  }
}

export { UserRoles, User }
