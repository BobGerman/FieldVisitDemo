export interface ICalendarItem {
    title: string;
    dateTime: Date;
    location: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}