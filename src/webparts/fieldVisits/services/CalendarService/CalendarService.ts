import { ICalendarService } from './ICalendarService';
import { ICalendarItem } from '../../model/ICalendarItem';
import { IUser } from '../../model/IUser';

export default class CalendarService implements ICalendarService {

    private mockItems: ICalendarItem[] =
    [
        {
            Title: "Damage assessment: Lonseome Pine follow-up (LONEP)",
            DateTime: new Date(2018, 6, 30, 9, 31, 0),
            Attendees: [
                { fullName: "User 2", email: "user2@contoso.com" }
            ]
        },
        {
            Title: "Damage assessment: Big Cheese annual inspection (THEBI)",
            DateTime: new Date(2018, 6, 30, 11, 1, 0),
            Attendees: [
                { fullName: "User 1", email: "user1@contoso.com" }
            ]
        },
        {
            Title: "Fire inspection: Lazy K Kountry Store (LAZYK)",
            DateTime: new Date(2018, 6, 30, 15, 31, 0),
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
