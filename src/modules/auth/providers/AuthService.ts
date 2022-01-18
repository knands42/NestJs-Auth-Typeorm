import { Injectable } from '@nestjs/common'
import { AuthUseCase } from 'domain/auth/port/in/AuthUseCase'
import { JwtService } from '@nestjs/jwt'
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'
import { User } from 'domain/user'

@Injectable()
export class AuthService implements AuthUseCase {
  constructor(private readonly jwtService: JwtService) {}

  generateJwt(user: User): string {
    return this.jwtService.sign({ user })
  }

  async comparePassword(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    const [salt, hashedPassword] = hashPassword.split(':')
    const keyBuffer = Buffer.from(hashedPassword, 'hex')

    const hashedBuffer = scryptSync(password, salt, 64)
    return timingSafeEqual(hashedBuffer, keyBuffer)
  }

  async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex')
    const hashedPassword = scryptSync(password, salt, 64).toString('hex')

    return `${salt}:${hashedPassword}`
  }
}
