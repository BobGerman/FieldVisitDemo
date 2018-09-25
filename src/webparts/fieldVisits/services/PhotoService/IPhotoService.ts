export interface IPhotoService {

    getPhotos(customerId: string): Promise<string[]>;

}