import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'FieldVisitsWebPartStrings';
import { IFieldVisitsProps, FieldVisits }
  from './components/FieldVisits/FieldVisits';

import { IVisit } from './model/IVisit';
import ServiceFactory from './services/ServiceFactory';

export interface IFieldVisitsWebPartProps {
  description: string;
}

export default class FieldVisitsWebPart extends BaseClientSideWebPart<IFieldVisitsWebPartProps> {

  public render(): void {

    const visitService = ServiceFactory.getVisitService(Environment.type);

    const element: React.ReactElement<IFieldVisitsProps > = React.createElement(
      FieldVisits,
      {
        description: this.properties.description,
        visitService: visitService
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
