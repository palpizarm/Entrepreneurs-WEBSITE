import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sigin-customer',
  templateUrl: './sigin-customer.component.html',
  styleUrls: ['./sigin-customer.component.css']
})
export class SiginCustomerComponent implements OnInit {

  name:string = '';
  lastname:string = '';
  password1:string = '';
  password2:string = '';
  mail:string = '';


  constructor() { }

  ngOnInit(): void {
  }

  startLogin(event) {
    //setTimeout("window.location.reload()",500);
   

  }

}
