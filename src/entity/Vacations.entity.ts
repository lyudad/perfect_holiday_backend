import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';

export type VacationType = 'vacation' | 'sick';
export type StatusVacationType = 'approved' | 'pending';

@Entity('vacations')
export class Vacations {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Users, (users) => users.id)
  user_id: Users[];

  @Column({ type: 'timestamptz' })
  start_date: Date;

  @Column({ type: 'timestamptz' })
  end_date: Date;

  @Column({
    type: 'enum',
    enum: ['vacation', 'sick'],
  })
  type: VacationType;

  @Column({
    type: 'enum',
    enum: ['approved', 'pending'],
  })
  status: StatusVacationType;
}
