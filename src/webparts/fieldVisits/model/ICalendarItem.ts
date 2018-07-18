export interface ICalendarItem {
    Title: string;
    DateTime: Date;
    Location: string;
    Coordinates: {
        Latitude: number;
        Longitude: number;
    };
}