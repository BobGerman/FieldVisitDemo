import { ICustomer } from './ICustomer';

export interface IVisit {
    title: string;
    dateTime: Date;
    location: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    customer: ICustomer;
}