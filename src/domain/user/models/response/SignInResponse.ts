import { Expose } from 'class-transformer'

export class SignInResponse {
  token: string

  @Expose({ name: 'user_id' })
  userId: string
}
