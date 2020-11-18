import { UserDomain } from 'src/users/domain/user.domain';

export interface GetUserService {
    getById(id: string): Promise<UserDomain | undefined>;
}
