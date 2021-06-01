import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sigin-seller',
  templateUrl: './sigin-seller.component.html',
  styleUrls: ['./sigin-seller.component.css']
})
export class SiginSellerComponent implements OnInit {

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
