import { IDocument } from '../../model/IDocument';
import { IDocumentService } from './IDocumentService';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';

export default class DocumentService implements IDocumentService {

    private context: IWebPartContext;
    private serviceScope: ServiceScope;
    constructor(context: IWebPartContext, serviceScope: ServiceScope) {
        this.context = context;
        this.serviceScope = serviceScope;
    }

    public getDocuments(customerId: string):
        Promise<IDocument[]> {

        var result = new Promise<IDocument[]>((resolve, reject) => {
            this.context.httpClient
                .fetch('',
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
                .then((o: IDocument[]) => {
                    // TODO - FIx this mess
                    resolve(o);
                });
            // TODO: Handle exception

        });

        return result;
    }

}
