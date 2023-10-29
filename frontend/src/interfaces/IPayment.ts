import { BasketInterface } from "./IBasket";
import {StatusInterface} from './IStatus'

export interface PaymentInterface {
  ID?: number;
  Image: string;
  Date?: Date | null;

  BasketID?: number;
  Basket?: BasketInterface;

  StatusID?: number;
  Status?: StatusInterface;
}
