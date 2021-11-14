import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Request, Response } from 'express';

import { Users } from 'src/entity/Users.entity';
import { LocalAuthGuard } from '../strategies/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: Request): Promise<{ access_token: string }> {
    return this.authService.login(req.user as Users);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      code: 200,
      status: 'success',
      message: 'User was logout',
    };
  }
}
