import { faker } from "@faker-js/faker";
import { BaseFactory } from "./BaseFactory";
import { Artists } from "../../models/Artists";
import bcrypt from "bcrypt"

// -----------------------------------------------------------------------------

export class ArtistFactory extends BaseFactory<Artists> {
    protected generateSpecifics(artists: Artists): Artists{
        artists.music = faker.music.songName();
        artists.username = faker.internet.userName();
        artists.email = faker.internet.email();
        artists.password = bcrypt.hashSync("12345678",10)
        artists.genre = faker.music.genre();
        artists.created_at = new Date ();
        artists.updated_at = new Date ();
   
     
    
    

      return artists;
   }
}