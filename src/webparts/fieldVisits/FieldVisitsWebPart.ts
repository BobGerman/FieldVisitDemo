import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'FieldVisitsWebPartStrings';
import { IFieldVisitsProps, FieldVisits }
  from './components/FieldVisits';

import ServiceFactory from './services/ServiceFactory';

export interface IFieldVisitsWebPartProps {
  groupEmail: string;
  groupId: string;
}

export default class FieldVisitsWebPart extends BaseClientSideWebPart<IFieldVisitsWebPartProps> {

  public render(): void {

    const visitService = ServiceFactory.getVisitService(
      Environment.type, this.context, this.context.serviceScope
    );
    const weatherService = ServiceFactory.getWeatherService(
      Environment.type, this.context, this.context.serviceScope
    );

    const element: React.ReactElement<IFieldVisitsProps > = React.createElement(
      FieldVisits,
      {
        groupEmail: this.properties.groupEmail,
        groupId: this.properties.groupId,
        visitService: visitService,
        weatherService: weatherService,
        currentUserEmail: this.context.pageContext.user.email
      }
    );

    ReactDom.render(element, this.domElement);
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
                PropertyPaneTextField('groupEmail', {
                  label: strings.GroupEmailLabel
                }),
                PropertyPaneTextField('groupId', {
                  label: strings.GroupIdLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
