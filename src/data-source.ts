import "reflect-metadata";

import { DataSource } from "typeorm";
import { Role } from "./models/Roles";
import { User } from "./models/Users";
import { Artists } from "./models/Artists";
import { Event_Attendance } from "./models/Event_Attendance";
import { CreateRoles1711370540646 } from "./database/migrations/1711370540646-CreateRoles";

import { CreateUsers1711452057287 } from "./database/migrations/1711452057287-CreateUsers";
import { CreateEvents1711452591041 } from "./database/migrations/1711452591041-CreateEvents";
import { CreateEventAttendance1711452768525 } from "./database/migrations/1711452768525-CreateEventAttendance";
import { CreateArtists1711452215378 } from "./database/migrations/1711452215378-CreateArtists";
import { Events} from "./models/Events";
import { CreateUserRoles1711370714119 } from "./database/migrations/1711496956932-CreateUserRoles";




// -----------------------------------------------------------------------------

export const AppDataSource = new DataSource({
   type: "mysql",
   host: "localhost",
   port: 3307,
   username: "root",
   password: "root",
   database: "proyectofinal",
   
   entities: [Role,User,Events,Artists,Event_Attendance],
   
   migrations: [CreateRoles1711370540646,CreateUsers1711452057287,CreateEvents1711452591041,CreateUserRoles1711370714119,
       CreateEventAttendance1711452768525,CreateArtists1711452215378],
   synchronize:false,
   logging: false,
});


