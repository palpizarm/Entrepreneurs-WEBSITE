import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sigin-customer',
  templateUrl: './sigin-customer.component.html',
  styleUrls: ['./sigin-customer.component.css']
})
export class SiginCustomerComponent implements OnInit {

  username:string = '';
  password:string = '';

  constructor() { }

  ngOnInit(): void {
  }

  startLogin(event) {
    console.log(this.username, this.password);
    //setTimeout("window.location.reload()",500);
   

  }

}
