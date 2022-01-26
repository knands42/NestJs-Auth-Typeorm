import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { AppModule } from '../../src/AppModule'
import { UserRoles, UserPermissions } from '../../src/domain/user/entities/User'
import { DatabaseTestUtils } from '../utils/DatabaseTestUtils'
import {
  AllExceptionFilter,
  ResultInterceptor,
  validationErrorFactory
} from '../../src/infra'

describe('UsersController (e2e)', () => {
  let app: INestApplication

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
  })

  afterAll(async () => {
    await DatabaseTestUtils.truncateTable()

    await app.close()
  })

  describe('Auth', () => {
    it('/users/signup (POST) - SUCCESS', () => {
      return request(app.getHttpServer())
        .post('/users/signup')
        .send({
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          password: '12345678',
          confirmPassword: '12345678',
          username: 'John'
        })
        .expect(201)
        .expect(res => {
          expect(res.body.data.role).toBe(UserRoles.USER)
          expect(res.body.data.username).toBe('John')
          expect(res.body.data.name).toBe('John Doe')
          expect(res.body.data.email).toBe('johndoe@gmail.com')
          expect(res.body.data.permissions).toEqual([UserPermissions.READ])
          expect(res.body.data.id).toBeDefined()
          expect(res.body.data.emailVerified).toBeFalsy()
          expect(res.body.data.createdAt).toBeDefined()
          expect(res.body.data.updatedAt).toBeDefined()
        })
    })

    it('/users/signup (POST) - CONFLICT EXCEPTION same email', () => {
      request(app.getHttpServer())
        .post('/users/signup')
        .send({
          name: 'John Doe 2',
          email: 'johndoe@gmail.com',
          password: '12345678',
          confirmPassword: '12345678',
          username: 'John Doe2'
        })
        .expect(409)
        .expect(res => {
          expect(res.body.error.message).toBe('User already signed')
          expect(res.body.error.error).toBe('Conflict')
          expect(res.body.error.statusCode).toBe(409)
        })
    })

    it('/users/signup (POST) - CONFLICT EXCEPTION same username', () => {
      request(app.getHttpServer())
        .post('/users/signup')
        .send({
          name: 'John Doe 2',
          email: 'johndoe2@gmail.com',
          password: '12345678',
          confirmPassword: '12345678',
          username: 'John Doe'
        })
        .expect(409)
        .expect(res => {
          expect(res.body.error.message).toBe('User already signed')
          expect(res.body.error.error).toBe('Conflict')
          expect(res.body.error.statusCode).toBe(409)
        })
    })

    it('/users/signin (POST) - SUCCESS with email', () => {
      return request(app.getHttpServer())
        .post('/users/signin')
        .send({
          credential: 'johndoe@gmail.com',
          password: '12345678'
        })
        .expect(200)
        .expect(res => {
          expect(res.body.data.token).toBeDefined()
        })
    })

    it('/users/signin (POST) - SUCCESS with username', () => {
      return request(app.getHttpServer())
        .post('/users/signin')
        .send({
          credential: 'John',
          password: '12345678'
        })
        .expect(200)
        .expect(res => {
          expect(res.body.data.token).toBeDefined()
        })
    })

    it('/users/signin (POST) - UNAUTHORIZED', () => {
      return request(app.getHttpServer())
        .post('/users/signin')
        .send({
          credential: 'invalid-email@gmail.com',
          password: '12345678'
        })
        .expect(401)
        .expect(res => {
          expect(res.body.error.type).toBe('Unauthorized')
          expect(res.body.error.status).toBe(401)
          expect(res.body.error.message).toBe('Wrong credentials')
        })
    })
  })
})
