import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Events } from "./Events";

@Entity("artists")
export class Artists extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user_id!: number;
    @Column()
    username?: string;
    @Column()
    email!: string;

    @Column()
    password!: string;



    @Column()
    genre?: string;


    @Column()
    music?: string;

    @Column()
    created_at!: Date;

    @Column()
    updated_at!: Date;

    @OneToOne(() => User, (users) => users.artists)
    @JoinColumn({ name: "user_id" })
    user!: User;
   
    @OneToMany(() => Events, events => events.artist)
    events?: Events[];
   

}
