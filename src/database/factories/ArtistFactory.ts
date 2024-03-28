import { faker } from "@faker-js/faker";
import { BaseFactory } from "./BaseFactory";
import { Artists } from "../../models/Artists";


// -----------------------------------------------------------------------------

export class ArtistFactory extends BaseFactory<Artists> {
    protected generateSpecifics(artists: Artists): Artists{
        artists.music = faker.music.songName();
        artists.events = faker.company.buzzAdjective();
        artists.genre = faker.music.genre();
        artists.created_at = new Date ();
        artists.updated_at = new Date ();
   
     
    
    

      return artists;
   }
}