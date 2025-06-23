import { Controller, Post, Body, HttpCode, UsePipes, ValidationPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('/login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    return { message: 'Login successful', token: token };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return { message: 'Registration successful', data: user };
  }
}
