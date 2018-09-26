import { IPhotoService } from './IPhotoService';
import { IPhotosResponse } from './IPhotosResponse';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export default class PhotoService implements IPhotoService {

    private context: IWebPartContext;
    private serviceScope: ServiceScope;
    constructor(context: IWebPartContext, serviceScope: ServiceScope) {
        this.context = context;
        this.serviceScope = serviceScope;
    }

    public getPhotos(customerId: string): Promise<string[]> {

        var result = new Promise<string[]>((resolve, reject) => {

            const absoluteUrl = this.context.pageContext.web.absoluteUrl;
            const serverRelativeUrl = this.context.pageContext.web.serverRelativeUrl;

            this.context.spHttpClient
                .fetch(`${absoluteUrl}/_api/web/GetFolderByServerRelativeUrl('${serverRelativeUrl}/Photos/${customerId}')/Files`,
                    SPHttpClient.configurations.v1,
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
                .then((o: IPhotosResponse) => {
                    let files: string[] = [];
                    o.value.forEach((file) => {
                        files.push(file.ServerRelativeUrl);
                    });
                    resolve(files);
                });
            // TODO: Handle exception

        });

        return result;
    }

}
