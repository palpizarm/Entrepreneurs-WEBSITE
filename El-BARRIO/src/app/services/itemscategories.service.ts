import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemscategoriesService {

  constructor(private http:HttpClient) { }


  getTopCategories() {
    const url = `http://localhost:3000/categoryTop/getTopCategories`;
    return this.http.post(url,{});
  }
}
