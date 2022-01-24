import { IsEmail, IsOptional, IsString, ValidateIf } from 'class-validator'
import { Match } from 'modules/user/decorators/MatchDecorator'

export class UpdateUserRequest {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  username: string

  @IsOptional()
  @IsString()
  password: string

  @ValidateIf(o => o.password)
  @Match('password')
  @IsString()
  confirmPassword: string
}
