import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsUrl } from "class-validator";

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsUrl()
  url: string;

  @Column()
  handle: string;
}
