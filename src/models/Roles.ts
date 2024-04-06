import { Column, Entity, PrimaryGeneratedColumn,ManyToMany, JoinTable } from "typeorm"
import { User } from "./Users";

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string

    @Column()
    created_at!: Date

    @Column()
    updated_at!: Date


    users?: User[];
 }
