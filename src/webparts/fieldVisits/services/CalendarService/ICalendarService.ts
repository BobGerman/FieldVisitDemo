import { IVisit } from '../../model/IVisit';
import { ICustomer } from '../../model/ICustomer';

export interface ICalendarService {
    getVisitCalendarForMe () : IVisit[];
}