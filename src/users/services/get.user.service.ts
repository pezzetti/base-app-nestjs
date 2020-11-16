import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { UserDomain } from '../domain/user.domain';
import { GetUserService } from '../interfaces/services/get.user.service.interface';

@Injectable()
export class GetUserServiceImpl implements GetUserService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    async getById(id: string): Promise<UserDomain | undefined> {
        return this.usersRepository.findOne({ userId: id });
    }
}
