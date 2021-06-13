import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http : HttpClient) { }

  

  getShops() {
    const url = `http://localhost:3000/shopShow/getShops`;
    return this.http.post(url,{});
  }

  getShopItems(id:string) {
    const url = `http://localhost:3000/productShow/shopShowProducts`;
    return this.http.post(url,{'id_shop':id});
  }

  getShopById(id:string) {
    const url = `http://localhost:3000/shopShow/getShop/${id}`;
    return this.http.get(url);
  }
}
