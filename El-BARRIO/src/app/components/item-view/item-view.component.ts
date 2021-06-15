import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {
  count : number = 1;
  item:any = {};
  items:any[] = [];
  reviews:any[] = [];
  rating:any[] = ['fa fa-star fa-2x starGold','fa fa-star fa-2x starGold','fa fa-star fa-2x starGold','fa fa-star fa-2x starGray','fa fa-star fa-2x starGray'];
  user:any={
    id: '',
    name: '',
    annotation : '',
    rating : ''
  };
  loading :boolean = false;

  constructor(private router : ActivatedRoute, private itemService : ItemsService, private shopCartService : ShoppingCartService) {
    this.router.params.subscribe(params => {
      this.getItemInformation(params['id']);
    })
    var userData = JSON.parse(localStorage.getItem('session'));
    this.user.name = userData.name;
    if (userData.id_customer) {
      this.user.id = userData.id_customer;
    }
    else {
      this.user.id = userData.id_entrepreneur;
    }
  }
  
  ngOnInit(): void {
  }

  getItemInformation(id:number) {
    this.count  = 1;
    this.itemService.getItemInfo(id)
      .subscribe((data:any) => {
        if (data.code > 0) {
          this.item = data.data.item[0];
          this.items = data.data.relatedItems;
          this.reviews = data.data.reviews;
        }
      }, (error) => {
        console.log(error);
      })
  }

  quantityAdd() {
    this.count = this.count + 1;
  }

  quantitySub() {
    if (this.count > 1) {
      this.count = this.count - 1;
    }
  }

  registerReview(form:any){

  }

  AddItem() {
    let id_item = this.item.id_item;
    let id_user = this.user.id;
    this.shopCartService.addItemShopCart(id_item,id_user,this.count)
      .subscribe((data:any) => {
        if(data.code > 0) {
          document.getElementById('btn-successAdd').click();
        }
        else {
          console.log(data.msg)
        }
      }, error => {
        console.log(error);
      })
  }

}
