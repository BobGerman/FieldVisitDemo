import { ICustomerService } from './ICustomerService';
import CustomerServiceMock from './CustomerServiceMock';

import { EnvironmentType } from '@microsoft/sp-core-library';

export class CustomerServiceFactory {
    public static getService(environmentType: EnvironmentType) : ICustomerService {

        if (environmentType === EnvironmentType.Local) {
            return new CustomerServiceMock();
        } else {
            return new CustomerServiceMock();
        }
    }
}