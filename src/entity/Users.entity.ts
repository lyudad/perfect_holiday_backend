import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as crypto from 'crypto';
import { ApiProperty } from '@nestjs/swagger';

export type UserRoleType = 'employee' | 'admin' | 'super';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['employee', 'admin', 'super'],
    default: 'employee',
  })
  public role: UserRoleType;

  @ApiProperty()
  @Column({ unique: true })
  public email: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @ApiProperty()
  @Column({ length: 40 })
  public password: string;

  @ApiProperty()
  @Column({ length: 20 })
  public first_name: string;

  @ApiProperty()
  @Column({ length: 20 })
  public last_name: string;

  @ApiProperty()
  @Column({ default: false })
  is_block: boolean;

  @ApiProperty()
  @Column({ default: 14 })
  public available_vacation: number;

  @ApiProperty()
  @Column({ default: 5 })
  public available_sick_days: number;
}
