import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { JwtService } from '@nestjs/jwt'
import { DatabaseTestUtils } from '../utils/DatabaseTestUtils'
import { AppModule } from '../../src/AppModule'
import { TokenTestUtils } from '../utils/TokenTestUtils'
import {
  AllExceptionFilter,
  ResultInterceptor,
  validationErrorFactory
} from '../../src/infra'

describe('UsersController (e2e)', () => {
  let app: INestApplication
  let jwtService: JwtService
  let userId: string
  let token: string

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    )

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        exceptionFactory: validationErrorFactory
      })
    )
    app.useGlobalInterceptors(new ResultInterceptor())
    app.useGlobalFilters(new AllExceptionFilter())

    await app.init()
    await app.getHttpAdapter().getInstance().ready()

    jwtService = app.get(JwtService)
  })

  beforeEach(async () => {
    const user = await DatabaseTestUtils.populateDatabase()
    userId = user.id
    token = await TokenTestUtils.generateToken(jwtService, user)
  })

  afterEach(async () => {
    await DatabaseTestUtils.truncateTable()
  })

  afterAll(async () => {
    await DatabaseTestUtils.truncateTable()
    await app.close()
  })

  describe('User Details about ID', () => {
    it('/users/{:id} (GET) - SUCCESS', () => {
      return request(app.getHttpServer())
        .get(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect(res => {
          expect(res.body.data.name).toBe('John Doe')
          expect(res.body.data.username).toBe('John')
          expect(res.body.data.email).toBe('johndoe@gmail.com')
        })
    })

    it('/users/me (GET) - UNAUTHORIZED', () => {
      return request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(401)
        .expect(res => {
          expect(res.body.error.message).toBe('Unauthorized')
          expect(res.body.error.status).toBe(401)
        })
    })

    it('/users/me (GET) - NOT FOUND', async () => {
      await DatabaseTestUtils.truncateTable()

      return request(app.getHttpServer())
        .get(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        .expect(res => {
          expect(res.body.error.message).toBe('User could not be found!')
          expect(res.body.error.status).toBe(404)
          expect(res.body.error.type).toBe('Not Found')
        })
    })

    it('/users/me (GET) - FORBIDDEN', async () => {
      return request(app.getHttpServer())
        .get(`/users/fake-id`)
        .set('Authorization', `Bearer ${token}`)
        .expect(403)
        .expect(res => {
          expect(res.body.error.type).toBe('Forbidden')
          expect(res.body.error.message).toBe('Forbidden resource')
          expect(res.body.error.status).toBe(403)
        })
    })
  })
})
