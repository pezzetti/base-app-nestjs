import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GetUserService } from 'src/modules/users/interfaces/services/get.user.service.interface';
import { GetUserApplicationImpl } from '../../applications/get.user.application';
import { TYPES } from '../../interfaces/types';
import { User } from '../../domain/user.entity';

const user: User = {
    userId: '123123123',
    fullName: 'Rafael Pezzetti',
    password: '123456',
    email: 'rafael@pezzetti.com',
};

class MockGetUserService {
    getById = jest.fn().mockResolvedValue(user);
}

describe('GetUserApplication', () => {
    let application: GetUserApplicationImpl;
    let service: GetUserService;
    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                GetUserApplicationImpl,
                {
                    provide: TYPES.services.GetUserService,
                    useClass: MockGetUserService,
                },
            ],
        }).compile();

        service = app.get(TYPES.services.GetUserService);
        application = app.get<GetUserApplicationImpl>(GetUserApplicationImpl);
    });

    describe('getById', () => {
        it('should get user by id', async () => {
            expect(await application.getById(user.userId)).toEqual(user);
        });

        it('throws 404 error when user is not found', done => {
            service.getById = jest.fn().mockResolvedValue(null);
            application
                .getById(user.userId)
                .then(() => {
                    done('Should not get here');
                })
                .catch(error => {
                    expect(service.getById).toHaveBeenCalled();
                    expect(error).toBeInstanceOf(NotFoundException);
                    expect(error.message.message).toEqual(
                        `User with id ${user.userId} was not found`
                    );
                    done();
                });
        });
    });
});
