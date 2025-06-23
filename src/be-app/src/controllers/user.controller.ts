import { ClassSerializerInterceptor, Controller, Get, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Get('/me')
  async getProfile(@Request() req) {
    const user = await this.userService.findOne(req.user.sub);
    return { data: user };
  }
}
