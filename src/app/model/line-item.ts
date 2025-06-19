import { Product } from "./product";
import { Request } from "./request";

export class LineItem{

    constructor(
        public id: number = 0,
        public request : Request = new Request(),
        public product : Product = new Product,
        public quantity : number = 0
    ){}
}