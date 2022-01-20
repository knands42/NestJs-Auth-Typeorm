import { User } from 'domain/user'
import { UpdateUserRequest } from 'domain/user/models/request/UpdateUserRequest'

export interface UpdateUserUseCase {
  updateOne(id: string, payload: UpdateUserRequest): Promise<User>
}
