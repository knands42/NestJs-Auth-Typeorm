import { User } from 'domain/user'

export type AuthTokenData = Omit<User, 'password'>
