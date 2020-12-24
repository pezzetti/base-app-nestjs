import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDomain } from 'src/modules/users/domain/user.domain';
import { GetUserService } from 'src/modules/users/interfaces/services/get.user.service.interface';
import { TYPES } from '../../users/interfaces/types';
import { Token } from './token';
import { UserAuth } from './user.interface';

@Injectable()
export class AuthService {
    constructor(
        @Inject(TYPES.services.GetUserService)
        private getUserService: GetUserService,
        private jwtService: JwtService
    ) {}

    async validateUser(
        userEmail: string,
        userPassword: string
    ): Promise<UserDomain | null> {
        const user = await this.getUserService.getByEmail(userEmail);
        if (user && user.password === userPassword) {
            return user;
        }
        return null;
    }

    async login(user: UserAuth): Promise<Token> {
        const payload = { email: user.email, id: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
