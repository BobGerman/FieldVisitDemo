import * as React from 'react';
import styles from '../FieldVisits.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { IVisitService } from '../../services/VisitService/IVisitService';

import { ICustomer } from '../../model/ICustomer';
import { IVisit } from '../../model/IVisit';

export interface IFieldVisitsProps {
  description: string;
  visitService: IVisitService;
}

export interface IFieldVisitsState {
  visitsFetched: boolean;
  visits: IVisit[];
  selectedVisit: IVisit;
}

export class FieldVisits extends React.Component<IFieldVisitsProps, IFieldVisitsState> {

  constructor() {
    super();
    this.state = {
      visitsFetched: false,
      visits: [],
      selectedVisit: null
    };
  }

  public render(): React.ReactElement<IFieldVisitsProps> {

    if (!this.state.visitsFetched) {
      this.props.visitService.getMyVisits()
      .then ((visits) => {
        this.setState ({
          visits: visits,
          visitsFetched: true
        });
      });
    }

    var summary = "";
    this.state.visits.forEach(visit => {
      summary += `${visit.calendarItem.Title}: ${visit.customer.CompanyName}`;
    });

    
    return (
      <div className={ styles.fieldVisits }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>{summary}</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
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
