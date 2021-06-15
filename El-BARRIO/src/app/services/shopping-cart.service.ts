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
}
