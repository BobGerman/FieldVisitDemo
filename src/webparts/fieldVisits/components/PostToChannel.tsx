import * as React from 'react';
import { escape, isEmpty } from '@microsoft/sp-lodash-subset';
import styles from './FieldVisits.module.scss';
import { inputProperties } from '../../../../node_modules/@uifabric/utilities';

export interface IPostToChannelProps {
    customerId: string;
    customerName: string;
}

export class PostToChannel extends React.Component<IPostToChannelProps, {}> {

    public render(): React.ReactElement<IPostToChannelProps> {

        if (this.props.customerId && this.props.customerName) {

            return (
                <div className={styles.postToChannel}>
                    <div className={styles.postToChannelRow}>
                      <div className={styles.postToChannelTextColumn}>
                        <textarea className={styles.postToChannelTextArea}
                            value={`Post in the channel about ${this.props.customerName}`}
                        />
                      </div>
                      <div className={styles.postToChannelButtonColumn}>
                        <input type='button' value='Send'
                            className={styles.postToChannelButton} />
                    </div>
                  </div>
                </div>
            );
        } else {
            return(<div />);
        }
    }
}