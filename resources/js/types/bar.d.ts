import { User } from ".";
import { Category } from "./category";

export interface Bar {
    id: number,
    name: string,
    owner_id: number,
    owner: User,
    cover: string,
    images: barImages[],
    opening_time: string,
    description: string,
    location_lat: string,
    location_long: string,
    menus: menus[],
    web: string,
    address:string,
    contact: string,
    category_id:number,
    category: Category;

}

export interface Menus {
    id: number,
    title: string,
    menus: string

}

export interface barImages {
    id: number,
    bar_id: numbar,
    image: string
}