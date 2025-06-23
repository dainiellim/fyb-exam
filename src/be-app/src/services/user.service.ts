import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }
    async findOne(id : string): Promise<User> {
        const user = await this.usersRepository.findOneBy({ 'id' : id });
        if (!user) {
            throw new NotFoundException("Something wen't wrong please contact your admin support!");
        }
        return user;
    }
}
