import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserApplication } from 'src/modules/users/interfaces/applications/create.user.application.interface';
import { GetUserApplication } from 'src/modules/users/interfaces/applications/get.user.application.interface';
import { UsersController } from '../../controller/users.controller';
import { TYPES } from '../../interfaces/types';

const user = {
    userId: '123123123',
    fullName: 'Rafael Pezzetti',
    password: '123456',
    email: 'rafael@pezzetti.com',
};

class CreateUserApplicationMock {
    create = jest.fn().mockResolvedValue(user);
}

class GetUserApplicationMock {
    getById = jest.fn().mockResolvedValue(user);
}

describe('Users Controller', () => {
    let controller: UsersController;
    let createUserAppMock: CreateUserApplication;
    let getUserAppMock: GetUserApplication;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: TYPES.applications.CreateUserApplication,
                    useClass: CreateUserApplicationMock,
                },
                {
                    provide: TYPES.applications.GetUserApplication,
                    useClass: GetUserApplicationMock,
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        createUserAppMock = module.get(
            TYPES.applications.CreateUserApplication
        );
        getUserAppMock = module.get(TYPES.applications.GetUserApplication);
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

            expect(await controller.create(user)).toEqual(user);
            expect(createUserAppMock.create).toBeCalled();
        });
    });
});
