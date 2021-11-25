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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  createUser(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.usersService.createUser(createUserDto);
  }

  @Get('/push-password/:id')
  getPassword(@Param('id') id: string) {
    return this.usersService.getPassword(id);
  }

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
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersService.updateUser(id, updateUserDto);
  }

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

  @Put(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<UpdateResult> {
    return this.usersService.updateStatus(id, updateStatusDto);
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
  removeUser(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}
