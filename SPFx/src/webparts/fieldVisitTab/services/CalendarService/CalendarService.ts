import { ICalendarService } from './ICalendarService';
import { ICalendarItem } from '../../model/ICalendarItem';
import { IUser } from '../../model/IUser';

import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { MSGraphClient } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

interface CalendarView { value: MicrosoftGraph.Event[]; }

export default class CalendarService implements ICalendarService {

    private context: WebPartContext;
    private serviceScope: ServiceScope;
    constructor(context: WebPartContext, serviceScope: ServiceScope) {
        this.context = context;
        this.serviceScope = serviceScope;
    }

    public getGroupCalendarItems(groupId: string, groupName: string) {

        var result = new Promise<ICalendarItem[]>((resolve, reject) => {

            const now = Date.now();
            const startDateTime = this.formatDateForRest(new Date(now));
            const endDateTime = this.formatDateForRest(new Date(now + 7 * 24 * 60 * 60 * 1000));

            this.context.msGraphClientFactory
                .getClient()
                .then((graphClient: MSGraphClient): void => {
                    graphClient.api(`/groups/${groupId}/calendarview?startdatetime=${startDateTime}&enddatetime=${endDateTime}`)
                        .get((error, data: CalendarView, rawResponse?: any) => {

                            let calendarItems: ICalendarItem[] = [];
                            data.value.forEach((event) => {

                                if (event.attendees) {

                                    let attendees: IUser[] = [];
                                    event.attendees.forEach((user) => {
                                        if (user.emailAddress.name.toLowerCase() !=
                                            groupName.toLowerCase()) {
                                            attendees.push({
                                                fullName: user.emailAddress.name,
                                                email: user.emailAddress.address
                                            });
                                        }
                                    });

                                    calendarItems.push({
                                        Title: event.subject,
                                        DateTime: new Date(event.start.dateTime),
                                        Attendees: attendees
                                    });
                                }
                            });
                            resolve(calendarItems);

                        });

                });

        });

        return result;
    }

    // formatDateForRest() - The O365 REST API wants ISO format with the milliseconds not present,
    // in UTC. This function will return the correctly formatted time for midnight, local time, on
    // the date specified. Example of a correctly formatted time: 2015-09-06T00:00:00Z
    private formatDateForRest(date) {

        var midnightLocalTime = date;
        midnightLocalTime.setHours(0, 0, 0, 0);
        var utcDate = new Date(midnightLocalTime.getTime() + midnightLocalTime.getTimezoneOffset() * 60 * 1000);
        return utcDate.getFullYear() + "-" +
            ('0' + (utcDate.getMonth() + 1)).substr(-2) + "-" +
            ('0' + utcDate.getDate()).substr(-2) + "T" +
            ('0' + utcDate.getHours()).substr(-2) + ":00:00Z";
    }
}
