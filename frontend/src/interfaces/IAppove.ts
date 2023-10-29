import {AdminInterface} from './IAdmin'
import {PaymentInterface} from './IPayment'
import {StatusInterface} from './IStatus'

export interface AppoveInterface {
    ID ?: number,
    Note ?: string,

    AdminID ?: number,
    Admin?: AdminInterface,

    PaymentID ?: number,
    Payment?: PaymentInterface,

    StatusID ?: number,
    Status ?: StatusInterface

}