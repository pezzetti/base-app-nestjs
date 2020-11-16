import { UserDomain } from 'src/users/domain/user.domain';

export interface CreateUserApplication {
    create(userDomain: UserDomain): Promise<UserDomain>;
}
