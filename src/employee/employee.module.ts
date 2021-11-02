import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { EmployeeController } from './controllers/employee.controller';

@Module({
  providers: [UsersService],
  controllers: [EmployeeController]
})
export class EmployeeModule {}
