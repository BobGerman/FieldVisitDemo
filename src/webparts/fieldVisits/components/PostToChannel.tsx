import * as React from 'react';
import { escape, isEmpty } from '@microsoft/sp-lodash-subset';
import styles from './FieldVisits.module.scss';
import { inputProperties } from '../../../../node_modules/@uifabric/utilities';

import { IConversationService } from '../services/ConversationService/IConversationService';
import { INewChatThread, ContentType } from '../model/IConversation';

export interface IPostToChannelProps {
    customerId: string;
    customerName: string;
    conversationService: IConversationService;
}

export interface IPostToChannelState {
    value: string;
}

export class PostToChannel extends React.Component<IPostToChannelProps, IPostToChannelState> {

    constructor() {
        super();
        this.state = { value: '' };
    }

    public render(): React.ReactElement<IPostToChannelProps> {

        if (this.props.customerId && this.props.customerName) {

            return (
                <div className={styles.postToChannel}>
                    <div className={styles.postToChannelRow}>
                        <div className={styles.postToChannelTextColumn}>
                            <textarea className={styles.postToChannelTextArea}
                                onChange={this.handleChange.bind(this)}
                                value={this.state.value}
                            />
                        </div>
                        <div className={styles.postToChannelButtonColumn}>
                            <input type='button' value='Send'
                                onClick={this.handleClick.bind(this)}
                                className={styles.postToChannelButton} />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<div />);
        }
    }

    private handleChange(event) {
        this.setState({ value: event.target.value });
    }

    private handleClick(event) {
        const message = `${this.props.customerName}: ${this.state.value}`;
        this.props.conversationService
            .createChatThread(message, ContentType.text)
            .then(() => {
                this.setState({ value: '' });
            });
    }

}