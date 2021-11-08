import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type UserRoleType = 'employee' | 'admin' | 'super';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['employee', 'admin', 'super'],
    default: 'employee',
  })
  role: UserRoleType;

  @Column({ unique: true })
  email: string;

  @Column({ length: 40 })
  password: string;

  @Column({ length: 20 })
  first_name: string;

  @Column({ length: 20 })
  last_name: string;

  @Column()
  is_block: boolean;

  @Column({ default: 14 })
  available_vacation: number;

  @Column({ default: 5 })
  available_sick_days: number;
}
