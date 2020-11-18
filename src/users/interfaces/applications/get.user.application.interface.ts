import { UserDomain } from 'src/users/domain/user.domain';

export interface GetUserApplication {
    getById(id: string): Promise<UserDomain | undefined>;
}
