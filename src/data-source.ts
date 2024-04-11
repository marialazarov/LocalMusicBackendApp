import "reflect-metadata";

import { DataSource } from "typeorm";
import { Role } from "./models/Roles";
import { User
 } from "./models/User";
import { Artists } from "./models/Artists";

import { Events
   
 } from "./models/Events";
import { CreateRoles1711370540646 } from "./database/migrations/1712748721625-CreateRoles";
import { CreateEvents1728452215378 } from "./database/migrations/1712748824045-CreateEvents";
import {  CreateArtists1721452591041 } from "./database/migrations/1712748824041-CreateArtists";
import { CreateUserRoles1721370714119 } from "./database/migrations/2712748823145-CreateUserRoles";
import { CreateUsers1720452057287 } from "./database/migrations/1712748813145-CreateUsers";


// -----------------------------------------------------------------------------

export const AppDataSource = new DataSource({
   type: "mysql",
   host: "localhost",
   port: 3307,
   username: "root",
   password: "root",
   database: "proyectofinal",
   
   entities: [Role,User,Events,Artists],
   
   migrations: [CreateArtists1721452591041
     ,CreateUserRoles1721370714119,CreateRoles1711370540646,CreateUsers1720452057287,
CreateEvents1728452215378
   ],
   synchronize:false,
   logging: false,
});


