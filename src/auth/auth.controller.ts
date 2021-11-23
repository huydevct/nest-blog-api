import { AuthResponse } from './../models/user.model';
import { ResponseObject } from './../models/response.model';
import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO, LoginDTO } from '../models/user.model';
import { ValidationPipe } from 'src/shared/validation.pipe';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async register(@Body() credentials: RegisterDTO) {
    const user = await this.authService.register(credentials);
    return { user };
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() credentials: { user: LoginDTO },
  ): Promise<ResponseObject<'user', AuthResponse>> {
    const user = await this.authService.login(credentials.user);
    return { user };
  }
}
