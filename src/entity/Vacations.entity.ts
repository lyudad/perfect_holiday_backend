import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Users } from './Users.entity';

export type VacationType = 'vacation' | 'sick';
export type StatusVacationType = 'approved' | 'pending';

@Entity('vacations')
export class Vacations {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @OneToMany(() => Users, (users) => users.id)
  user_id: Users[];

  @ApiProperty()
  @Column({ type: 'timestamptz' })
  start_date: Date;

  @ApiProperty()
  @Column({ type: 'timestamptz' })
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
    enum: ['approved', 'pending'],
  })
  status: StatusVacationType;
}
