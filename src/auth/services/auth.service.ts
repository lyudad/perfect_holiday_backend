import { Injectable } from '@nestjs/common';
import { Users } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<Users> | null {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return null;
    }
    const passwordIsValid = password === user.password;
    return passwordIsValid ? user : null;
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
