import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORMConfig } from './ormconfig';
import { GraphQLModule } from '@nestjs/graphql';

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
