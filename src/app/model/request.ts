import { User } from "./user";

export class Request{

    constructor(
        public id : number = 0,
        public user : User = new User(),
        public requestNumber : string = "",
        public description : string = "",
        public justification :string = "",
        public dateNeeded : Date = new Date(),
        public deliveryMode : string = "",
        public status : string = "",
        public total : number = 0.0,
        public submittedDate : Date = new Date(),
        public reasonForJustification : string = ""
    ){}
    
}