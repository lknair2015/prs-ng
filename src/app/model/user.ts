export class User{

    constructor(
        public id: number = 0, 
        public username: string = '', 
        public password: string ='', 
        public firstName: string ='',
        public lastName: string ='',
        public phoneNumber: string = '',
        public email: string = '',
        public reviewer : boolean = false,
        public admin : boolean = false
    ){}
    
}