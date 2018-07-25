import * as React from 'react';
import styles from './FieldVisits.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { IVisitService } from '../services/VisitService/IVisitService';

import { IVisit } from '../model/IVisit';
import { IUser } from '../model/IUser';

import { UserTabs } from './UserTabs';
import { VisitList } from './VisitList';
import { CompanyInfo } from './CompanyInfo';

export interface IFieldVisitsProps {
  visitService: IVisitService;
  currentUserEmail: string;
  groupEmail: string;
  groupId: string;
}

export interface IFieldVisitsState {
  dataFetched?: boolean;
  users?: IUser[];
  allVisits?: IVisit[];
  filteredVisits?: IVisit[];
  selectedVisit?: IVisit;
}

export class FieldVisits extends React.Component<IFieldVisitsProps, IFieldVisitsState> {

  constructor() {
    super();
    this.state = {
      dataFetched: false,
      users: [],
      allVisits: [],
      filteredVisits: [],
      selectedVisit: null   // NOTE If defined, selectedVisit should reference a member of visits[]
    };
  }

  public render(): React.ReactElement<IFieldVisitsProps> {

    if (!this.state.dataFetched) {
      this.props.visitService.getGroupVisits(this.props.groupId, this.props.groupEmail)
      .then ((visits) => {
        var u = this.getUsersFromVisits(visits);
        var fv = this.filterVisitsBySelectedUsers(visits, u);
        this.setState ({
          users: u,
          allVisits: visits,
          filteredVisits: fv,
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
        <VisitList visits={this.state.filteredVisits}
                  selectedVisit={this.state.selectedVisit}
                  visitSelectionChanged={this.handleVisitSelectionChanged.bind(this)}
        />
        <CompanyInfo visit={this.state.selectedVisit} />
      </div>
    );
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
    var fv = this.filterVisitsBySelectedUsers(this.state.allVisits, newUsers);
    var sv = fv.filter((v) => (v == this.state.selectedVisit)).length > 0 ?
              this.state.selectedVisit : null;
    this.setState({
      users: newUsers,
      filteredVisits: fv,
      selectedVisit: sv
    });
  }

  private handleVisitSelectionChanged(visit: IVisit) {
    this.setState({
      selectedVisit: visit
    });
  }

  private filterVisitsBySelectedUsers(visits: IVisit[], users: IUser[]): IVisit[] {
    var result: IVisit[] = [];

    visits.forEach((visit) => {
      let showVisit = false;
      visit.calendarItem.Attendees.forEach((attendee) => {
        if (users.filter((u) => (u.isSelected && u.email == attendee.email)).length > 0) {
          showVisit = true;
        }
      });
      if (showVisit) {
        result.push(visit);
      }
    });

    return result;
  }

  private getUsersFromVisits(visits: IVisit[]) {

    var result: IUser[] = [];
    visits.forEach((visit) => {
      if (visit.calendarItem.Attendees) {
        visit.calendarItem.Attendees.forEach((attendee) => {
          if ((attendee.email != "?? GROUP EMAIL ??") &&
              (result.filter((i:IUser) => (i.email == attendee.email)).length == 0)) {
                result.push({
                  fullName: attendee.fullName,
                  email: attendee.email,
                  isSelected: attendee.email == this.props.currentUserEmail
                });
             }
        });
      }
    });

    return result.sort((a,b) => (a.fullName < b.fullName ? -1 : 1));
  }
}
