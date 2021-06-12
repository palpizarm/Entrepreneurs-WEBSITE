import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sigin-seller',
  templateUrl: './sigin-seller.component.html',
  styleUrls: ['./sigin-seller.component.css']
})
export class SiginSellerComponent implements OnInit {
  shopTypes:any = ["Tipo 1", "Tipo 2", "Tipo 3"];
  
  name:string = '';
  username:string = '';
  password1:string = '';
  password2:string = '';
  mail:string = '';
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

  register(event) {
    event.preventDefault();
    console.log("Enviar solicitud");
  }

  setType(type:string) {
    this.shopType = type;
  }

}
