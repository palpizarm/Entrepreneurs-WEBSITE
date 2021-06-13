import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }



  RegisterCustomer(customer:any){
    const url = 'http://localhost:3000/signup/registerConsumidor';
    const body = {
      'password' : customer.password1,
      'name' : customer.name,
      'email' : customer.mail,
      'phone' : customer.phone,
      'cedula' : customer.id,
      'state' : customer.state,
      'city' : customer.city,
      'address_opt' : customer.direction
    }
    return this.http.post(url,body);
  }

  RegisterSeller(seller:any) {
    const url = 'http://localhost:3000/signup/registerConsumidor';
    const body = {
      'password' : seller.password1,
      'name' : seller.name,
      'email' : seller.mail,
      'phone' : seller.phone,
      'cedula' : seller.id,
      'state' : seller.state,
      'city' : seller.city,
      'address_opt' : seller.direction,
      'nombreTienda' : seller.shopName,
      'descripcion' : seller.shopDescription
    }
    return this.http.post(url,body);
  }
}
