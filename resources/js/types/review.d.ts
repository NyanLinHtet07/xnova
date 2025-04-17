import { User } from ".";

export interface ReviewType {
    user_id:number,
    user: User,
    bar_id:number,
    rating:number,
    review:string,
    created_at: string
}