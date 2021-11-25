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

  async findAll() {
    return getRepository(Users)
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.vacations', 'vacations')
      .getMany();
  }

  async findAllNotApprovedRestDays() {
    return getRepository(Vacations)
      .createQueryBuilder('vacation')
      .innerJoinAndSelect('vacation.user', 'user')
      .where('vacation.status = :status', { status: 'pending' })
      .getMany();
  }

  async findAllRestDays(id) {
    return getRepository(Users)
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.vacations', 'vacations')
      .where('vacations.userId = :userId', { userId: `${id}` })
      .getMany();
  }

  async createStartAndLastRestDay(createRestday, idfrompath) {
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

  async updateStatus(changeStatus) {
    return getConnection()
      .createQueryBuilder()
      .update('vacations')
      .set({ status: changeStatus.status })
      .where('vacations.id = :id', { id: changeStatus.id })
      .andWhere('vacations.userId=:userId', {
        userId: changeStatus.userId,
      })
      .execute();
  }

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
