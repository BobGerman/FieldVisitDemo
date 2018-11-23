import { IWeatherService } from './IWeatherService';
import { IWeatherConditions } from '../../model/IWeatherConditions';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';

export default class WeatherService implements IWeatherService {

    private context: IWebPartContext;
    private serviceScope: ServiceScope;
    private owmApiKey: string;
    constructor(context: IWebPartContext, serviceScope: ServiceScope, owmApiKey: string) {
        this.context = context;
        this.serviceScope = serviceScope;
        this.owmApiKey = owmApiKey;
    }

    public getConditions (zip: string) : Promise<IWeatherConditions> {
        
        var result: Promise<IWeatherConditions> = new Promise<IWeatherConditions>
            ((resolve, reject) => {

            this.context.httpClient
            .fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${this.owmApiKey}`,
                    HttpClient.configurations.v1,
                    {
                        method: 'GET',
                        headers: {"accept": "application/json"},
                        mode: 'cors',
                        cache: 'default'
                    })
            .then ((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw (`Error ${response.status}: ${response.statusText}`);
                }
            })
            .then ((o: IWeatherConditions) => {
                resolve(o);
            });
            // TODO: Handle exception
        });
        return result;
    }
}
