import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './modules/users/users.module';
import { getORMConfig } from './ormconfig';
import { configuration } from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
        AuthModule,
        GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'],
            resolverValidationOptions: {
                requireResolversForResolveType: false,
            },
        }),
        UsersModule,
        TypeOrmModule.forRoot(getORMConfig()),
    ],
})
export class AppModule {}
