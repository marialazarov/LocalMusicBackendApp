import { faker } from "@faker-js/faker";
import { User } from "../../models/Users";
import bcrypt from "bcrypt"
import { BaseFactory } from "./BaseFactory";

// -----------------------------------------------------------------------------

export class UserFactory extends BaseFactory<User>{
 protected generateSpecifics(user: User): User {
   user.username = faker.internet.userName();
   user.password = bcrypt.hashSync("12345678",10)
   user.email =faker.internet.email({
      
      allowSpecialCharacters: true
      
      });
   user.name = faker.person.firstName();
   user.surname = faker.person.lastName();
  
   return user
   }

   }


