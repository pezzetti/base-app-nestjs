import { UserDomain } from 'src/users/domain/user.domain';

export interface IGetUserService {
    getById(id: string): Promise<UserDomain>;
}
