import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class SignInRequest {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  credential: string

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @IsString()
  password: string
}
