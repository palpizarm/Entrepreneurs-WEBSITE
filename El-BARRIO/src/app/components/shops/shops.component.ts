import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  
  shops:any[] = [1,2,3,4,5,5,6,7,8,9,10];
  
  
  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  viewShop(shop:any) {

    this.router.navigate(['shop',1]);

  }

}
