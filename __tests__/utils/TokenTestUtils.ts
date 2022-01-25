import { JwtService } from '@nestjs/jwt'
import { TokenPayload } from '../../src/domain/auth/types'
import { User } from '../../src/domain/user/entities/User'

export class TokenTestUtils {
  static async generateToken(
    jwtService: JwtService,
    user: User
  ): Promise<string> {
    const payload: TokenPayload = {
      id: user.id,
      permissions: user.permissions,
      role: user.role,
      username: user.username
    }
    return jwtService.sign(payload)
  }
}
