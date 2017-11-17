import { Component, OnInit } from '@angular/core';
import {UserService} from "../../models/userService"
import {Game} from "../../models/game"
import { Router,ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
    selector: 'statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})
export class StaticticsComponent implements OnInit {
    idAdmin : number;
    idUser : number;
    statistics = [];
    json = 
    {"exchanges":
    [
       {"exchange": {"firstName":"habchi","lastName":"mou","date_return":"10-11-2017","gameName":"FIFA 2000: Major League Soccer","id_exchange":1,"platform":"PC (Microsoft Windows)","retard":"YES"}},
        {"exchange":{"firstName":"Azi","lastName":"Aghiles","date_return":"20-12-2017","gameName":"FIFA Manager 09","id_exchange":2,"platform":"PC (Microsoft Windows)","retard":"NON"}}
    ]
}/*{"exchanges":
		{"exchange":
        {"firstName":"habchi","lastName":"mou","date_return":"20-12-2017","gameName":"FIFA 2000: Major League Soccer","id_exchange":2,"platform":"PC (Microsoft Windows)","retard":"NON"}
    }
}*/
    constructor(private userService :UserService,
        private router:Router,private activatedRoute : ActivatedRoute) { 
        if(this.router.url.match("/admin/[0-9]+/users/[0-9]+/statistics")){
             this.activatedRoute.params.subscribe(params => {
                 this.idAdmin = +params['idAdmin']
                 this.idUser = +params['idUser']
                 this.getStatsByUser(this.idUser)
                 console.log(this.statistics.length)
              });
            }
    }

    ngOnInit() { }
    getStatsByUser(id : number){   
             
          this.json["exchanges"].forEach(elemen => {
            let element = elemen["exchange"];
            this.statistics.push({firstName : element['first_name'],lastName : element['last_name'],
            date_return : element['date_return'],gameName : element["game_name"],id_exchange:element["id_exchange"],
            platform : element["platform"],retard : element["retard"]
        })
        });
        this.userService.getStatisticsByUser(id).subscribe(
            data =>{console.log(data)},
            error => {console.log(error.json())}
        )
    }
}