import { faker } from "@faker-js/faker";
import { BaseFactory } from "./BaseFactory";
import { Events } from "../../models/Events";


// -----------------------------------------------------------------------------

export class EventFactory extends BaseFactory<Events> {
    protected generateSpecifics(events: Events): Events
    {
        events.date = faker.date.future();
       events.location = faker.location.streetAddress();
   
     
    
    

      return events;
   }
}