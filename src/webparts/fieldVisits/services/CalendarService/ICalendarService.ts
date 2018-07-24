import { ICalendarItem } from '../../model/ICalendarItem';

export interface ICalendarService {
    
    getGroupCalendarItems (groupId: string) : Promise<ICalendarItem[]>;
    
}