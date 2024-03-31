import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Roles";
import { Artists } from "./Artists";

import { Events } from "./Events";



@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true })
    username!: string;

    @Column()
    name?: string;
    

    @Column()
    surname?: string;

    @Column({select: false} ) // password is not selected by default in queries
    password!: string;

    @Column({ unique: true })
    email!: string;

    
    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({
       name: "users_roles",
       joinColumn: {
          name: "user_id",
          referencedColumnName: "id",
       },
       inverseJoinColumn: {
          name: "role_id",
          referencedColumnName: "id",
       },
    })
    roles!: Role[];

    @OneToOne(() => Artists, (artists) => artists.user)
    artists?: Artists;

    @OneToMany(() => Events, events => events.user_id)
    events?: Events[];
   

}
