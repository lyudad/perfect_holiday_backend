import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacations } from 'src/entity/Vacations.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CasualService {
  constructor(
    @InjectRepository(Vacations)
    private readonly casualRepository: Repository<Vacations>,
  ) {}

  // Находит все отпуска работкиков
  async findAll(): Promise<Vacations[]> {
    return this.casualRepository.query(`
    SELECT ${process.env.DB}.vacations.*, ${process.env.DB}.users.*
    FROM ${process.env.DB}.vacations 
    INNER JOIN ${process.env.DB}.users 
    ON (${process.env.DB}.vacations.userId=${process.env.DB}.users.id)
    `);
  }

  // Находит все выходные пользователя по его id
  async findAllRestDays(id): Promise<Vacations> {
    return this.casualRepository.query(`
      SELECT ${process.env.DB}.vacations.*, ${process.env.DB}.users.last_name
      FROM ${process.env.DB}.vacations 
      INNER JOIN ${process.env.DB}.users 
      ON (${process.env.DB}.vacations.userId=${process.env.DB}.users.id)
      WHERE ${process.env.DB}.vacations.userId=${id}
    `);
  }

  // Создает начальный день, конечный день и тип отпуска
  async create(createRestday, idfrompath): Promise<Vacations> {
    return this.casualRepository.query(`
    INSERT INTO ${process.env.DB}.vacations (start_date, end_date, type, userId) VALUES ('${createRestday.start_date}', '${createRestday.end_date}', '${createRestday.type}', ${idfrompath}) 
    `);
  }

  // Подтверждает или отклоняет отпуск (Меняет поле STATUS   approve | pending)
  async updateStatus(changeStatus, idfrompath): Promise<Vacations> {
    return this.casualRepository.query(`
      UPDATE ${process.env.DB}.vacations SET status = '${changeStatus.status}' WHERE (id = '${changeStatus.id}' AND userId = '${idfrompath}');
    `);
  }

  // Удаляет забронированый отпуск с таблицы по id vacations
  async deleteRestDay(deleteRest, idfrompath): Promise<Vacations> {
    return this.casualRepository.query(`
      DELETE FROM ${process.env.DB}.vacations WHERE (id = '${deleteRest.id}' AND userId = '${idfrompath}');
    `);
  }
}
