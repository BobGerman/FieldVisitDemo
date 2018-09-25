import * as React from 'react';
import { escape, isEmpty } from '@microsoft/sp-lodash-subset';
import styles from './FieldVisits.module.scss';

import { IPhotoService } from '../services/PhotoService/IPhotoService';

export interface IPhotosProps {
    customerId: string;
    service: IPhotoService;
}

export interface IPhotosState {
    photos: string[];
    currentCustomerId: string;
}

export class Photos extends React.Component<IPhotosProps, IPhotosState> {


    constructor() {
        super();
        this.state = {
            photos: null,
            currentCustomerId: null
        };
    }

    public render(): React.ReactElement<IPhotosProps> {

        if (this.props.customerId) {

            if (this.state.currentCustomerId == this.props.customerId) {

                if (this.state.photos && this.state.photos.length > 0) {

                    return (
                        <div>
                            {this.state.photos.map(url => (
                                <div>
                                    <img src={url} width='200px' /><br />
                                </div>
                            ))}
                        </div>
                    );

                } else {

                    return (<div>No photos for this property</div>);

                }

            } else {

                this.props.service.getPhotos(this.props.customerId)
                .then ((photos) => {
                    this.setState({
                        photos: photos,
                        currentCustomerId: this.props.customerId
                    });
                });

                return (<div>Loading...</div>);
            }
        } else {
            return (<div></div>);
        }
    }
}