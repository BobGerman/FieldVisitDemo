import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'FieldVisitTabWebPartStrings';
import FieldVisitTab from './components/FieldVisitTab';
import { IFieldVisitTabProps } from './components/IFieldVisitTabProps';

export interface IFieldVisitTabWebPartProps {
  description: string;
}

export default class FieldVisitTabWebPart extends BaseClientSideWebPart<IFieldVisitTabWebPartProps> {

  private _teamsContext: microsoftTeams.Context;
  
  protected onInit(): Promise<any> {
    let retVal: Promise<any> = Promise.resolve();
    if (this.context.microsoftTeams) {
      retVal = new Promise((resolve, reject) => {
        this.context.microsoftTeams.getContext(context => {
          this._teamsContext = context;
          resolve();
        });
      });
    }
    return retVal;
  }

  public render(): void {

    const element: React.ReactElement<IFieldVisitTabProps> = React.createElement(
      FieldVisitTab,
      {
        description: this._teamsContext ? "Hi, I'm a tab!" : "Hi, I'm a web part!"
        // this.properties.description
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
