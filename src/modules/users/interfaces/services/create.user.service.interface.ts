import { UserDomain } from 'src/modules/users/domain/user.domain';

export interface CreateUserService {
    create(userDomain: UserDomain): Promise<UserDomain>;
}
