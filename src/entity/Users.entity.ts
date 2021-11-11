import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as crypto from 'crypto';

export type UserRoleType = 'employee' | 'admin' | 'super';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'enum',
    enum: ['employee', 'admin', 'super'],
    default: 'employee',
  })
  public role: UserRoleType;

  @Column({ unique: true })
  public email: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }
  @Column({ length: 40 })
  public password: string;

  @Column({ length: 20 })
  public first_name: string;

  @Column({ length: 20 })
  public last_name: string;

  @Column({ width: 1 })
  is_block: boolean;

  @Column({ default: 14 })
  public available_vacation: number;

  @Column({ default: 5 })
  public available_sick_days: number;
}
