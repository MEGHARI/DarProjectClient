import { Component } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import { GameService } from "../models/gameService";
import { Router, ActivatedRoute ,NavigationEnd} from '@angular/router';
@Component({
  selector: 'search',
  templateUrl: './searchGames.component.html' ,
  styleUrls:["./searchGames.component.css"]
})
export class SearchGamesComponent { 

  protected searchStr: string;
  protected captain: string;
  protected dataService: CompleterData;
  protected searchData = [];
  
  constructor(private completerService: CompleterService,public gameService : GameService,private router : Router) {
    
    this.dataService = completerService.local(this.searchData, 'name', 'name');
  }

  selectionItem(s){
    console.log(s);
  }
  refreshData(){
    this.gameService.autoSearchGames(this.searchStr.replace(/\s/g, '')).subscribe(
      data => {
        this.searchData = [];
        data["games"].forEach(element => {
          this.searchData.push(element)
        })
        this.dataService = this.completerService.local(this.searchData, 'name', 'name');
    },
      error => {
        console.log(error)
        //this.searchData = [];
      }
  );
  }
  searchDetails(name : string){
    if(name.length >0){
      this.router.navigate(["/search/"+name.replace(/\s/g, '')]);
    }
  }
}