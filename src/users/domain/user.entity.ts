import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column({ length: 100 })
    fullName: string;

    @Column({ length: 100 })
    email: string;

    @Column()
    password: string;
}
