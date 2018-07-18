import { IVisitService } from './VisitService/IVisitService';
import VisitService from './VisitService/VisitService';
import { ICustomerService } from './CustomerService/ICustomerService';
import  CustomerServiceMock  from './CustomerService/CustomerServiceMock';
import { ICalendarService } from './CalendarService/ICalendarService';
import CalendarServiceMock from './CalendarService/CalendarServiceMock';

import { EnvironmentType } from '@microsoft/sp-core-library';
import { ICustomer } from '../../../../lib/webparts/fieldVisits/model/ICustomer';

export default class ServiceFactory {

    public static getVisitService(environmentType: EnvironmentType) : IVisitService {

        var calendarService: ICalendarService;
        var customerService: ICustomerService;

        if (environmentType === EnvironmentType.Local) {
            calendarService = new CalendarServiceMock();
            customerService = new CustomerServiceMock();
        } else {
            calendarService = new CalendarServiceMock();
            customerService = new CustomerServiceMock();
        }

        return new VisitService(calendarService, customerService);

    }
}