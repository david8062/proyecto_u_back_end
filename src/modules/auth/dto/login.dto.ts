// login.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string | undefined;

  @IsString()
  @IsNotEmpty()
  password: string | undefined;
}
