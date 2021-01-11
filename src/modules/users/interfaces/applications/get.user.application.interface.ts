import { UserDomain } from 'src/modules/users/domain/user.domain';

export interface GetUserApplication {
    getById(id: string): Promise<UserDomain | undefined>;
}
