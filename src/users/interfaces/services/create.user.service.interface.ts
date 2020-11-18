import { UserDomain } from 'src/users/domain/user.domain';

export interface CreateUserService {
    create(userDomain: UserDomain): Promise<UserDomain>;
}
