import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entity/Users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

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
    return this.usersRepository.find({ where: { role: 'employee' } });
  }

  // НАХОДИТ ВСЕХ ADMINS И EMPLOYEES
  async findAdminsAndEmployees(): Promise<Users[]> {
    return this.usersRepository.find({
      where: [{ role: 'admin' }, { role: 'employee' }],
    });
  }

  // СОЗДАЕТ НОВОГО USER (У КОГО БУДЕТ ЭТА ТАСКА ДОДЕЛАЕТЕ, АВТОМАТОМ НЕМНОГО ПРИХВАТИЛ ПО НУЖДЕ)
  create(createUserDto: CreateUserDto): Promise<Users> {
    const user = new Users();
    user.role = createUserDto.role;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.is_block = createUserDto.is_block;
    user.available_vacation = createUserDto.available_vacation;
    user.available_sick_days = createUserDto.available_sick_days;
    return this.usersRepository.save(user);
  }
}
