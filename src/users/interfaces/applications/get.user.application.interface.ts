import { UserDomain } from 'src/users/domain/user.domain';

export interface IGetUserApplication {
    getById(id: string): Promise<UserDomain>;
}
