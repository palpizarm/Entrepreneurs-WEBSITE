import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  
  shops:any[];
  
  
  constructor(private router:Router, private shopService : ShopService) { 
    this.shopService.getShops()
      .subscribe((data:any) => {
        if (data.code > 0) {
          this.shops = data.data;
        }
      })
  }

  ngOnInit(): void {
  }


  viewShop(shop:any) {
    this.router.navigate(['shop',shop.id_shop]);
  }

}
