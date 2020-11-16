import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { ORMConfig } from './ormconfig';

@Module({
    imports: [
        GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'],
            resolverValidationOptions: {
                requireResolversForResolveType: false,
            },
        }),
        UsersModule,
        TypeOrmModule.forRoot(ORMConfig),
    ],
})
export class AppModule {}
