import { User } from 'domain/user'

export interface AuthUseCase {
  generateJwt(user: User): Promise<string>
  hashPassword(password: string): Promise<string>
  comparePassword(password: string, hashPassword: string): Promise<boolean>
}
