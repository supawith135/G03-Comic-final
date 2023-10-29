import { MemberInterface } from "./IMember";
import { ComicsInterface } from "./IComics";

export interface BasketInterface {
  ID?: number;
  Total?: number;

  MemberID?: number;
  Member?: MemberInterface;

  ComicID?: number;
  Comic?: ComicsInterface;
}
