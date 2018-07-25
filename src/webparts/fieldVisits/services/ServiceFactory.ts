import { IVisitService } from './VisitService/IVisitService';
import VisitService from './VisitService/VisitService';
import { ICustomerService } from './CustomerService/ICustomerService';
import  CustomerService  from './CustomerService/CustomerService';
import  CustomerServiceMock  from './CustomerService/CustomerServiceMock';
import { ICalendarService } from './CalendarService/ICalendarService';
import CalendarService from './CalendarService/CalendarService';
import CalendarServiceMock from './CalendarService/CalendarServiceMock';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { EnvironmentType } from '@microsoft/sp-core-library';

export default class ServiceFactory {

    public static getVisitService(
        environmentType: EnvironmentType,
        context: IWebPartContext,
        serviceScope: ServiceScope) : IVisitService {

        var calendarService: ICalendarService;
        var customerService: ICustomerService;

        if (environmentType === EnvironmentType.Local) {
            calendarService = new CalendarServiceMock();
            customerService = new CustomerServiceMock();
        } else {
            calendarService = new CalendarService(context, serviceScope);
            customerService = new CustomerService(context, serviceScope);
        }

        return new VisitService(calendarService, customerService);

    }
}