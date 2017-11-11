import { Component, OnInit } from '@angular/core';
import { TestService} from './test-service.component';
import { Http, Headers, RequestOptions, HttpModule, Request, Response, RequestOptionsArgs } from '@angular/http'


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
    loading = false;
    constructor(private testService: TestService, private http:Http) { 
        for (let i = 0; i < this.sum; ++i) {
            this.array.push(i);
          }
    }
    
    ngOnInit() {}

   /* onScroll () {
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
    }*/

    signup() {
        this.loading = true;
            /*this.userService.create(({lastName : infSignup.name,firstName :infSignup.firstName,mail:infSignup.mail,address : infSignup.address,password : infSignup.password}))
            .subscribe(
                data => {           
                    myGlobals.setSignupSuccess();
                    this.router.navigate(['/login']);    
                },
                error => {
                    console.log("whatever")
                    this.errorAlert=true;
                    this.alertService.error(error);
                    this.loading = false;
                });*/
                /*$.ajax({
                    type: 'POST',
                    url: 'http://localhost:8080/DarProject/user/register',
                    dataType: 'json',
                    data:'{"lastName":"azul","firstName":"coucou","address":"13aaaa","password":"123456","mail":"mani.nma90@gmail.com"}',
                    //whatever you need
                    beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'askajskajsk');
                    },
                    success: function (data) {console.log(data)}
                });*/
              this.http.post('http://localhost:8080/DarProject/user/register',
             '{"lastName":"azul","firstName":"coucou","address":"13aaaa","password":"123456","mail":"mani.nma90@gmggail.com"}'
              ).map((res) => res.json())
              .subscribe(
                data => {           
                    
                  console.log("success") 
                },
                error => {
                    console.log("whatever")
                });
                    
    }
}