import {RatingInterface} from "./lRating"
import { ComicsInterface } from "./IComics";

export interface ReviewInterface {
  ID?: number;
  Comment?: string;

  ComicID?: number;
  Comic?: ComicsInterface;
  
  Rating?: RatingInterface;
  RatingID?: number
}