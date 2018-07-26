import * as React from 'react';
import { escape, isEmpty } from '@microsoft/sp-lodash-subset';
import styles from './FieldVisits.module.scss';

import { IActivityService } from '../services/ActivityService/IActivityService';
import { IActivity } from '../model/IActivity';

export interface IActivityProps {
    service: IActivityService;
    customerId: string;
}

export interface IActivityState {
    activities: IActivity[];
    currentCustomerId: string;
}

export class Activities extends React.Component<IActivityProps, IActivityState> {

    constructor() {
        super();
        this.state = {
            activities: null,
            currentCustomerId: null
        };
    }

    public render(): React.ReactElement<IActivityProps> {

        if (this.props.customerId) {

            if (this.state.currentCustomerId == this.props.customerId) {

                if (this.state.activities && this.state.activities.length > 0) {
                    return (
                        <div className={styles.documents}>
        
                            <div className={styles.documentsHeadingRow}>
                                <div className={styles.documentsNameColumn}>
                                    Date
                                </div>
                                <div className={styles.documentsAuthorColumn}>
                                    Activity
                                </div>
                                <div className={styles.documentsDateColumn}>
                                    Amount
                                </div>
                            </div>
        
                            {this.state.activities.map(a => (
                            <div className={styles.documentsRow}>
                                <div className={styles.documentsNameColumn}>
                                    {a.date.toDateString()}
                                </div>
                                <div className={styles.documentsAuthorColumn}>
                                    {a.name}
                                </div>
                                <div className={styles.documentsDateColumn}>
                                    {a.amount}
                                </div>
                            </div>
        
                            ))}
                        </div>);
        
                } else {
                    return (<div>No documents found</div>);
                }
                
            } else {
                this.props.service.getDocuments(this.props.customerId)
                    .then((activities: IActivity[]) => {
                        this.setState({
                            activities: activities,
                            currentCustomerId: this.props.customerId
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