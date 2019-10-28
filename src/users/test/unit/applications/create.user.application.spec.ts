import { Test } from '@nestjs/testing';
import { User } from '../../../domain/user.entity';
import { CreateUserApplication } from '../../../applications/create.user.application';
import { TYPES } from '../../../interfaces/types';

class CreateUserService {
    create(user) {
        return user;
    }
}
describe('CreateUserApplication', () => {
    let application: CreateUserApplication;
    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                CreateUserApplication,
                {
                    provide: TYPES.services.ICreateUserService,
                    useClass: CreateUserService,
                },
            ],
        }).compile();

        application = app.get<CreateUserApplication>(CreateUserApplication);
    });

    describe('create', () => {
        it('should create user', async () => {
            const user: User = {
                userId: '123123123',
                fullName: 'Rafael Pezzetti',
                password: '123456',
                email: 'rafael@pezzetti.com',
            };
            expect(await application.create(user)).toEqual(user);
        });
    });
});
