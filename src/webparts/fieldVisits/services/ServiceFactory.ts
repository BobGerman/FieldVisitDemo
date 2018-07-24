import { IVisitService } from './VisitService/IVisitService';
import VisitService from './VisitService/VisitService';
import { ICustomerService } from './CustomerService/ICustomerService';
import  CustomerService  from './CustomerService/CustomerService';
import  CustomerServiceMock  from './CustomerService/CustomerServiceMock';
import { ICalendarService } from './CalendarService/ICalendarService';
import CalendarService from './CalendarService/CalendarService';
import CalendarServiceMock from './CalendarService/CalendarServiceMock';

import { EnvironmentType } from '@microsoft/sp-core-library';

export default class ServiceFactory {

    public static getVisitService(environmentType: EnvironmentType) : IVisitService {

        var calendarService: ICalendarService;
        var customerService: ICustomerService;

        if (environmentType === EnvironmentType.Local) {
            calendarService = new CalendarServiceMock();
            customerService = new CustomerServiceMock();
        } else {
            calendarService = new CalendarService();
            customerService = new CustomerService();
        }

        return new VisitService(calendarService, customerService);

    }
}