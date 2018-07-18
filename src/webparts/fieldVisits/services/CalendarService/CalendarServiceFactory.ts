import { ICalendarService } from './ICalendarService';
import CalendarServiceMock from './CalendarServiceMock';

import { EnvironmentType } from '@microsoft/sp-core-library';

export class CalendarServiceFactory {
    public static getService(environmentType: EnvironmentType) : ICalendarService {

        if (environmentType === EnvironmentType.Local) {
            return new CalendarServiceMock();
        } else {
            return new CalendarServiceMock();
        }
    }
}