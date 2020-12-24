import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../domain/user.entity';
import { CreateUserServiceImpl } from '../../services/create.user.service';

describe('CreateUserService', () => {
    let service: CreateUserServiceImpl;
    let repositoryMock: Repository<User>;
    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                CreateUserServiceImpl,
                {
                    // how you provide the injection token in a test instance
                    provide: getRepositoryToken(User),
                    // as a class value, Repository needs no generics
                    useClass: Repository,
                },
            ],
        }).compile();

        service = app.get<CreateUserServiceImpl>(CreateUserServiceImpl);
        repositoryMock = app.get<Repository<User>>(getRepositoryToken(User));
    });

    describe('create', () => {
        it('should create user', async () => {
            const user: User = {
                userId: '123123123',
                fullName: 'Rafael Pezzetti',
                password: '123456',
                email: 'rafael@pezzetti.com',
            };
            jest.spyOn(repositoryMock, 'save').mockResolvedValueOnce(user);
            expect(await service.create(user)).toEqual(user);
            expect(repositoryMock.save).toBeCalled();
        });
    });
});
