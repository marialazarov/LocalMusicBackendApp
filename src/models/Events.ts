import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Artists } from "./Artists";
import { User } from "./User";


@Entity("events")
export class Events {
    @PrimaryGeneratedColumn()
    id?: number;

 
    @Column()
    user_id!: number;

    @Column()
    artist_id!: number;

    @Column()
    location!: string;

    @Column()
    date!: Date;

    @Column()
    created_at?: Date

    @Column()
    updated_at?: Date


    @ManyToOne(() => User, (user) => user.roles)
    @JoinColumn ({name: "user_id", referencedColumnName:"id"})
    user?: User;

    @ManyToOne(() => Artists, (artist) => artist.user)
    @JoinColumn ({name: "artist_id", referencedColumnName:"id"})
    artist?: Artists;

   


}
