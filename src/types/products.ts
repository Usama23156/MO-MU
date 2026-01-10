export interface product {
    id:string;
    name:string;
    price:number;
    image:string;
    sale:boolean;
    category_id:string;
    brand_id?:string;
}