import { Injectable } from '@nestjs/common';
import { Users } from 'src/entity/Users.entity';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<Users> | null {
    try {
      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        return null;
      }
      const passEq = bcrypt.compare(password, user.password);
      if (user && passEq) {
        return user;
      }
    } catch (error) {
      error.message;
    }
  }

  async login(user: Users): Promise<{ access_token: string }> {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
