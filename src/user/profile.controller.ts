import { UserService } from './user.service';
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

@Controller('profiles')
export class ProfileController {
  constructor(private userService: UserService) {}

  @Get('/:username')
  async findProfile(@Param('username') username: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new NotFoundException();
    }
    return { profile: user };
  }
}
