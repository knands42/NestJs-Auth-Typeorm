import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { AppModule } from '../../src/AppModule'
import { getConnection } from 'typeorm'
import { UserRoles, UserPermissions } from '../../src/domain/user/entities/User'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    )

    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  afterAll(async () => {
    const entities = getConnection().entityMetadatas

    for (const entity of entities) {
      const repository = getConnection().getRepository(entity.name)
      await repository.clear()
    }

    await app.close()
  })

  describe('Auth', () => {
    it('/users/signup (POST) - SUCCESS', () => {
      return request(app.getHttpServer())
        .post('/users/signup')
        .send({
          name: 'John Doe',
          email: ' johndoe@gmail.com ', // Email with whitespace
          password: '12345678',
          confirmPassword: '12345678',
          username: 'John'
        })
        .expect(201)
        .expect(res => {
          expect(res.body.role).toBe(UserRoles.USER)
          expect(res.body.username).toBe('John')
          expect(res.body.email).toBe('johndoe@gmail.com')
          expect(res.body.permissions).toEqual([UserPermissions.READ])
          expect(res.body.id).toBeDefined()
          expect(res.body.emailVerified).toBeFalsy()
          expect(res.body.createdAt).toBeDefined()
          expect(res.body.updatedAt).toBeDefined()
        })
    })

    it('/users/signup (POST) - CONFLICT EXCEPTION', () => {
      request(app.getHttpServer())
        .post('/users/signup')
        .send({
          name: 'John Doe',
          email: ' johndoe@gmail.com ', // Email with whitespace
          password: '12345678',
          confirmPassword: '12345678',
          username: 'John'
        })
        .expect(409)
        .expect(res => {
          expect(res.body.message).toBe('User already signed')
          expect(res.body.error).toBe('Conflict')
          expect(res.body.statusCode).toBe(409)
        })
    })

    it('/users/signin (POST) with email', () => {
      return request(app.getHttpServer())
        .post('/users/signin')
        .send({
          credential: 'johndoe@gmail.com',
          password: '12345678'
        })
        .expect(200)
        .expect(res => {
          expect(res.body.token).toBeDefined()
        })
    })

    it('/users/signin (POST) with username', () => {
      return request(app.getHttpServer())
        .post('/users/signin')
        .send({
          credential: 'John',
          password: '12345678'
        })
        .expect(200)
        .expect(res => {
          expect(res.body.token).toBeDefined()
        })
    })
  })
})
