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

export interface BarPromos {
    id: number,
    bar_id: number,
    bar: Bar,
    image: string,
    description: string,
    start_promo: date,
    end_promo: date,
    is_active: number,
    is_cover: number
}