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

  describe('User Update', () => {
    it('/users/{:id} (PUT) - SUCCESS update all values', () => {
      return request(app.getHttpServer())
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'John Doe 2',
          username: 'John 2',
          email: 'johndoe2@gmail.com',
          password: '12345678',
          confirmPassword: '12345678'
        })
        .expect(200)
        .expect(res => {
          expect(res.body.data.name).toBe('John Doe 2')
          expect(res.body.data.username).toBe('John 2')
          expect(res.body.data.email).toBe('johndoe2@gmail.com')
        })
    })

    it('/users/{:id} (PUT) - NOT FOUND', () => {
      return request(app.getHttpServer())
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'John Doe 2',
          username: 'John 2',
          email: 'johndoe2@gmail.com',
          password: '12345678',
          confirmPassword: '12345678'
        })
        .expect(200)
        .expect(res => {
          expect(res.body.data.name).toBe('John Doe 2')
          expect(res.body.data.username).toBe('John 2')
          expect(res.body.data.email).toBe('johndoe2@gmail.com')
        })
    })

    it('/users/{:id} (PUT) - VALIDATION ERROR', async () => {
      await DatabaseTestUtils.truncateTable()

      return request(app.getHttpServer())
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'John Doe 2',
          username: 'John 2',
          email: 'johndoe2@gmail.com',
          password: '12345678'
        })
        .expect(404)
        .expect(res => {
          expect(res.body.error.message).toBe('User could not be found!')
          expect(res.body.error.status).toBe(404)
          expect(res.body.error.type).toBe('Not Found')
        })
    })

    it('/users/{:id} (PUT) - FORBIDDEN', () => {
      return request(app.getHttpServer())
        .put(`/users/another-id`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'John Doe 2',
          username: 'John 2',
          email: 'johndoe2@gmail.com',
          password: '12345678'
        })
        .expect(403)
        .expect(res => {
          expect(res.body.error.type).toBe('Forbidden')
          expect(res.body.error.message).toBe('Forbidden resource')
          expect(res.body.error.status).toBe(403)
        })
    })

    it('/users/{:id} (PUT) - UNAUTHORIZED', () => {
      return request(app.getHttpServer())
        .put(`/users/${userId}`)
        .send({
          name: 'John Doe 2',
          username: 'John 2',
          email: 'johndoe2@gmail.com',
          password: '12345678'
        })
        .expect(401)
        .expect(res => {
          expect(res.body.error.message).toBe('Unauthorized')
          expect(res.body.error.status).toBe(401)
        })
    })

    it('/users/{:id} (PUT) - CONFLICT EXCEPTION same username', async () => {
      await DatabaseTestUtils.populateDatabase('John 2', 'johndoe20@gmail.com')

      return request(app.getHttpServer())
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'John Doe 2',
          username: 'John 2',
          email: 'johndoe2@gmail.com',
          password: '12345678',
          confirmPassword: '12345678'
        })
        .expect(409)
        .expect(res => {
          expect(res.body.error.type).toBe('Conflict')
          expect(res.body.error.status).toBe(409)
          expect(res.body.error.message).toBe('Username already taken!')
        })
    })

    it('/users/{:id} (PUT) - CONFLICT EXCEPTION same email', async () => {
      await DatabaseTestUtils.populateDatabase('John 12', 'johndoe2@gmail.com')

      return request(app.getHttpServer())
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'John Doe 2',
          username: 'John 2',
          email: 'johndoe2@gmail.com',
          password: '12345678',
          confirmPassword: '12345678'
        })
        .expect(409)
        .expect(res => {
          expect(res.body.error.type).toBe('Conflict')
          expect(res.body.error.status).toBe(409)
          expect(res.body.error.message).toBe('Email already taken!')
        })
    })
  })
})
