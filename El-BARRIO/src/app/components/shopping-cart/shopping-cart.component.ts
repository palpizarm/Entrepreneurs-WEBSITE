import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  items: any = [];
  date: any = new Date();
  orderForm:any = {
    phone: '',
    state: '',
    city: '',
    address : '',
    cardNumebr : '',
    dateExpired : '',
    cvv : ''
  }
  loading:boolean = false;

  constructor(private shoppingCartService: ShoppingCartService) {
    this.loadData();
  }

  ngOnInit(): void {
  }

  loadData(){
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

  quantityAdd(index:number){
    console.log(index, "call it");
    this.items[index].quantity = this.items[index].quantity + 1;
  }

  quantitySub(index:number){
    if (this.items[index].quantity > 1) {
      this.items[index].quantity = this.items[index].quantity - 1;
    }
  }

  processOrder(){
    document.getElementById('btn-formOrder').click();
  }

  processToBuy(order:any) {
    if (order.invalid) {
      Object.values(order.controls).forEach((control: any) => {
        control.markAsTouched();

      })
      return;
    }
  }

  CloseForm(order){
    if (order.invalid) {
      Object.values(order.controls).forEach((control: any) => {
        control.touched = false;
      })
      return;
    }
  }

  removeItem(item:any) {
    
    this.shoppingCartService.removeItem(item.id_shopCart)
      .subscribe((data:any) => {
        if (data.code > 0) {
          this.loadData();
        }
      }, (error) => {
        console.log(error);
      })
  }

}
