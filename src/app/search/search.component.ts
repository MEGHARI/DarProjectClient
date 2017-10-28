import { Component, OnInit } from '@angular/core';
import { SearchService } from './search-service.component'
import { DataNode } from './DataNode'

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
            console.log(element);
            //this.games.push(new DataNode(element.name,element.summary, ""));
            this.games.push(element)
        });
    }

    onScroll () {
        console.log('scrolled!!')
        this.offset +=10;
        this.searchService.doSomething("fifa 17",this.offset).subscribe(
            data => this.traitement(data.json()),
            error => console.log(error),
            () => console.log('aaa')
        );
        console.log();
    }
}