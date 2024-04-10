import "reflect-metadata";

import { DataSource } from "typeorm";
import { Role } from "./models/Roles";
import { User
 } from "./models/User";
import { Artists } from "./models/Artists";

import { Events
   
 } from "./models/Events";
import { CreateRoles1711370540646 } from "./database/migrations/1712743403827-CreateRoles";
import { CreateUsers1711452057287 } from "./database/migrations/1712748653125-CreateUsers";
import { CreateEvents1711452591041 } from "./database/migrations/1712748841625-CreateEvents";
import { CreateArtists1711452215378 } from "./database/migrations/1712748779041-CreateArtists";
import { CreateUserRoles1711370714119 } from "./database/migrations/1712748903145-CreateUserRoles";

// -----------------------------------------------------------------------------

export const AppDataSource = new DataSource({
   type: "mysql",
   host: "localhost",
   port: 3307,
   username: "root",
   password: "root",
   database: "proyectofinal",
   
   entities: [Role,User,Events,Artists],
   
   migrations: [CreateRoles1711370540646,CreateUsers1711452057287,CreateArtists1711452215378,CreateEvents1711452591041,CreateUserRoles1711370714119],
   synchronize:false,
   logging: false,
});


