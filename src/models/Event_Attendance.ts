import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm"
import { User } from "./Users";
import { Events } from "./Events";

@Entity("event_attendance")
export class Event_Attendance {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    user_id!: number;

    @Column()
    event_id!: number;


    @Column()
    created_at?: Date

    @Column()
    updated_at?: Date

    @ManyToOne(() => User, (user) => user.roles)
    @JoinColumn ({name: "user_id", referencedColumnName:"id"})
    users?: User;

    @ManyToOne(() => Events, (event) => event)
    @JoinColumn ({name: "event_id", referencedColumnName:"id"})
    events?: Events;

}
