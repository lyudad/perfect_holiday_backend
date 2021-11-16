import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Request, Response } from 'express';

import { Users } from 'src/entity/Users.entity';
import { LocalAuthGuard } from '../strategies/guards/local-auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from '../auth.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiTags('auth')
  @ApiResponse({
    status: 200,
    description: 'User was Login',
    type: 'Token',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBody({ type: AuthDto })
  async login(@Req() req: Request): Promise<{ access_token: string }> {
    return this.authService.login(req.user as Users);
  }

  @Post('logout')
  @ApiTags('auth')
  @ApiResponse({
    status: 200,
    description: 'User was Logout',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      code: 200,
      status: 'success',
      message: 'User was logout',
    };
  }
}
