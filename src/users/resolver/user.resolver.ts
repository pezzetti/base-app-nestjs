import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { Inject, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/common/validation.pipe';
import { UserDomain } from '../domain/user.domain';
import { TYPES } from '../interfaces/types';
import { CreateUserApplication } from '../interfaces/applications/create.user.application.interface';
import { GetUserApplication } from '../interfaces/applications/get.user.application.interface';

@Resolver('User')
export class UserResolver {
    constructor(
        @Inject(TYPES.applications.CreateUserApplication)
        private createUserApp: CreateUserApplication,
        @Inject(TYPES.applications.GetUserApplication)
        private getUserApp: GetUserApplication
    ) {}

    @Query(() => UserDomain, { name: 'userById' })
    async getUserById(
        @Args('id', { type: () => ID }) userId: string
    ): Promise<UserDomain | undefined> {
        return this.getUserApp.getById(userId);
    }

    @UsePipes(new ValidationPipe(UserDomain))
    @Mutation(() => String, { name: 'createUser' })
    async create(@Args('user') { ...user }: UserDomain): Promise<UserDomain> {
        return this.createUserApp.create(user);
    }
}
