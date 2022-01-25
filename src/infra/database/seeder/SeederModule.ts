import { Module } from '@nestjs/common'
import { AppModule } from 'AppModule'
import { AuthModule } from 'modules/auth'
import { SeederProvider } from './SeederProvider'

@Module({
  imports: [AppModule, AuthModule],
  providers: [SeederProvider]
})
export class SeederModule {}
