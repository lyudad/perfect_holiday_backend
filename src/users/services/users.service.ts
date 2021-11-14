import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/constants/constans';
import { Users } from 'src/entity/Users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {
  }

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

  // УДАЛЯЕТ НОВОГО USER
  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
