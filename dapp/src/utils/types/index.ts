export interface RestaurantType {
    id: bigint;
    name: string;
    addresse: string;
    city: string;
    latitude: string;
    longitude: string;
    country: string;
    photoUrl: string[] | string;
    numberOfReviews: number;
}