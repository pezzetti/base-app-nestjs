import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/domain/user.entity';
import { TYPES } from '../../users/interfaces/types';
import { GetUserService } from '../../users/interfaces/services/get.user.service.interface';
import { AuthService } from '../shared/auth.service';

class JwtServiceMock {
    sign = jest.fn();
}

class GetUserServiceMock {
    getByEmail = jest.fn();

    getById = jest.fn();
}

describe('AuthService', () => {
    let service: AuthService;
    let jwtServiceMock: JwtService;
    let getUserMock: GetUserService;
    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: JwtService,
                    useClass: JwtServiceMock,
                },
                {
                    provide: TYPES.services.GetUserService,
                    useClass: GetUserServiceMock,
                },
            ],
        }).compile();

        service = app.get<AuthService>(AuthService);
        jwtServiceMock = app.get<JwtService>(JwtService);
        getUserMock = app.get<GetUserService>(TYPES.services.GetUserService);
    });

    describe('login', () => {
        it('should login and return an access_token', async () => {
            jwtServiceMock.sign = jest.fn().mockReturnValue('tokenHere');

            const token = await service.login({
                email: 'rafael@pezzetti.com',
                userId: '123',
            });
            expect(token).toEqual({
                access_token: 'tokenHere',
            });
            expect(jwtServiceMock.sign).toHaveBeenCalledWith({
                email: 'rafael@pezzetti.com',
                id: '123',
            });
        });
    });

    describe('validateUser', () => {
        it('should return user if founded and passord matches', async () => {
            const user: User = {
                userId: '123123123',
                fullName: 'Rafael Pezzetti',
                password: '123',
                email: 'rafael@pezzetti.com',
            };
            jest.spyOn(getUserMock, 'getByEmail').mockResolvedValueOnce(user);
            jwtServiceMock.sign = jest.fn().mockReturnValue('tokenHere');

            const validatedUser = await service.validateUser(
                'rafael@pezzetti.com',
                '123'
            );
            expect(validatedUser).toEqual(user);
        });
        it('should return null if password does not match', async () => {
            const user: User = {
                userId: '123123123',
                fullName: 'Rafael Pezzetti',
                password: '2222222',
                email: 'rafael@pezzetti.com',
            };
            jest.spyOn(getUserMock, 'getByEmail').mockResolvedValueOnce(user);
            jwtServiceMock.sign = jest.fn().mockReturnValue('tokenHere');

            const validatedUser = await service.validateUser(
                'rafael@pezzetti.com',
                'SomeWrongPassWord'
            );
            expect(validatedUser).toBeNull();
        });
    });
});
