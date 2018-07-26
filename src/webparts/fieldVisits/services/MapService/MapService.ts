import { IMapService } from './IMapService';
import { IMapLocation } from '../../model/IMapLocation';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';

export default class MapService implements IMapService {

    private context: IWebPartContext;
    private serviceScope: ServiceScope;
    private mapApiKey: string;
    constructor(context: IWebPartContext, serviceScope: ServiceScope, mapApiKey: string) {
        this.context = context;
        this.serviceScope = serviceScope;
        this.mapApiKey = mapApiKey;
    }

    public getLocation(address: string, city: string, state: string, zip: string):
        Promise<IMapLocation> {

        var result = new Promise<IMapLocation>((resolve, reject) => {
            this.context.httpClient
                .fetch(`http://dev.virtualearth.net/REST/v1/Locations/US/${state}/${zip}/${city}/${address}?key=${this.mapApiKey}`,
                    HttpClient.configurations.v1,
                    {
                        method: 'GET',
                        headers: { "accept": "application/json" },
                        mode: 'cors',
                        cache: 'default'
                    })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw (`Error ${response.status}: ${response.statusText}`);
                    }
                })
                .then((o: IMapLocation) => {
                    resolve(o);
                });
            // TODO: Handle exception

        });

        return result;
    }

    public getMapApiKey(): string {
        return this.mapApiKey;
    }
}
