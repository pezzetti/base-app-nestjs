import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { Inject, UsePipes } from '@nestjs/common';
import { UserDomain as User, UserDomain } from '../domain/user.domain';
import { TYPES } from '../interfaces/types';
import { ICreateUserApplication } from '../interfaces/applications/create.user.application.interface';
import { IGetUserApplication } from '../interfaces/applications/get.user.application.interface';
import { ValidationPipe } from 'src/common/validation.pipe';

@Resolver('User')
export class UserResolver {
    constructor(
        @Inject(TYPES.applications.ICreateUserApplication) private createUserApp: ICreateUserApplication,
        @Inject(TYPES.applications.IGetUserApplication) private getUserApp: IGetUserApplication,
    ) {}

    @Query(() => User, { name: 'userById' })
    async getUserById(@Args('id', { type: () => ID }) userId: string): Promise<User> {
        return this.getUserApp.getById(userId);
    }

    @UsePipes(new ValidationPipe())
    @Mutation(() => String, { name: 'createUser' })
    async create(@Args('user') { ...user }: UserDomain) {
        return this.createUserApp.create(user);
    }
}
