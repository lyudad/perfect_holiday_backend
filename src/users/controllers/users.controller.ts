import { Controller, Delete, Param } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }
  @Delete(':id')
  deleteAction(@Param('id') id: string) : Promise<void>{
    return this.usersService.remove(id);
  }
}
