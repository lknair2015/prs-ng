import { Vendor } from "./vendor";

export class Product{
    constructor(
        public id: number = 0,
        public vendor: Vendor = new Vendor(),
        public partNumber: string = "",
        public name: string = "",
        public price: number = 0.0,
        public unit: string = "",
        public photoPath: String = ""
    ){}
}