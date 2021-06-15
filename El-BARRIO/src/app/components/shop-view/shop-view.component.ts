import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.css']
})
export class ShopViewComponent implements OnInit {

  shop:any={};
  items : any[] = [1,2,3,4,5,6,7];
  constructor(private shopService : ShopService, private router : ActivatedRoute) {
    this.router.params.subscribe(params => {
      this.getShopInfo(params['id']);
    })
  }


  getShopInfo(id:string) {
    this.shopService.getShopById(id)
      .subscribe((data:any) => {
        if (data.code > 0) {
          this.shop = data.data;
        }
      }, (error) => {
        console.log(error);
      })
    this.shopService.getShopItems(id)
      .subscribe((data:any) => {
        if (data.code > 0) {
          this.items = data.data;
          console.log(this.items)
        }
      }, (error) => {
        console.log(error);
      })
  }

  ngOnInit(): void {
  }

}
