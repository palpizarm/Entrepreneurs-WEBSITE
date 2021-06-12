import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.css']
})
export class ShopViewComponent implements OnInit {

  shop = {
    img : '',
    name : '',
    desciption : '' 
  }
  items : any[] = [1,2,3,4,5,6,7];
  constructor() { }

  ngOnInit(): void {
  }

}
