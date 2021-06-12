import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sigin-customer',
  templateUrl: './sigin-customer.component.html',
  styleUrls: ['./sigin-customer.component.css']
})
export class SiginCustomerComponent implements OnInit {

  name:string = '';
  username:string = '';
  password1:string = '';
  password2:string = '';
  phone:string = '';
  id:string = '';
  mail:string = '';
  state:string = '';
  city:string = '';
  direction:string = '';


  constructor() { }

  ngOnInit(): void {
  }

  startLogin(event) {
    event.preventDefault();
    
  }

}
