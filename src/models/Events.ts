import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Artists } from "./Artists";


@Entity("events")
export class Events {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    artist_id!: number;

    @Column()
    location!: string;

    @Column()
    date!: string;

    @Column()
    created_at?: Date

    @Column()
    updated_at?: Date

    @ManyToOne(() => Artists, (artists) => artists.user)
    @JoinColumn ({name: "artist_id"})
    artists?: Artists;


}
