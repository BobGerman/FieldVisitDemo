import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'FieldVisitTabWebPartStrings';
import { IFieldVisitsProps, FieldVisits }
  from './components/FieldVisits';

import ServiceFactory from './services/ServiceFactory';

export interface IFieldVisitTabWebPartProps {
  groupName: string;
  groupId: string;
  teamId: string;
  channelId: string;
}

export default class FieldVisitTabWebPart extends BaseClientSideWebPart<IFieldVisitTabWebPartProps> {

  private teamsContext: microsoftTeams.Context;
  private groupName: string;
  private groupId: string;
  private channelId: string;

  protected onInit(): Promise<any> {
    let retVal: Promise<any> = Promise.resolve();
    if (this.context.microsoftTeams) {
      retVal = new Promise((resolve, reject) => {
        this.context.microsoftTeams.getContext(context => {
          this.teamsContext = context;
          this.groupName = context.teamName;
          this.groupId = context.groupId;
          this.channelId = context.channelId;
          resolve();
        });
      });
    } else {
      this.groupName = this.properties.groupName;
      this.groupId = this.properties.groupId;
      this.channelId = this.properties.channelId;
    }
    return retVal;
  }

  public render(): void {

    const visitService = ServiceFactory.getVisitService(
      Environment.type, this.context, this.context.serviceScope
    );
    const weatherService = ServiceFactory.getWeatherService(
      Environment.type, this.context, this.context.serviceScope);

    const mapService = ServiceFactory.getMapService(
      Environment.type, this.context, this.context.serviceScope);
      
    const documentService = ServiceFactory.getDocumentService(
      Environment.type, this.context, this.context.serviceScope
    );
    const activityService = ServiceFactory.getActivityService(
      Environment.type, this.context, this.context.serviceScope
    );
    const conversationService = ServiceFactory.getConversationService(
      Environment.type, this.context, this.context.serviceScope,
      this.properties.teamId, this.properties.channelId
    );
    const photoService = ServiceFactory.getPhotoService(
      Environment.type, this.context, this.context.serviceScope
    );


    const element: React.ReactElement<IFieldVisitsProps> = React.createElement(
      FieldVisits,
      {
        groupName: this.groupName,
        groupId: this.groupId,
        visitService: visitService,
        weatherService: weatherService,
        mapService: mapService,
        documentService: documentService,
        activityService: activityService,
        conversationService: conversationService,
        photoService: photoService,
        currentUserEmail: this.context.pageContext.user.email
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('groupName', {
                  label: strings.GroupNameLabel
                }),
                PropertyPaneTextField('groupId', {
                  label: strings.GroupIdLabel
                }),
                PropertyPaneTextField('channelId', {
                  label: strings.ChannelIdLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
