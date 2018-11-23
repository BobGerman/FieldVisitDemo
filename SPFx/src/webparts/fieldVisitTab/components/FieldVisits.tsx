import * as React from 'react';
import styles from './FieldVisits.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { IVisitService } from '../services/VisitService/IVisitService';
import { IWeatherService } from '../services/WeatherService/IWeatherService';
import { IMapService } from '../services/MapService/IMapService';
import { IDocumentService } from '../services/DocumentService/IDocumentService';
import { IActivityService } from '../services/ActivityService/IActivityService';
import { IConversationService } from '../services/ConversationService/IConversationService';
import { IPhotoService } from '../services/PhotoService/IPhotoService';

import { IVisit } from '../model/IVisit';
import { IUser } from '../model/IUser';

import { UserTabs } from './UserTabs';
import { VisitList } from './VisitList';
import { CompanyInfo } from './CompanyInfo';
import { Weather } from './Weather';
import { Map } from './Map';
import { Documents } from './Documents';
import { Activities } from './Activities';
import { PostToChannel } from './PostToChannel';
import { Photos } from './Photos';

export interface IFieldVisitsProps {
  visitService: IVisitService;
  weatherService: IWeatherService;
  mapService: IMapService;
  documentService: IDocumentService;
  activityService: IActivityService;
  conversationService: IConversationService;
  photoService: IPhotoService;
  currentUserEmail: string;
  groupName: string;
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

  constructor(props: IFieldVisitsProps) {
    super(props);
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
      this.props.visitService.getGroupVisits(this.props.groupId, this.props.groupName)
        .then((visits) => {
          var u = this.getUsersFromVisits(visits);
          var fv = this.filterVisitsBySelectedUsers(visits, u);
          this.setState({
            users: u,
            allVisits: visits,
            filteredVisits: fv,
            selectedVisit: null,
            dataFetched: true
          });
        });
    }

    if (this.state.dataFetched) {

      let address: string = null;
      let city: string = null;
      let state: string = null;
      let country: string = null;
      let postalCode: string = null;
      let customerId: string = null;
      let customerName: string = null;
      if (this.state.selectedVisit && this.state.selectedVisit.customer) {
        address = this.state.selectedVisit.customer.Address;
        city = this.state.selectedVisit.customer.City;
        state = this.state.selectedVisit.customer.Region;
        country = this.state.selectedVisit.customer.Country;
        postalCode = this.state.selectedVisit.customer.PostalCode;
        customerId = this.state.selectedVisit.customer.CustomerID;
        customerName = this.state.selectedVisit.customer.CompanyName;
      }

      return (

        <div className={styles.fieldVisits}>
          <div className={styles.fieldVisitsRow}>
            <div className={styles.fieldVisitsLeftColumn}>
              <UserTabs users={this.state.users}
                userSelectionChanged={this.handleUserSelectionChanged.bind(this)}
              />
              <VisitList visits={this.state.filteredVisits}
                selectedVisit={this.state.selectedVisit}
                visitSelectionChanged={this.handleVisitSelectionChanged.bind(this)}
              />
              <Activities service={this.props.activityService}
                customerId={customerId} />
              <Documents service={this.props.documentService}
                customerId={customerId} />
              <Photos service={this.props.photoService}
                customerId={customerId} />
            </div>
            <div className={styles.fieldVisitsRightColumn}>
              <Weather service={this.props.weatherService}
                country={country} postalCode={postalCode} />
              <CompanyInfo visit={this.state.selectedVisit} />
              <PostToChannel customerId={customerId}
                customerName={customerName}
                address={address}
                city={city}
                state={state}
                country={country}
                postalCode={postalCode}
                conversationService={this.props.conversationService} />
              <Map service={this.props.mapService}
                address={address} city={city} state={state}
                country={country} postalCode={postalCode} />
            </div>
          </div>
        </div>
      );
    } else {
      return (<div>Loading...</div>);
    }
  }

  private handleUserSelectionChanged(user: IUser) {
    var oldUsers = this.state.users;
    var newUsers: IUser[] = [];
    // ** use this code to allow only one user to be selected **
    oldUsers.forEach((u) => {
      let newUser = u;
      newUser.isSelected = u.email == user.email;
      newUsers.push(newUser);
    });
    // ** use this code to allow multuple users to be selected **
    // oldUsers.forEach((u) => {
    //   let newUser = u;
    //   if (u.email == user.email) {
    //     newUser.isSelected = !u.isSelected;
    //   }
    //   newUsers.push(newUser);
    // });
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
            (result.filter((i: IUser) => (i.email == attendee.email)).length == 0)) {
            result.push({
              fullName: attendee.fullName,
              email: attendee.email,
              isSelected: attendee.email == this.props.currentUserEmail
            });
          }
        });
      }
    });

    return result.sort((a, b) => (a.fullName < b.fullName ? -1 : 1));
  }
}
