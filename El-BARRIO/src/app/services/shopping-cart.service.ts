import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private htpp : HttpClient) { }


  getShoppingCart(id:string) {
    const url = `http://localhost:3000/shopCart/showShopCart`;
    return this.htpp.post(url, {'id_customer' : id});
  }

  removeItem(id:number) {
    const url = `http://localhost:3000/shopCart/deleteProduct`;
    return this.htpp.post(url, {'id_shopCart' : id});
  }

  addItemShopCart(id_item: number, id_customer:number, quantity:number) {
    const url = `http://localhost:3000/shopCart/addProduct`;
    const body = {
      'id_item' : id_item,
      'id_customer' : id_customer,
      'quantity' : quantity
    }
    return this.htpp.post(url, body);
  }


  getItemCartQuantity(id_customer:number) {
    const url = `http://localhost:3000/shopCart/getCartItemCount`;
    const body = {
      'id_customer' : id_customer
    }
    return this.htpp.post(url, body);
  }
}
