import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  
  shops:any = [1,2,3,4,5,5,6,7,8,9,10];
  
  
  constructor() { }

  ngOnInit(): void {
  }

}
