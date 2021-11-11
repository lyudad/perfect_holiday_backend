import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Users } from 'src/entity/Users.entity';
import { UpdateResult } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateIsBlockDto } from '../dto/update-isblock.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //   GET /users   получаем всех USERS
  @Get()
  findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  //   GET /users/employee   получаем всех Employees
  @Get('/employee')
  findEmployees(): Promise<Users[]> {
    return this.usersService.findEmployees();
  }

  //   GET /users/admin-employee   получаем всех Admins и Employees
  @Get('/admin-employee')
  findAdminsAndEmployees(): Promise<Users[]> {
    return this.usersService.findAdminsAndEmployees();
  }

  //   POST /users  добавляем нового User
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.usersService.create(createUserDto);
  }

  //   PUT /users   обновляем is_block у user
  @Put(':id')
  updateIsBlock(
    @Param('id') id: string,
    @Body() updateIsBlockDto: UpdateIsBlockDto,
  ): Promise<UpdateResult> {
    return this.usersService.updateIsBlock(id, updateIsBlockDto);
  }
}
