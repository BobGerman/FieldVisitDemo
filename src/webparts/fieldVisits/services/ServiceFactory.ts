import { IVisitService } from './VisitService/IVisitService';
import VisitService from './VisitService/VisitService';
import { ICustomerService } from './CustomerService/ICustomerService';
import CustomerService from './CustomerService/CustomerService';
import CustomerServiceMock from './CustomerService/CustomerServiceMock';
import { ICalendarService } from './CalendarService/ICalendarService';
import CalendarService from './CalendarService/CalendarService';
import CalendarServiceMock from './CalendarService/CalendarServiceMock';
import { IWeatherService } from './WeatherService/IWeatherService';
import WeatherService from './WeatherService/WeatherService';
import WeatherServiceMock from './WeatherService/WeatherServiceMock';
import { IMapService } from './MapService/IMapService';
import MapService from './MapService/MapService';
import MapServiceMock from './MapService/MapServiceMock';
import { IDocumentService } from './DocumentService/IDocumentService';
import DocumentService from './DocumentService/DocumentService';
import DocumentServiceMock from './DocumentService/DocumentServiceMock';
import { IActivityService } from './ActivityService/IActivityService';
import ActivityServiceMock from './ActivityService/ActivityServiceMock';
import { IConversationService } from './ConversationService/IConversationService';
import ConversationServiceMock from './ConversationService/ConversationServiceMock';
import ConversationServiceTeams from './ConversationService/ConversationServiceTeams';
import { IPhotoService } from './PhotoService/IPhotoService';
import PhotoServiceMock from './PhotoService/PhotoServiceMock';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { EnvironmentType } from '@microsoft/sp-core-library';

export default class ServiceFactory {

    public static getVisitService(
        environmentType: EnvironmentType,
        context: IWebPartContext,
        serviceScope: ServiceScope): IVisitService {

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

    public static getWeatherService(
        environmentType: EnvironmentType,
        context: IWebPartContext,
        serviceScope: ServiceScope,
        owmApiKey: string): IWeatherService {

            return (environmentType === EnvironmentType.Local) ?
                new WeatherServiceMock() :
                new WeatherService(context, serviceScope, owmApiKey);
    }

    public static getMapService(
        environmentType: EnvironmentType,
        context: IWebPartContext,
        serviceScope: ServiceScope,
        mapApiKey: string): IMapService {

        return (environmentType === EnvironmentType.Local) ?
            new MapServiceMock(mapApiKey) :
            new MapService(context, serviceScope, mapApiKey);
    }

    public static getDocumentService(
        environmentType: EnvironmentType,
        context: IWebPartContext,
        serviceScope: ServiceScope): IDocumentService {

        return (environmentType === EnvironmentType.Local) ?
            new DocumentServiceMock() :
            new DocumentService(context, serviceScope);
    }

    public static getActivityService(
        environmentType: EnvironmentType,
        context: IWebPartContext,
        serviceScope: ServiceScope): IActivityService {

        return (environmentType === EnvironmentType.Local) ?
            new ActivityServiceMock() :
            new ActivityServiceMock();
    }

    public static getConversationService(
        environmentType: EnvironmentType,
        context: IWebPartContext,
        serviceScope: ServiceScope,
        teamId: string,
        channelId: string): IConversationService {

        return (environmentType === EnvironmentType.Local) ?
            new ConversationServiceMock() :
            new ConversationServiceTeams(context, serviceScope, teamId, channelId);
    }

    public static getPhotoService(
        environmentType: EnvironmentType,
        context: IWebPartContext,
        serviceScope: ServiceScope): IPhotoService {

        return (environmentType === EnvironmentType.Local) ?
            new PhotoServiceMock() :
            new PhotoServiceMock();
    }
}