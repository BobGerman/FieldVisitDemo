import { IVisitService } from './IVisitService';
import VisitServiceMock from './VisitServiceMock';

import { EnvironmentType } from '@microsoft/sp-core-library';

export class CalendarServiceFactory {
    public static getService(environmentType: EnvironmentType) : IVisitService {

        if (environmentType === EnvironmentType.Local) {
            return new VisitServiceMock();
        } else {
            return new VisitServiceMock();
        }
    }
}