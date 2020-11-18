import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { UserDomain } from '../domain/user.domain';
import { CreateUserService } from '../interfaces/services/create.user.service.interface';

@Injectable()
export class CreateUserServiceImpl implements CreateUserService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    async create(user: UserDomain): Promise<UserDomain> {
        return this.usersRepository.save(user);
    }
}
