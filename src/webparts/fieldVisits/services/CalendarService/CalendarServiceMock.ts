import { ICalendarService } from './ICalendarService';
import { ICalendarItem } from '../../model/ICalendarItem';

export default class CalendarServiceMock implements ICalendarService {

    private mockItems: ICalendarItem[] =
    [
        {
            Title: "Lonseome Pine follow-up (LONEP)",
            DateTime: new Date(),
            Location: "23 SE Hawthorne Blvd., Portland, OR",
            Coordinates: {
                Latitude: 45.5122555, 
                Longitude: -122.6666086
            }
        },
        {
            Title: "Big Cheese annual inspection (THEBI)",
            DateTime: new Date(),
            Location: "89 Jefferson Way, Portland, OR",
            Coordinates: {
                Latitude: 45.5137863, 
                Longitude: -122.675375
            }
        },
        {
            Title: "Lazu K Kountry Store (LAZYK)",
            DateTime: new Date(),
            Location: "12 Orchestra Terrace, Walla Walla, WA",
            Coordinates: {
                Latitude: 46.0671362,
                Longitude: -118.3388946
            }
        }
    ];

    public getMyCalendarItems() {
        return new Promise<ICalendarItem[]>((resolve) => {
            resolve(this.mockItems);
        });
    }
}
