import { UserDomain } from 'src/modules/users/domain/user.domain';

export interface CreateUserApplication {
    create(userDomain: UserDomain): Promise<UserDomain>;
}
