import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class MqUser {
  @PrimaryGeneratedColumn()
  id: number;
  
  @IsNotEmpty()
  @Column()
  username: string;

  @IsNotEmpty()
  @Column()
  password: string;

  @Column({default: 'null'})
  avataro: string;
}
