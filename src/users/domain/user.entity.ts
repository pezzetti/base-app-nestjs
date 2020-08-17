import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Field(() => String)
    @Column({ length: 100 })
    fullName: string;

    @Field(() => String)
    @Column({ length: 100 })
    email: string;

    @Field(() => String)
    @Column()
    password: string;
}
