import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { UserDomain } from '../domain/user.domain';
import { GetUserApplication } from '../interfaces/applications/get.user.application.interface';
import { GetUserService } from '../interfaces/services/get.user.service.interface';
import { TYPES } from '../interfaces/types';

@Injectable()
export class GetUserApplicationImpl implements GetUserApplication {
    constructor(
        @Inject(TYPES.services.GetUserService)
        private getUserService: GetUserService
    ) {}

    async getById(id: string): Promise<UserDomain> {
        const user = await this.getUserService.getById(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} was not found`);
        }
        return user;
    }
}
