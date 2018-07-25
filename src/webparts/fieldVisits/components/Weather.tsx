import * as React from 'react';
import { escape, isEmpty } from '@microsoft/sp-lodash-subset';
import styles from './FieldVisits.module.scss';

import { IWeatherConditions } from '../model/IWeatherConditions';

export interface IWeatherProps {
  country: string;
  postalCode: string;
}

export class Weather extends React.Component<IWeatherProps, {}> {

  public render(): React.ReactElement<IWeatherProps> {

    if (this.props.country &&
        this.props.country.toLowerCase() == "usa" &&
        this.props.postalCode) {
        return (
            <div>
                Weather for {this.props.postalCode} goes here!
            </div>
        );
    } else {
        return (
            <div>No visit selected</div>
        );
    }

  }
}