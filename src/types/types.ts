
export interface TokenData {
    userId: string,
    userRoles: string[],
    email: string,
  
}

export interface CreateEventsRequestBody {
    artist_id: number,
    date: Date,
    location: string
  }
  export interface CreateEvent_AttendanceRequestBody {
    user_id: number,
    event_id: number
 
  }

  export interface LoginUserRequestBody {
    email: string;
    password: string;
 }
export interface CreateArtistRequestBody {

    name: string;

  genre: string;
  music: string;
  events: string;
  password: string;
  email: string;   
  user_id: number;
  
  

}

  export interface CreateUserRequestBody{
    username: string;
    name?: string;
    surname?: string;
    password: string;
    email:string;
    user_id: number;

}

export interface CreateArtistRequestBody {
    user_id: number;
    artist_id: number;
    name: string;
    music: string;
    genre: string;
    events: string;

    
 
 }
