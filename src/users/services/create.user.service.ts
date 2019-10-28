import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { UserDomain } from '../domain/user.domain';
import { ICreateUserService } from '../interfaces/services/create.user.service.interface';

@Injectable()
export class CreateUserService implements ICreateUserService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    async create(user: UserDomain): Promise<UserDomain> {
        return this.usersRepository.save(user);
    }
}
