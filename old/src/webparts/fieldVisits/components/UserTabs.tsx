import * as React from 'react';
import { escape, isEmpty } from '@microsoft/sp-lodash-subset';
import styles from './FieldVisits.module.scss';

import { IUser } from '../model/IUser';

import { List, IListProps } from 'office-ui-fabric-react/lib/List';

export interface IUserTabsProps {
  users: IUser[];
  userSelectionChanged: (IUser) => {};
}

export class UserTabs extends React.Component<IUserTabsProps, {}> {

  public render(): React.ReactElement<IUserTabsProps> {

    return (
      <ul className={styles.userTabs}>
        {this.props.users.map(user => (
          <li className={user.isSelected ? styles.userTab + " " + styles.userTabSelected :
                         styles.userTab}
               onClick={ () => { this.props.userSelectionChanged(user); }} >
                 {user.fullName}
          </li>
        )) }
      </ul>
    );
  }

}  