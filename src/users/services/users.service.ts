import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from 'src/auth/auth.dto';
import { Roles } from 'src/constants/constans';
import { Users } from 'src/entity/Users.entity';
import {
  getConnection,
  getRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateIsBlockDto } from '../dto/update-isblock.dto';
import { Vacations } from 'src/entity/Vacations.entity';
import { MailService } from 'src/mail/mail.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private mailService: MailService,
  ) {}

  async getUserByEmail(email: string): Promise<Users> {
    const user = await this.usersRepository.findOne({
      email,
    });
    return user;
  }

  async findOne(authDto: AuthDto): Promise<Users> {
    return this.usersRepository.findOne(authDto);
  }

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findEmployees(): Promise<Users[]> {
    return this.usersRepository.find({ where: { role: Roles.EMPLOYEE } });
  }

  async findAdminsAndEmployees(): Promise<Users[]> {
    return this.usersRepository.find({
      where: [{ role: Roles.ADMIN }, { role: Roles.EMPLOYEE }],
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const userPassword = uuidv4();
    await this.mailService.sendPassword(userPassword, createUserDto.email);
    return this.usersRepository.save({
      ...createUserDto,
      password: userPassword,
    });
  }

  async getPassword(id: string) {
    const user = getRepository(Users)
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    await this.mailService.sendPassword(
      (
        await user
      ).password,
      (
        await user
      ).email,
    );
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersRepository.update(id, updateUserDto);
  }

  async updateIsBlock(
    id: string,
    updateIsBlockDto: UpdateIsBlockDto,
  ): Promise<UpdateResult> {
    return this.usersRepository.update(id, updateIsBlockDto);
  }

  async updateStatus(updateStatusDto, id) {
    return getConnection()
      .createQueryBuilder()
      .andWhere('vacations.userId=:userId', { userId: id })
      .update('vacations')
      .set({ status: updateStatusDto.status })
      .where('vacations.id = :id', { id: updateStatusDto.id })
      .execute();
  }

  async removeUser(id: string) {
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
  }
}
