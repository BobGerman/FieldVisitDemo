import { INewChatThread, ContentType } from '../../model/IConversation';
import { IConversationService } from '../../services/ConversationService/IConversationService';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { MSGraphClient } from '@microsoft/sp-client-preview';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

export default class ConversationServiceTeams implements IConversationService {

    private context: IWebPartContext;
    private serviceScope: ServiceScope;
    private teamId: string;
    private channelId: string;

    constructor(context: IWebPartContext, serviceScope: ServiceScope,
                teamId: string, channelId: string) {
        this.context = context;
        this.serviceScope = serviceScope;
        this.teamId = teamId;
        this.channelId = channelId;
    }

    public createChatThread(content: string, contentType: ContentType) {

        const graphClient: MSGraphClient =
            this.serviceScope.consume(MSGraphClient.serviceKey);

        const result = new Promise<void>((resolve, reject) => {

            const postContent: INewChatThread =
            {
                rootMessage: {
                    body: {
                        content: content,
                        contentType: contentType
                    }
                }
            };

            graphClient.api(`https://graph.microsoft.com/beta/teams/${this.teamId}/channels/${this.channelId}/chatThreads`)
            .post(postContent, ((err, res) => {
                resolve();
            }));

        });
        
        return result;
    }
}

