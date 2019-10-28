import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../../controller/users.controller';
import { TYPES } from '../../../interfaces/types';
import { userInfo } from 'os';

const user = {
    userId: '123123123',
    fullName: 'Rafael Pezzetti',
    password: '123456',
    email: 'rafael@pezzetti.com',
};

class CreateUserApplicationMock {
    create(obj) {
        return user;
    }
}

class GetUserApplicationMock {
    getById(id) {
        return user;
    }
}

describe('Users Controller', () => {
    let controller: UsersController;
    let createUserAppMock;
    let getUserAppMock;
    const response = {
        status: (code: number) => response,
        json: json => json,
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: TYPES.applications.ICreateUserApplication,
                    useClass: CreateUserApplicationMock,
                },
                {
                    provide: TYPES.applications.IGetUserApplication,
                    useClass: GetUserApplicationMock,
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        createUserAppMock = module.get(TYPES.applications.ICreateUserApplication);
        getUserAppMock = module.get(TYPES.applications.IGetUserApplication);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('findOne', () => {
        it('should get user by id', async () => {
            jest.spyOn(getUserAppMock, 'getById');

            expect(await controller.findOne(user.userId)).toEqual(user);
            expect(getUserAppMock.getById).toBeCalled();
        });
    });
    describe('create', () => {
        it('should create user', async () => {
            jest.spyOn(createUserAppMock, 'create');

            expect(await controller.create(response, user)).toEqual(user);
            expect(createUserAppMock.create).toBeCalled();
        });
    });
});
