import "reflect-metadata";

import { DataSource } from "typeorm";
import { Role } from "./models/Roles";
import { User } from "./models/Users";
import { Artists } from "./models/Artists";

import { Events
   
 } from "./models/Events";
import { CreateRoles1711370540646 } from "./database/migrations/1711913558134-CreateRoles";
import { CreateUsers1711452057287 } from "./database/migrations/1711913705325-CreateUsers";
import { CreateUserRoles1711370714119 } from "./database/migrations/1711914710556-CreateUserRoles";
import { CreateArtists1711452215378 } from "./database/migrations/1711914774493-CreateArtists";
import { CreateEvents1711452591041 } from "./database/migrations/1711914869988-CreateEvents";



// -----------------------------------------------------------------------------

export const AppDataSource = new DataSource({
   type: "mysql",
   host: "localhost",
   port: 3307,
   username: "root",
   password: "root",
   database: "proyectofinal",
   
   entities: [Role,User,Events,Artists],
   
   migrations: [CreateRoles1711370540646, CreateUsers1711452057287, CreateUserRoles1711370714119, CreateArtists1711452215378, CreateEvents1711452591041],
   synchronize:false,
   logging: false,
});


