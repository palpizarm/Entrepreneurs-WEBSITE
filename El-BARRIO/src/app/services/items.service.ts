import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http : HttpClient) { }

  serachItems(q:string) {
    const url = `http://localhost:3000/productTop/productSearchBar`;
    return this.http.post(url,{'name':q});
  }


  changeItemStatus(status:number,id_item) {
    const url =  `http://localhost:3000/productTop/ProductStateUpdate`;
    return this.http.post(url,{'status':status, 'id_item':id_item});
  }
}
