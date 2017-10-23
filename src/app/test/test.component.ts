import { Component, OnInit } from '@angular/core';
import { TestService} from './test-service.component';

@Component({
    selector: 'test',
    providers: [TestService],
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
    array = [];
    sum = 100;
    offset =0;
    constructor(private testService: TestService) { 
        for (let i = 0; i < this.sum; ++i) {
            this.array.push(i);
          }
    }

    ngOnInit() {  }

    onScroll () {
        console.log('scrolled!!')
        this.offset +=10;
        this.testService.doSomething("fifa",this.offset).subscribe(
            data => console.log(data),
            error => console.log(error),
            () => console.log('aaa')
        );
        console.log();
        //console.log(this.testService.test());
            // add another 20 items
    const start = this.sum;
    this.sum += 20;
    for (let i = start; i < this.sum; ++i) {
      this.array.push(i);
    }
    }
}