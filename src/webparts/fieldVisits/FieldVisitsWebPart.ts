import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'FieldVisitsWebPartStrings';
import FieldVisits from './components/FieldVisits';
import { IFieldVisitsProps } from './components/IFieldVisitsProps';

export interface IFieldVisitsWebPartProps {
  description: string;
}

export default class FieldVisitsWebPart extends BaseClientSideWebPart<IFieldVisitsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IFieldVisitsProps > = React.createElement(
      FieldVisits,
      {
        description: this.properties.description
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
