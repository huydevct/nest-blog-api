import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO, LoginDTO } from '../models/user.model';
import { ValidationPipe } from 'src/shared/validation.pipe';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  register(@Body() credentials: RegisterDTO) {
    return this.authService.register(credentials);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  login(@Body() credentials: LoginDTO) {
    return this.authService.login(credentials);
  }
}
