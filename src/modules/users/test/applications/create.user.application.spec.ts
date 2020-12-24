import { Test } from '@nestjs/testing';
import { CreateUserService } from 'src/modules/users/interfaces/services/create.user.service.interface';
import { User } from '../../domain/user.entity';
import { CreateUserApplicationImpl } from '../../applications/create.user.application';
import { TYPES } from '../../interfaces/types';

const user: User = {
    userId: '123123123',
    fullName: 'Rafael Pezzetti',
    password: '123456',
    email: 'rafael@pezzetti.com',
};
class MockCreateUserService {
    create = jest.fn().mockResolvedValue(user);
}

describe('CreateUserApplication', () => {
    let application: CreateUserApplicationImpl;
    let mockService: CreateUserService;

    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                CreateUserApplicationImpl,
                {
                    provide: TYPES.services.CreateUserService,
                    useClass: MockCreateUserService,
                },
            ],
        }).compile();

        application = app.get<CreateUserApplicationImpl>(
            CreateUserApplicationImpl
        );
        mockService = app.get(TYPES.services.CreateUserService);
    });

    describe('create', () => {
        it('should create user', async () => {
            expect(await application.create(user)).toEqual(user);
            expect(mockService.create).toBeCalled();
        });
    });
});
