import { User } from ".";

export interface Bar {
    id: number,
    name: string,
    owner_id: number,
    owner: User
    first_image: string,
    opening_time: string,
    description: string,
    location_lat: string,
    location_long: string,
    menus: menus[],
    web: string,
    address:string,
    contact: string

}

export interface Menus {
    id: number,
    title: string,
    menus: string

}