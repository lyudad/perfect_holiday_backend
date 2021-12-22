import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { debug } from 'console';
import { VacationType } from 'src/constants/constans';
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
    let allDates;
    let diffPastDate;
    let diffFutureDate;

    if (createRestday.type === VacationType.SICK) {
      allDates = await this.casualRepository.query(
        `SELECT end_date AS end_date, start_date AS start_date FROM vacations
    WHERE status != 'approved' AND type = '${VacationType.SICK}' AND userId = '${idfrompath}'`,
      );
    } else {
      allDates = await this.casualRepository.query(
        `SELECT end_date AS end_date, start_date AS start_date FROM vacations
    WHERE status != 'approved' AND type = '${VacationType.VACATION}' AND userId = '${idfrompath}'`,
      );
    }

    const minFutureDate = allDates
      .filter(
        (v) =>
          Number(new Date(createRestday.end_date)) <
          Number(new Date(v.start_date)),
      )
      .sort()
      .reverse()
      .find((v) => Math.min(Number(new Date(v.start_date))))?.start_date;

    const maxPastDate = allDates
      .filter(
        (v) =>
          Number(new Date(createRestday.start_date)) >
          Number(new Date(v.end_date)),
      )
      .sort()
      .reverse()
      .find((v) => Math.max(Number(new Date(v.end_date))))?.end_date;

    if (maxPastDate !== undefined) {
      diffPastDate = Math.abs(
        (Number(new Date(createRestday.start_date)) - Number(maxPastDate)) /
          (1000 * 3600 * 24),
      );
    }
    if (minFutureDate !== undefined) {
      diffFutureDate = Math.abs(
        (Number(new Date(createRestday.end_date)) - Number(minFutureDate)) /
          (1000 * 3600 * 24),
      );
    }
    if (
      (diffPastDate > (createRestday.type === VacationType.SICK ? 30 : 60) &&
        diffFutureDate >
          (createRestday.type === VacationType.SICK ? 30 : 60)) ||
      (diffFutureDate > (createRestday.type === VacationType.SICK ? 30 : 60) &&
        !diffPastDate) ||
      (diffPastDate > (createRestday.type === VacationType.SICK ? 30 : 60) &&
        !diffFutureDate)
    ) {
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
    } else {
      return `Bad dates. Try check another dates. Previos vacation was ${Math.ceil(
        diffPastDate,
      )} days ago ${
        !isNaN(diffFutureDate)
          ? 'and you next vacation will be about ' +
            Math.ceil(diffFutureDate) +
            ' days'
          : ''
      } `;
    }
  }

  async updateStatus(changeStatus) {
    const vacation = getConnection()
      .createQueryBuilder()
      .update('vacations')
      .set({ status: changeStatus.status })
      .where('vacations.id = :id', { id: changeStatus.id })
      .andWhere('vacations.userId=:userId', {
        userId: changeStatus.userId,
      })

    if(changeStatus.type==='vacation')
    {
      const days = getConnection()
        .createQueryBuilder()
        .update('users')
        .set({
          available_vacation:()=> `available_vacation-${changeStatus.diffDays}`,
        })
        .where(`users.id =:userId`,{
          userId: changeStatus.userId,
        })
        .andWhere(`users.available_vacation >=:diff`,{diff:changeStatus.diffDays})

      return await Promise.all([vacation.execute(), days.execute()])

    }
    else if(changeStatus.type==='sick')
    {
      const days = getConnection()
        .createQueryBuilder()
        .update('users')
        .set({
          available_sick_days:()=> `available_sick_days-${changeStatus.diffDays}`,
        })
        .where(`users.id =:userId`,{
          userId: changeStatus.userId,
        })
        .andWhere(`users.available_sick_days >=:diff`,{diff:changeStatus.diffDays})
      return await Promise.all([vacation.execute(), days.execute()])
    }
    else
    {
      return vacation.execute()
    }

  }

  async updateRestDays(updateDays) {
    const vacation = getConnection()
      .createQueryBuilder()
      .update('vacations')
      .set({
        status: updateDays.status,
        start_date: updateDays.start_date,
        end_date: updateDays.end_date,
      })
      .where('vacations.id = :id', { id: updateDays.id })
      .andWhere('vacations.userId=:userId', {
        userId: updateDays.userId,
      })

    if(updateDays.type==='vacation') {
      const days = getConnection()
        .createQueryBuilder()
        .update('users')
        .set({
          available_vacation:()=> `available_vacation- ${updateDays.diffDays}`
        })
        .where(`users.id =:userId`,{
          userId: updateDays.userId,
        })
        .andWhere(`users.available_vacation >=:diff`,{diff:updateDays.diffDays})

      return await Promise.all([vacation.execute(), days.execute()])
    }
    else if(updateDays.type==='sick')
    {
      const days = getConnection()
        .createQueryBuilder()
        .update('users')
        .set({
          available_sick_days:()=> `available_sick_days- ${updateDays.diffDays}`
        })
        .where(`users.id =:userId`,{
          userId: updateDays.userId,
        })
        .andWhere(`users.available_sick_days >=:diff`,{diff:updateDays.diffDays})

      return await Promise.all([vacation.execute(), days.execute()])
    }
    else
    {
      return vacation.execute()
    }
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
