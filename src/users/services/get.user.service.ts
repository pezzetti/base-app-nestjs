import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { UserDomain } from '../domain/user.domain';
import { IGetUserService } from '../interfaces/services/get.user.service.interface';

@Injectable()
export class GetUserService implements IGetUserService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    async getById(id: string): Promise<UserDomain> {
        return this.usersRepository.findOne({ userId: id });
    }
}
