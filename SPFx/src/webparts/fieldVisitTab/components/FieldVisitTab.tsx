import * as React from 'react';
import styles from './FieldVisitTab.module.scss';
import { IFieldVisitTabProps } from './IFieldVisitTabProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class FieldVisitTab extends React.Component<IFieldVisitTabProps, {}> {
  public render(): React.ReactElement<IFieldVisitTabProps> {
    return (
      <div className={ styles.fieldVisitTab }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{this.props.description}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
