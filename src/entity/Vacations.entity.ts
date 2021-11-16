import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Users } from './Users.entity';

export type VacationType = 'vacation' | 'sick';
export type StatusVacationType = 'approved' | 'pending';

@Entity('vacations')
export class Vacations {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user: Users) => user.id)
  public user: Users;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @Column({
    type: 'enum',
    enum: ['vacation', 'sick'],
  })
  type: VacationType;

  @Column({
    type: 'enum',
    enum: ['approved', 'pending'],
    default: 'pending',
  })
  status: StatusVacationType;
}
