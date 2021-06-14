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
  shopProducts
  getShopItems(id:string) {
    const url = `http://localhost:3000/productShow/shopShowProducts`;
    return this.http.post(url,{'id_shop':id});
  }

  getShopItemsEntrepreneur(id:string) {
    const url = `http://localhost:3000/productShow/shopProducts`;
    return this.http.post(url,{'id_shop':id});
  }

  getShopById(id:string) {
    const url = `http://localhost:3000/shopShow/getShop/${id}`;
    return this.http.get(url);
  }

  getAllShopAdmin() {
    const url = `http://localhost:3000/shopShow/getShopsAdmin`;
    return this.http.post(url,{});
  }

  getShopTopAprove() {
    const url = `http://localhost:3000/shopShow/getShopToAprove`;
    return this.http.post(url,{});
  }

  updateShopState(newState:number, idShop:number) {
    const url = `http://localhost:3000/shopShow/getShopToAprove`;
    const body = {
      'id_shop_status' : newState,
      'id_shop' : idShop
    }
    return this.http.post(url,body);
  }
}
