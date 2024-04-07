import "reflect-metadata";

import { DataSource } from "typeorm";
import { Role } from "./models/Roles";
import { User
 } from "./models/User";
import { Artists } from "./models/Artists";

import { Events
   
 } from "./models/Events";
import { CreateRoles1711370540646 } from "./database/migrations/1712516588113-CreateRoles";
import { CreateUsers1711452057287 } from "./database/migrations/1712516657912-CreateUsers";
import { UserRoles } from "./constants/UserRoles";
import { CreateUserRoles1711370714119 } from "./database/migrations/1712516757100-CreateUserRoles";
import { CreateArtists1711452215378 } from "./database/migrations/1712516816918-CreateArtists";
import { CreateEvents1711452591041 } from "./database/migrations/1712516864300-CreateEvents";


// -----------------------------------------------------------------------------

export const AppDataSource = new DataSource({
   type: "mysql",
   host: "localhost",
   port: 3307,
   username: "root",
   password: "root",
   database: "proyectofinal",
   
   entities: [Role,User,Events,Artists],
   
   migrations: [CreateRoles1711370540646, CreateUsers1711452057287,CreateUserRoles1711370714119,CreateArtists1711452215378,CreateEvents1711452591041
   ],
   synchronize:false,
   logging: false,
});


