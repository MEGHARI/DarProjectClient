
export class User {
   
    constructor( public ident : number,
        public lastName : string,
        public firstName : string,
        public address : string,
        public dateOfBirthday : Date,
        public postalCode :number,
        public mail : string,
        public password : string,
        public bann : boolean,
        public role : string,
    ){
            this.lastName = lastName;
            this.firstName= firstName;
            this.address = address;
            this.dateOfBirthday = dateOfBirthday;
            this.postalCode = postalCode;
            this.mail = mail;
            this.password = password;
            this.bann = bann;
            this.role = role;

    }
    
}