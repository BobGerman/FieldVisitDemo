import * as React from 'react';
import { escape, isEmpty } from '@microsoft/sp-lodash-subset';
import styles from './FieldVisits.module.scss';

import { IVisit } from '../model/IVisit';

import { List, IListProps } from 'office-ui-fabric-react/lib/List';

export interface IVisitListProps {
  visits: IVisit[];
  selectedVisit: IVisit;
  visitSelectionChanged: (IVisit) => {};
}

export class VisitList extends React.Component<IVisitListProps, {}> {

  public render(): React.ReactElement<IVisitListProps> {

    return (
      <div className={styles.visitList}>
        {this.props.visits.map(item => (
          <div className={ (item == this.props.selectedVisit) ?
                            styles.visitListRow + ' ' + styles.visitListRowSelected : styles.visitListRow }
               onClick={ () => {this.props.visitSelectionChanged(item) }}
          >
            <div className={styles.visitListDateColumn}>
              <div className={styles.visitListTime}>
                {item.calendarItem.DateTime.getHours() % 12}:
                {item.calendarItem.DateTime.getMinutes()<10 ? "0" : ""}
                {item.calendarItem.DateTime.getMinutes()}&nbsp;
                {item.calendarItem.DateTime.getHours() < 12 ? 'am' : 'pm'}
              </div>
              <div className={styles.visitListDate}>
                {item.calendarItem.DateTime.toDateString()}
              </div>
            </div>
            <div className={styles.visitListDetailColumn}>
              <div className={styles.visitListTitle}>{item.calendarItem.Title}</div>
              <div className={styles.visitListContact}>
                {item.customer.CompanyName}&nbsp;
                ({item.customer.ContactName})
              </div>
              <div className={styles.visitListLocation}>{item.calendarItem.Location}</div>
            </div>
          </div>
        )) }
      </div>
    );
  }

}  