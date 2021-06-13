import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sigin-seller',
  templateUrl: './sigin-seller.component.html',
  styleUrls: ['./sigin-seller.component.css']
})
export class SiginSellerComponent implements OnInit {
  shopTypes:any = ["Tipo 1", "Tipo 2", "Tipo 3"];
  
  customer = {
    name: '',
    username: '',
    password1: '',
    password2: '',
    phone: '',
    id: '',
    mail: '',
    state: '',
    city: '',
    direction: ''
  }

  name:string = '';
  username:string = '';
  password1:string = '';
  password2:string = '';
  mail:string = '';
  urlImg:string = '';
  phone:string = '';
  id:string = '';
  shopName:string = '';
  shopType:string = '';
  description:string = '';
  state:string = '';
  city:string = '';
  direction:string = '';

  constructor() { }

  ngOnInit(): void {
  }

  register(event, img) {
    event.preventDefault();
    console.log(img);
    
    
  }

  setType(type:string) {
    this.shopType = type;
  }

}
