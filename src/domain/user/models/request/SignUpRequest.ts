import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'
import { Match } from 'modules/user/decorators/MatchDecorator'

export class SignUpRequest {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(25)
  @IsString()
  username: string

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @IsString()
  password: string

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @IsString()
  @Match('password')
  confirmPassword: string
}
