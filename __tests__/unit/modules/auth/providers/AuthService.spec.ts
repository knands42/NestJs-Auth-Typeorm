import { JwtModule, JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AuthUseCase } from '../../../../../src/domain/auth/port/in/AuthUseCase'
import {
  UserPermissions,
  UserRoles
} from '../../../../../src/domain/user/entities/User'
import { AuthProvider } from '../../../../../src/modules/auth/providers/AuthProvider'
import { TokenPayload } from '../../../../../src/domain/auth/types'

describe('Auth Service Spec', () => {
  let sut: AuthUseCase
  let jwtService: JwtService

  beforeEach(async () => {
    let moduleRef = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          privateKey: 'secret',
          signOptions: {
            expiresIn: '1h'
          }
        })
      ],
      providers: [
        {
          provide: 'AuthUseCase',
          useClass: AuthProvider
        }
      ]
    }).compile()

    sut = await moduleRef.get<AuthUseCase>('AuthUseCase')
    jwtService = await moduleRef.get<JwtService>(JwtService)
  })

  describe('generateJwt', () => {
    it('should return a valid jwt', async () => {
      const result = sut.generateJwt({
        id: '1',
        username: 'fake-username',
        permissions: [UserPermissions.READ],
        role: UserRoles.USER
      })

      const token: TokenPayload = await jwtService.verify(result, {
        secret: 'secret'
      })

      expect(result).not.toBeNull()
      expect(token.id).toBe('1')
      expect(token.username).toBe('fake-username')
      expect(token.permissions).toEqual([UserPermissions.READ])
      expect(token.role).toBe(UserRoles.USER)
    })

    it('should validate as true if a hashed password is the same as the plain password', async () => {
      const hashedPassword = await sut.hashPassword('fake-password')
      const isValid = await sut.comparePassword('fake-password', hashedPassword)

      expect(isValid).toBe(true)
    })

    it('should validate as false if a hashed password is not the same as the plain password', async () => {
      const hashedPassword = await sut.hashPassword('fake-password')
      const isValid = await sut.comparePassword(
        'wrong-password',
        hashedPassword
      )

      expect(isValid).toBe(false)
    })
  })
})
