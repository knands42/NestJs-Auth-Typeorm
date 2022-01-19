import { TokenPayload } from 'domain/auth/types'
import { User } from 'domain/user'

export interface AuthUseCase {
  generateJwt(payload: TokenPayload): string
  hashPassword(password: string): Promise<string>
  comparePassword(password: string, hashPassword: string): Promise<boolean>
}
