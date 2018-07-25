import * as React from 'react';
import { escape, isEmpty } from '@microsoft/sp-lodash-subset';
import styles from './FieldVisits.module.scss';

import { IWeatherService } from '../services/WeatherService/IWeatherService';
import { IWeatherConditions, IWeather } from '../model/IWeatherConditions';

export interface IWeatherProps {
    service: IWeatherService;
    country: string;
    postalCode: string;
}

export interface IWeatherState {
    conditions: IWeatherConditions;
}

export class Weather extends React.Component<IWeatherProps, IWeatherState> {

    constructor() {
        super();
        this.state = {
            conditions: null
        };
    }

    public render(): React.ReactElement<IWeatherProps> {

        if (this.props.country &&
            this.props.country.toLowerCase() == "usa" &&
            this.props.postalCode) {

            if (this.state.conditions) {
                
                const c = this.state.conditions;
                const tempC = c.main.temp-273;
                const tempF = Math.round(9/5*tempC+32);

                return (
                <div className={styles.weather}>
                  <div className={styles.weatherContainer}>
                    <div className={styles.weatherrow}>
                      <div className={styles.weathercolumn + ' ' + styles.weatherTemp}>
                        {tempF}&deg; F
                      </div>
                      <div className={styles.weathercolumn}>
                        <img src='http://openweathermap.org/img/w/10d.png' />
                         Weather for {this.props.postalCode} goes here!
                      </div>
                    </div>
                  </div>
                </div>);
            } else {
                this.props.service.getConditions(this.props.postalCode)
                    .then((conditions: IWeatherConditions) => {
                        this.setState({
                            conditions: conditions
                        });
                    });

                return (<div>Loading</div>);
            }
        } else {
            return (
                <div>No visit selected</div>
            );
        }
    }
}