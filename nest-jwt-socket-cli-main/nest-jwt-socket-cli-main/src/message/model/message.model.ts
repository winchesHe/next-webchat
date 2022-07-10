import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({default: 'Hello'})
    content: string;

    @Column({default: 'winches'})
    username: string;

    @IsNotEmpty()
    @Column({default: 'chenmeie'})
    sender: string;

    @IsNotEmpty()
    @Column({default: 'winches'})
    receiver: string;
}