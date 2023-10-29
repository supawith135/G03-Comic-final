import { CategoryInterface } from "./ICategory";
import { AdminInterface } from "./IAdmin";

export interface ComicsInterface {
  ID?: number;
  Title?: string;
  Description?: string;
  Url?: string;
  Price?: number;
  Image?: string;

  CategoryID?: number;
  Category?: CategoryInterface;

  AdminID?: number;
  Admin?: AdminInterface;
}
