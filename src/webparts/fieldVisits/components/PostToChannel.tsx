import * as React from 'react';
import { escape, isEmpty } from '@microsoft/sp-lodash-subset';
import styles from './FieldVisits.module.scss';
import { inputProperties } from '../../../../node_modules/@uifabric/utilities';

export interface IPostToChannelProps {
    customerId: string;
    customerName: string;
}

export interface IPostToChannelState {
    value: string;
}

export class PostToChannel extends React.Component<IPostToChannelProps, IPostToChannelState> {

    constructor(props) {
        super(props);
        this.state = { value: `Post in the channel about ${props.customerName}` };
    }

    public render(): React.ReactElement<IPostToChannelProps> {

        if (this.props.customerId && this.props.customerName) {

            return (
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className={styles.postToChannel}>
                        <div className={styles.postToChannelRow}>
                            <div className={styles.postToChannelTextColumn}>
                                <textarea className={styles.postToChannelTextArea}
                                    onChange={this.handleChange.bind(this)}
                                    value={this.state.value}
                                />
                            </div>
                            <div className={styles.postToChannelButtonColumn}>
                                <input type='submit' value='Send'
                                    className={styles.postToChannelButton} />
                            </div>
                        </div>
                    </div>
                </form>
            );
        } else {
            return (<div />);
        }
    }

    private handleChange(event) {
        this.setState({ value: event.target.value });
    }

    private handleSubmit(event) {
        alert(`Posting: ${this.state.value}`);
    }

}