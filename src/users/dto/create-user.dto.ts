import { UserRoleType } from 'src/entity/Users.entity';
import { IsNotEmpty, IsEmail, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  role: UserRoleType;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsBoolean()
  is_block: boolean;

  @IsNotEmpty()
  available_vacation: number;

  @IsNotEmpty()
  available_sick_days: number;
}
