import { UserRoleType } from 'src/entity/Users.entity';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  role: UserRoleType;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  first_name: string;

  @IsNotEmpty()
  @ApiProperty()
  last_name: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
