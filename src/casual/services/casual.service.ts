import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entity/Users.entity';
import { Vacations } from 'src/entity/Vacations.entity';
import { getConnection, getRepository, Repository } from 'typeorm';

@Injectable()
export class CasualService {
  constructor(
    @InjectRepository(Vacations)
    private readonly casualRepository: Repository<Vacations>,
  ) {}

  // Находит все отпуска работкиков
  async findAll() {
    return getRepository(Users)
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.vacations', 'vacations')
      .getMany();
  }

  // Находит все выходные пользователя по его id
  async findAllRestDays(id) {
    return getRepository(Users)
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.vacations', 'vacations')
      .where('vacations.userId = :userId', { userId: `${id}` })
      .getMany();
  }

  // Находит все не подтвержденныеч выходные пользователей(со статусом PENDING)
  async findAllNotApprovedRestDays() {
    return getRepository(Users)
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.vacations', 'vacations')
      .where('vacations.status = :status', { status: 'pending' })
      .getMany();
  }

  // Создает начальный день, конечный день и тип отпуска
  async create(createRestday, idfrompath) {
    return getConnection()
      .createQueryBuilder()
      .insert()
      .into(Vacations)
      .values([
        {
          start_date: createRestday.start_date,
          end_date: createRestday.end_date,
          type: createRestday.type,
          user: idfrompath,
        },
      ])
      .execute();
  }

  // Подтверждает или отклоняет отпуск (Меняет поле STATUS   approve | pending)
  async updateStatus(changeStatus, idfrompath) {
    return getConnection()
      .createQueryBuilder()
      .update('vacations')
      .set({ status: changeStatus.status })
      .where('vacations.id = :id', { id: changeStatus.id })
      .andWhere('vacations.userId=:userId', { userId: idfrompath })
      .execute();
  }

  // Удаляет забронированый отпуск с таблицы по id vacations
  async deleteRestDay(deleteRest, idfrompath) {
    return getConnection()
      .createQueryBuilder()
      .delete()
      .from('vacations')
      .where('id = :id', { id: deleteRest.id })
      .andWhere('userId=:userId', { userId: idfrompath })
      .execute();
  }
}
