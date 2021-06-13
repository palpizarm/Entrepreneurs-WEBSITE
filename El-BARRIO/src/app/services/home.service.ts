import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  getTopCategories() {
    const url = `http://localhost:3000/categoryTop/getTopCategories`;
    return this.http.post(url,{});
  }

  getBestSellerItems() {
    const url = `http://localhost:3000/productTop/getTopProductosDest`;
    return this.http.post(url,{});
  }

  getTopNewItems() {
    const url = `http://localhost:3000/productTop/getTopProductosNuevos`;
    return this.http.post(url,{});
  }
}
