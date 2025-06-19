export class Vendor {
    constructor(
        public id: number = 0, 
        public code : string = "", 
        public name: string = "", 
        public address: string = "", 
        public city: string = "",
        public state: string = "",
        public zip: string = "",
        public phoneNumber: string = "",
        public email: string = ""
    ){}
}