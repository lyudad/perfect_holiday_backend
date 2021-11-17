import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
  Post,
  UseGuards,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/guards/jwt-auth.guard';
import { Users } from 'src/entity/Users.entity';
import { UpdateResult } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateIsBlockDto } from '../dto/update-isblock.dto';
import { UsersService } from '../services/users.service';
import { UpdateStatusDto } from '../dto/update-status.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //   GET /users   получаем всех USERS
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  //   GET /users/employee   получаем всех Employees
  @UseGuards(JwtAuthGuard)
  @Get('/employee')
  findEmployees(): Promise<Users[]> {
    return this.usersService.findEmployees();
  }

  //   GET /users/admin-employee   получаем всех Admins и Employees
  @UseGuards(JwtAuthGuard)
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

  //   PUT /users   обновляем email, first_name, last_name у user
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersService.update(id, updateUserDto);
  }

  //   PUT /users/id   обновляем is_block у user
  @Put(':id')
  updateIsBlock(
    @Param('id') id: string,
    @Body() updateIsBlockDto: UpdateIsBlockDto,
  ): Promise<UpdateResult> {
    return this.usersService.updateIsBlock(id, updateIsBlockDto);
  }

  // PUT /users Подтверждает или отклоняет отпуск (Обновляет поле status approve | pending)
  @Put(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<UpdateResult> {
    return this.usersService.updateStatus(id, updateStatusDto);
  }

  @Delete(':id')
  deleteAction(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
