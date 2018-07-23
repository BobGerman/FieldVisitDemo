import * as React from 'react';
import styles from './FieldVisits.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { IVisitService } from '../services/VisitService/IVisitService';

import { IVisit } from '../model/IVisit';
import { IUser } from '../model/IUser';

import { UserTabs } from './UserTabs';
import { VisitList } from './VisitList';

export interface IFieldVisitsProps {
  description: string;
  visitService: IVisitService;
}

export interface IFieldVisitsState {
  dataFetched?: boolean;
  users?: IUser[]
  visits?: IVisit[];
  selectedVisit?: IVisit;
}

export class FieldVisits extends React.Component<IFieldVisitsProps, IFieldVisitsState> {

  constructor() {
    super();
    this.state = {
      dataFetched: false,
      users: [],
      visits: [],
      selectedVisit: null   // NOTE If defined, selectedVisit should reference a member of visits[]
    };
  }

  public render(): React.ReactElement<IFieldVisitsProps> {

    if (!this.state.dataFetched) {
      this.props.visitService.getMyVisits()
      .then ((visits) => {
        this.setState ({
          users: this.getUsersFromVisits(visits),
          visits: visits,
          selectedVisit: null,
          dataFetched: true
        });
      });
    }

    return (

      <div>
        <UserTabs users={this.state.users} 
                  userSelectionChanged={this.handleUserSelectionChanged.bind(this)}
        />
        <VisitList visits={this.state.visits}
                  selectedVisit={this.state.selectedVisit}
                  visitSelectionChanged={this.handleSelectionChanged.bind(this)}
        />
      </div>
    );
  }

  private handleSelectionChanged(visit: IVisit) {
    this.setState({
      selectedVisit: visit
    });
  }

  private handleUserSelectionChanged(user: IUser) {
    var oldUsers = this.state.users;
    var newUsers: IUser[] = [];
    oldUsers.forEach((u) => {
      let newUser = u;
      if (u.email == user.email) {
        newUser.isSelected = !u.isSelected;
      }
      newUsers.push(newUser);
    });
    this.setState({
      users: newUsers
    });
  }

  private getUsersFromVisits(visits: IVisit[]) {

    var result: IUser[] = [];
    visits.forEach((visit) => {
      if (visit.calendarItem.Attendees) {
        visit.calendarItem.Attendees.forEach((attendee) => {
          if ((attendee.email != "?? GROUP EMAIL ??") &&
              (result.filter((i:IUser) => (i.email == attendee.email)).length == 0)) {
                result.push(attendee);
             }
        })
      }
    });

    return result.sort((a,b) => (a.fullName < b.fullName ? -1 : 1));
  }
}
