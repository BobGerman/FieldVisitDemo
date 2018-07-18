import { ICalendarService } from './ICalendarService';
import { ICalendarItem } from '../../model/ICalendarItem';

export default class CalendarServiceMock implements ICalendarService {

    private mockItems: ICalendarItem[] =
    [
        {
            Title: "Meeting",
            DateTime: Date.now,
            Location: "22 Second Street",
            Coordinates: {
                Latitude: 42;
                Longitude: 71;
            }
        }
    ]

    public getVisitCalendarForMe() {
        return this.mockItems;
    }
}
