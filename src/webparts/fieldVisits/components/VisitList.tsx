import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
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

    var summary = "";
    this.props.visits.forEach(visit => {
      summary += `${visit.calendarItem.Title}: ${visit.customer.CompanyName}`;
    });
  
    return (
      <div className={ styles.visitList }>
        <List items={this.props.visits} className={ styles["ms-Grid"]}
              onRenderCell={this.onRenderCell}
        />
      </div>
    );
  }

  
  private onRenderCell(item: IVisit, index: number | undefined): JSX.Element {
    return (
        <div className={ styles.visitListRow }>
          <div className={ styles.visitListDateColumn }>
            <div className={ styles.visitListTime }>
              { '2:00 PM' }
            </div>
            <div className={ styles.visitListDate }>
              {item.calendarItem.DateTime.getDate()}
            </div>
          </div>
          <div className={ styles.visitListDetailColumn }>
            <div className={ styles.visitListTitle }>{item.customer.CompanyName}</div>
            <div className={ styles.visitListLocation }>Date</div>
            <div className={ styles.visitListContact }>Location</div>
          </div>
          <div className={ styles.visitListActionColumn }>
            <div>Open</div>
            <div>Select</div>
          </div>
        </div>
    );
  }
}  