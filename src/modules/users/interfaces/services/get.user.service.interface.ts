import { UserDomain } from 'src/modules/users/domain/user.domain';

export interface GetUserService {
    getById(id: string): Promise<UserDomain | undefined>;
    getByEmail(email: string): Promise<UserDomain | undefined>;
}
