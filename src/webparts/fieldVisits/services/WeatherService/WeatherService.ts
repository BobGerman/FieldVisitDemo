import { IWeatherService } from './IWeatherService';
import { ICustomer } from '../../model/ICustomer';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';
import { IWeatherConditions } from '../../model/IWeatherConditions';


export default class WeatherService implements IWeatherService {

    private context: IWebPartContext;
    private serviceScope: ServiceScope;
    constructor(context: IWebPartContext, serviceScope: ServiceScope) {
        this.context = context;
        this.serviceScope = serviceScope;
    }

    public getConditions (zip: string) : Promise<IWeatherConditions> {
        
        var result: Promise<IWeatherConditions> = new Promise<IWeatherConditions>
            ((resolve, reject) => {
                resolve(null);
            });

            // public getCustomer(customerID: string): Promise<ICustomer> {

    //     var result: Promise<ICustomer> = new Promise<ICustomer> 
    //         ((resolve, reject) => {

    //             this.context.httpClient
    //             .fetch(`https://services.odata.org/V3/Northwind/Northwind.svc/Customers?$filter=CustomerID eq '${customerID}'`,
    //                    HttpClient.configurations.v1,
    //                    {
    //                        method: 'GET',
    //                        headers: {"accept": "application/json"},
    //                        mode: 'cors',
    //                        cache: 'default'
    //                    })
    //             .then ((response) => {
    //                 if (response.ok) {
    //                     return response.json();
    //                 } else {
    //                     throw (`Error ${response.status}: ${response.statusText}`);
    //                 }
    //             })
    //             // TODO: Kill the any
    //             .then ((o: any) => {
    //                 resolve(o.value[0]);
    //             });
    //             // TODO: Handle exception
    //         });
        return result;
    }
}
