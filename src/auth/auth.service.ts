import { LoginDTO, RegisterDTO } from './../models/user.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AuthService {
  private mockUser = {
    email: 'jake@jake.com',
    token: 'jwt.token.here',
    username: 'jake',
    bio: 'I work at statefarm',
    image: null,
  };

  register(credentials: RegisterDTO) {
    return this.mockUser;
  }

  login(credentials: LoginDTO) {
    if (credentials.email === this.mockUser.email) {
      return this.mockUser;
    }
    throw new InternalServerErrorException();
  }
}
