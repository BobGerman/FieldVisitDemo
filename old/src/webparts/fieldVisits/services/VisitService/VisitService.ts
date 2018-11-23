import { IVisitService } from './IVisitService';
import { IVisit } from '../../model/IVisit';
import { ICalendarService } from '../CalendarService/ICalendarService';
import CalendarServiceMock from '../CalendarService/CalendarServiceMock';
import { ICustomerService } from '../CustomerService/ICustomerService';
import CustomerService from '../CustomerService/CustomerServiceMock';
import CustomerServiceMock from '../CustomerService/CustomerServiceMock';

export default class VisitService implements IVisitService {

    private calendarService: ICalendarService;
    private customerService: ICustomerService;
    constructor (calendarService: ICalendarService,
                 customerService: ICustomerService) {
            
           this.calendarService = calendarService;
           this.customerService = customerService;

        }


    public getGroupVisits(groupId: string, groupEmail: string) {

        return new Promise<IVisit[]>((resolve, reject) => {

            this.calendarService.getGroupCalendarItems(groupId, groupEmail)
            .then((calendarItems) => {
                var items: IVisit[] = new Array<IVisit>();
                let outstandingPromises = 0;
    
                calendarItems.forEach(element => {
        
                    // Parse title looking for customer ID
                    let regex = /\(([^)]+)\)/;
                    let matches = regex.exec(element.Title);
                    if (matches.length > 1)
                    {
                        // If here, we found a potential customer ID
                        let customerId = matches[1];
                        outstandingPromises++;
                        this.customerService.getCustomer(customerId)
                        .then((customer) => {
                            if (customer) {
                                // If here, we found an actual customer; add it to the list
                                items.push({
                                    calendarItem: element,
                                    customer: customer
                                });
                            }
                            if (!--outstandingPromises) {
                                resolve(items.sort((i,j) =>
                                    (i.calendarItem.DateTime.getTime() -
                                     j.calendarItem.DateTime.getTime())));
                            }
                        });
                    }
                });
            });

        });
    }
}
