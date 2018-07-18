import { IVisit } from '../../model/IVisit';
import { ICustomer } from '../../model/ICustomer';

export interface ICustomerService {
    getCustomer () : ICustomer;
}