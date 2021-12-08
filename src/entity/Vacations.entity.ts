import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from './Users.entity';

export type VacationType = 'vacation' | 'sick';
// eslint-disable-next-line prettier/prettier
export type StatusVacationType = 'approved' | 'pending' | 'declined' | 'changed';

@Entity('vacations')
export class Vacations {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'date' })
  start_date: Date;

  @ApiProperty()
  @Column({ type: 'date' })
  end_date: Date;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['vacation', 'sick'],
  })
  type: VacationType;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['approved', 'pending', 'declined', 'changed'],
    default: 'pending',
  })
  status: StatusVacationType;

  @ManyToOne(() => Users, (user) => user.vacations)
  public user: Users;
}
