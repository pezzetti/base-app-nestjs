import { Test } from '@nestjs/testing';
import { User } from '../../../domain/user.entity';
import { GetUserApplication } from '../../../applications/get.user.application';
import { TYPES } from '../../../interfaces/types';
import { NotFoundException } from '@nestjs/common';

const user: User = {
    userId: '123123123',
    fullName: 'Rafael Pezzetti',
    password: '123456',
    email: 'rafael@pezzetti.com',
};

class GetUserService {
    getById(userId) {
        return user;
    }
}

describe('GetUserApplication', () => {
    let application: GetUserApplication;
    let service: GetUserService;
    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                GetUserApplication,
                {
                    provide: TYPES.services.IGetUserService,
                    useClass: GetUserService,
                },
            ],
        }).compile();

        service = app.get<GetUserService>(TYPES.services.IGetUserService);
        application = app.get<GetUserApplication>(GetUserApplication);
    });

    describe('getById', () => {
        it('should get user by id', async () => {
            expect(await application.getById(user.userId)).toEqual(user);
        });

        it('throws 404 error when user is not found', async () => {
            jest.spyOn(service, 'getById').mockImplementation(() => null);
            try {
                await application.getById(user.userId);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message.message).toEqual(`User with id ${user.userId} was not found`);
            }
        });
    });
});
