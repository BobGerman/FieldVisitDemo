import { ICalendarItem } from '../../model/ICalendarItem';

export interface ICalendarService {
    
    getMyCalendarItems () : ICalendarItem[];
}