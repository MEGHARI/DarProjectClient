
export class User {
    public bann : boolean;
    public id : number;
    public role : string;
    constructor(
        public lastName : string,
        public firstName : string,
        public address : string,
        public dateOfBirthday : Date,
        public postalCode :number,
        public mail : string,
        public password : string,    
        
    ){
            this.lastName = lastName;
            this.firstName= firstName;
            this.address = address;
            this.dateOfBirthday = dateOfBirthday;
            this.postalCode = postalCode;
            this.mail = mail;
            this.password = password;

    }
    
}