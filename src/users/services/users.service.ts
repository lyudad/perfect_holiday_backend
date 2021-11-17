import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { findOneDto } from 'src/auth/auth.dto';
import { Roles } from 'src/constants/constans';
import { Users } from 'src/entity/Users.entity';
import { getConnection, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateIsBlockDto } from '../dto/update-isblock.dto';
<<<<<<< HEAD
import { UpdateStatusDto } from '../dto/update-status.dto';
=======
import { Vacations } from 'src/entity/Vacations.entity';
>>>>>>> dev

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getUserByEmail(email: string): Promise<Users> {
    const user = await this.usersRepository.findOne({
      email,
    });
    return user;
  }

  async findOne(authDto: findOneDto): Promise<Users> {
    return this.usersRepository.findOne(authDto);
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

  // ОБНОВЛЯЕТ email, first_name, last_name у user
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersRepository.update(id, updateUserDto);
  }

  // ОБНОВЛЯЕТ is_block у user
  async updateIsBlock(
    id: string,
    updateIsBlockDto: UpdateIsBlockDto,
  ): Promise<UpdateResult> {
    return this.usersRepository.update(id, updateIsBlockDto);
  }

<<<<<<< HEAD
  // Подтверждает или отклоняет отпуск
  async updateStatus(
    id: string,
    updateStatusDto: UpdateStatusDto,
  ): Promise<UpdateResult> {
    return this.usersRepository.update(id, updateStatusDto);
  }

  // УДАЛЯЕТ НОВОГО USER
  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
=======
  // УДАЛЯЕТ  USER
  async remove(id: string) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Vacations)
      .where('userId = :userId', { userId: id })
      .execute();
    return getConnection()
      .createQueryBuilder()
      .delete()
      .from(Users)
      .where('id = :id', { id: id })
      .execute();
>>>>>>> dev
  }
}
