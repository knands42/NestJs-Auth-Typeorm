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

describe('AppController (e2e)', () => {
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
    DatabaseTestUtils.truncateTable()
  })

  afterAll(async () => {
    DatabaseTestUtils.truncateTable()
    await app.close()
  })

  describe('User Delete', () => {
    it('/users/{:id} (DELETE) - SUCCESS', () => {
      return request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
    })
  })
})
