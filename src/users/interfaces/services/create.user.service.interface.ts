import { UserDomain } from 'src/users/domain/user.domain';

export interface ICreateUserService {
    create(userDomain: UserDomain): Promise<UserDomain>;
}
