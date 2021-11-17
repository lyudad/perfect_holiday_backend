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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //   GET /users   получаем всех USERS
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all users',
    type: [Users],
  })
  @ApiResponse({
    status: 404,
    description: 'No Found',
  })
  @ApiTags('users')
  @ApiBody({ type: Users })
  findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  //   GET /users/employee   получаем всех Employees
  @UseGuards(JwtAuthGuard)
  @Get('/employee')
  @ApiResponse({
    status: 200,
    description: 'Get all employees',
    type: [Users],
  })
  @ApiResponse({
    status: 404,
    description: 'No Found',
  })
  @ApiTags('users')
  @ApiBody({ type: Users })
  findEmployees(): Promise<Users[]> {
    return this.usersService.findEmployees();
  }

  //   GET /users/admin-employee   получаем всех Admins и Employees
  @UseGuards(JwtAuthGuard)
  @Get('/admin-employee')
  @ApiResponse({
    status: 200,
    description: 'Get all admins and employees',
    type: [Users],
  })
  @ApiResponse({
    status: 404,
    description: 'No Found',
  })
  @ApiTags('users')
  @ApiBody({ type: Users })
  findAdminsAndEmployees(): Promise<Users[]> {
    return this.usersService.findAdminsAndEmployees();
  }

  //   POST /users  добавляем нового User
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Add new User',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiTags('users')
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.usersService.create(createUserDto);
  }

  //   PUT /users   обновляем email, first_name, last_name у user
  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Update user email, first name, last name',
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiTags('users')
  @ApiBody({ type: UpdateUserDto })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersService.update(id, updateUserDto);
  }

  //   PUT /users/id   обновляем is_block у user
  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Update user status',
    type: UpdateIsBlockDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiTags('users')
  @ApiBody({ type: UpdateIsBlockDto })
  updateIsBlock(
    @Param('id') id: string,
    @Body() updateIsBlockDto: UpdateIsBlockDto,
  ): Promise<UpdateResult> {
    return this.usersService.updateIsBlock(id, updateIsBlockDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete user',
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiTags('users')
  deleteAction(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
