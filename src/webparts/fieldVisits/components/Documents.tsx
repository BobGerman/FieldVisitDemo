import * as React from 'react';
import { escape, isEmpty } from '@microsoft/sp-lodash-subset';
import styles from './FieldVisits.module.scss';

import { IDocumentService } from '../services/DocumentService/IDocumentService';
import { IDocument } from '../model/IDocument';

export interface IDocumentProps {
    service: IDocumentService;
    customerId: string;
}

export interface IDocumentState {
    documents: IDocument[];
    currentCustomerId: string;
}

export class Documents extends React.Component<IDocumentProps, IDocumentState> {

    constructor() {
        super();
        this.state = {
            documents: null,
            currentCustomerId: null
        };
    }

    public render(): React.ReactElement<IDocumentProps> {

        if (this.props.customerId) {

            if (this.state.currentCustomerId == this.props.customerId) {
                
                return (
                <div className={styles.documents}>
                    {this.state.documents.map(doc => (

                    <div className={styles.documentsRow}>
                        <div className={styles.documentsNameColumn}>
                            {doc.name}
                        </div>
                        <div className={styles.documentsAuthorColumn}>
                            {doc.author}
                        </div>
                        <div className={styles.documentsDateColumn}>
                            {doc.date.getDate}
                        </div>
                    </div>

                    ))}
                </div>);
            } else {
                this.props.service.getDocuments(this.props.customerId)
                    .then((docs: IDocument[]) => {
                        this.setState({
                            documents: docs,
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