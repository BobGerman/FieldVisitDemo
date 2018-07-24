import { IVisit } from '../../model/IVisit';

export interface IVisitService {
    getGroupVisits (groupId: string) : Promise<IVisit[]>;
}