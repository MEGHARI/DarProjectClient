import { Http,Response} from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map"
@Injectable()
    export class signupService {
        constructor(public http :Http){}
        getInfo(){
            return this.http.
            get("https://jsonplaceholder.typicode.com/users")
            .map((response : Response) => response.json());
            
            
        }
    }
