import { TokenData, TokenDataArtist } from "./types";

declare global {
  namespace Express {
    export interface Request {
      tokenData: TokenData;
      tokenDataArtist: TokenDataArtist;
    }

}

}
