import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/constants/constans';
import { Users } from 'src/entity/Users.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  //  НАХОДИТ ВСЕХ USERS
  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  //  НАХОДИТ ТОЛЬКО ВСЕХ EMPLOYEES
  async findEmployees(): Promise<Users[]> {
    return this.usersRepository.find({ where: { role: Roles.EMPLOYEE } });
  }

  // НАХОДИТ ВСЕХ ADMINS И EMPLOYEES
  async findAdminsAndEmployees(): Promise<Users[]> {
    return this.usersRepository.find({
      where: [{ role: Roles.ADMIN }, { role: Roles.EMPLOYEE }],
    });
  }

  // СОЗДАЕТ НОВОГО USER
  async create(createUserDto: CreateUserDto): Promise<Users> {
    return this.usersRepository.save(createUserDto);
  }
  // async create(data: CreateUserDto) {
  //   const user = this.usersRepository.create(data);
  //   await this.usersRepository.save(data);
  //   return user;
  // }

  // ОБНОВЛЯЕТ email, first_name, last_name у user
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersRepository.update(id, updateUserDto);
  }
}
