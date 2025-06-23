import { Controller, Get, Req, Post } from '@nestjs/common';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    @Post('/login')
    login(@Req() req: Request) {
        return 'You are logged In';
    }

    @Post('/register')
    register(id: string) {
        return 'You are registering';
    }

    @Get('/users/me')
    getUser(id: string) {
        return "Hi I'm  you!";
    }
}