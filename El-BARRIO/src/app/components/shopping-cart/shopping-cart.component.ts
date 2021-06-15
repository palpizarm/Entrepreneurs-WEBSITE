import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  items: any = [];
  constructor(private shoppingCartService: ShoppingCartService) {
    var userData = JSON.parse(localStorage.getItem('session'));
    if (userData.id_customer) {
      this.shoppingCartService.getShoppingCart(userData.id_customer)
        .subscribe((data: any) => {
          if (data.code > 0) {
            this.items = data.data;
            console.log(this.items);
          }
        });
    }
    else if (userData.id_entrepreneur) {
      this.shoppingCartService.getShoppingCart(userData.id_entrepreneur)
        .subscribe((data: any) => {
          if (data.code > 0) {
            this.items = data.data;
          }
        });;
    }
  }

  ngOnInit(): void {
  }

  quantityAdd(index:number){
    this.items[index].quantity = this.items[index].quantity + 1;
  }

}
