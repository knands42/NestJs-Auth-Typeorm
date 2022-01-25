import { NestFactory } from '@nestjs/core'
import { SeederModule } from './SeederModule'
import { SeederProvider } from './SeederProvider'

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then(appContext => {
      const seeder = appContext.get(SeederProvider)
      seeder
        .seed()
        .then(() => {
          console.log('Seeding complete!')
        })
        .catch(error => {
          console.log('Seeding failed!')
          throw error
        })
        .finally(() => appContext.close())
    })
    .catch(error => {
      console.log('Seeder failed!', error)
      throw error
    })
}
bootstrap()
