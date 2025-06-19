import { User } from "./user";

export class RequestNew{

    constructor(

        public userId : number = 0,
        public description : string = "",
        public justification :string = "",
        public dateNeeded : Date = new Date(),
        public deliveryMode : string = ""
    ){}
    
}