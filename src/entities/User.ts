import { IsEmail, IsOptional, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(10, 50)
  @IsOptional()
  name: string;

  @Column()
  @IsEmail()
  email: string;
}
