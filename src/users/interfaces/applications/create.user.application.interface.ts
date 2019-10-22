import { UserDomain } from 'src/users/domain/user.domain';

export interface ICreateUserApplication {
    create(userDomain: UserDomain): Promise<UserDomain>;
}
