
export interface TokenData {
  userId: string,
  userRoles: string[],
  name: string,
  username:string,
  email: string,
  phone?: string
}

export interface TokenDataArtist {
  userId: string,
  userRoles: string[],
  name: string,
  username:string,
  email: string,
  
}


export interface CreateEventsRequestBody {
    artist_id: number,
    user_id: number,
    date: Date,
    location: string
  }


  export interface LoginUserRequestBody {
    email: string;
    password: string;
 }


  export interface CreateUserRequestBody{
    username: string;
    name: string;
    surname?: string;
    password: string;
    email:string;
 
}

export interface CreateArtistRequestBody {
    user_id: number;
    username: string;
    name:string;
    surname: string;
    email: string;
    password: string;
    music: string;
    genre: string;

   
 
 }
