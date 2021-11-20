import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO, LoginDTO } from '../models/user.dto';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  register(
    @Body(new ValidationPipe({ transform: true })) credentials: RegisterDTO,
  ) {
    return this.authService.register(credentials);
  }

  @Post('/login')
  login(@Body(new ValidationPipe({ transform: true })) credentials: LoginDTO) {
    return this.authService.login(credentials);
  }
}
