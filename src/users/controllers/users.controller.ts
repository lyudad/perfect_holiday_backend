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
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/push-password/:id')
  getPassword(@Param('id') id: string) {
    return this.usersService.getPassword(id);
  }

  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @Roles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<UpdateResult> {
    return this.usersService.updateStatus(id, updateStatusDto);
  }

  @Roles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  roles: Role[];
}
