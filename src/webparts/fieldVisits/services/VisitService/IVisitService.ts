import { IVisit } from '../../model/IVisit';

export interface IVisitService {
    getMyVisits () : Promise<IVisit[]>;
}