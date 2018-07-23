import { ICalendarService } from './ICalendarService';
import { ICalendarItem } from '../../model/ICalendarItem';
import { IUser } from '../../model/IUser';

export default class CalendarServiceMock implements ICalendarService {

    private mockItems: ICalendarItem[] =
    [
        {
            Title: "Lonseome Pine follow-up (LONEP)",
            DateTime: new Date(2018, 6, 30, 9, 30, 0),
            Attendees: [
                { fullName: "User 2", email: "user2@contoso.com" }
            ]
        },
        {
            Title: "Big Cheese annual inspection (THEBI)",
            DateTime: new Date(2018, 6, 30, 11, 0, 0),
            Attendees: [
                { fullName: "User 1", email: "user1@contoso.com" }
            ]
        },
        {
            Title: "Lazu K Kountry Store (LAZYK)",
            DateTime: new Date(2018, 6, 30, 15, 30, 0),
            Attendees: [
                { fullName: "User 3", email: "user3@contoso.com" },
                { fullName: "User 2", email: "user2@contoso.com" },
                { fullName: "User 1", email: "user1@contoso.com" }
            ]
        }
    ];

    public getMyCalendarItems() {
        return new Promise<ICalendarItem[]>((resolve) => {
            resolve(this.mockItems);
        });
    }
}
