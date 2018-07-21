import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './FieldVisits.module.scss';

import { IVisit } from '../model/IVisit';

export interface IVisitListProps {
    visits: IVisit[];
    selectedVisit: IVisit;
    visitSelectionChanged: (IVisit) => {};
}
  
export class VisitList extends React.Component<IVisitListProps, {}> {

  public render(): React.ReactElement<IVisitListProps> {

    var summary = "";
    this.props.visits.forEach(visit => {
      summary += `${visit.calendarItem.Title}: ${visit.customer.CompanyName}`;
    });
  
    return (
      <div className={ styles.fieldVisits }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>VisitList</span>
              <p className={ styles.subTitle }>{summary}</p>
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