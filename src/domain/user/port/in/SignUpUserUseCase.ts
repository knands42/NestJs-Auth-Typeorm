import { User } from 'domain/user'
import { SignInRequest } from 'domain/user/models/request/SignInRequest'
import { SignUpRequest } from 'domain/user/models/request/SignUpRequest'
import { SignInResponse } from 'domain/user/models/response/SignInResponse'

export interface SignUpUserUseCase {
  signUp(payload: SignUpRequest): Promise<User>
  signIn(payload: SignInRequest): Promise<SignInResponse>
}
