import { Component, OnInit } from '@angular/core';
import { SearchService } from './search-service.component'

@Component({
    selector: 'search-list',
    providers: [SearchService],
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    games = [];
    offset = 0;
    constructor(private searchService : SearchService) { }

    ngOnInit() { 
        this.searchService.doSomething("fifa",this.offset).subscribe(
            data => this.traitement(data.json()),
            error => console.log(error),
            () => console.log('aaa')
        );
    }


    traitement(data){
        console.log(data.games);
        data.games.forEach(element => {
            this.games.push(element);
        });
    }

    onScroll () {
        console.log('scrolled!!')
        this.offset +=10;
        this.searchService.doSomething("fifa",this.offset).subscribe(
            data => this.traitement(data.json()),
            error => console.log(error),
            () => console.log('aaa')
        );
        console.log();
    }
}