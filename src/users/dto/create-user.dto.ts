import { UserRoleType } from 'src/entity/Users.entity';

export class CreateUserDto {
  role: UserRoleType;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  is_block: boolean;
  available_vacation: number;
  available_sick_days: number;
}
