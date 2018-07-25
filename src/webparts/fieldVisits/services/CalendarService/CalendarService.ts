import { ICalendarService } from './ICalendarService';
import { ICalendarItem } from '../../model/ICalendarItem';
import { IUser } from '../../model/IUser';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { MSGraphClient } from '@microsoft/sp-client-preview';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
interface CalendarView { value: MicrosoftGraph.Event[]; }

export default class CalendarService implements ICalendarService {

    private context: IWebPartContext;
    private serviceScope: ServiceScope;
    constructor(context: IWebPartContext, serviceScope: ServiceScope) {
        this.context = context;
        this.serviceScope = serviceScope;
    }

    public getGroupCalendarItems(groupId: string, groupEmail: string) {

        const graphClient: MSGraphClient =
            this.serviceScope.consume(MSGraphClient.serviceKey);

        var result = new Promise<ICalendarItem[]>((resolve, reject) => {

            graphClient.api(`/groups/${groupId}/calendarview?startdatetime=2018-07-22T01:04:38.644Z&enddatetime=2018-07-31T01:04:38.644Z`)
            .get((error, data: CalendarView, rawResponse?: any) => {

                let calendarItems :ICalendarItem[] = [];
                data.value.forEach((event) => {

                    if (event.attendees) {

                        let attendees: IUser[] = [];
                        event.attendees.forEach((user) => {
                            if (user.emailAddress.address.toLowerCase() !=
                             groupEmail.toLowerCase()) {
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

            } );

        });

        return result;
    }
}
