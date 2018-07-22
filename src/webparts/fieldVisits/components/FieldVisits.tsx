import * as React from 'react';
import styles from './FieldVisits.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { IVisitService } from '../services/VisitService/IVisitService';

import { IVisit } from '../model/IVisit';

import { VisitList } from './VisitList';

export interface IFieldVisitsProps {
  description: string;
  visitService: IVisitService;
}

export interface IFieldVisitsState {
  visitsFetched?: boolean;
  visits?: IVisit[];
  selectedVisit?: IVisit;
}

export class FieldVisits extends React.Component<IFieldVisitsProps, IFieldVisitsState> {

  constructor() {
    super();
    this.state = {
      visitsFetched: false,
      visits: [],
      selectedVisit: null   // NOTE If defined, selectedVisit should reference a member of visits[]
    };
  }

  public render(): React.ReactElement<IFieldVisitsProps> {

    if (!this.state.visitsFetched) {
      this.props.visitService.getMyVisits()
      .then ((visits) => {
        this.setState ({
          visits: visits,
          selectedVisit: visits[1],
          visitsFetched: true
        });
      });
    }

    return (

      <VisitList visits={this.state.visits}
                 selectedVisit={this.state.selectedVisit}
                 visitSelectionChanged={this.handleSelectionChanged.bind(this)}
      />
    );
  }

  private handleSelectionChanged(visit: IVisit) {
    this.setState({
      selectedVisit: visit
    });
  }
}
