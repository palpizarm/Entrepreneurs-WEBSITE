import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient) { }


  signinCustomer(name:string, username:string,  password:string, mail:string, phone:string, id:string, state:string, city:string, direction:string) {
    const url = `http://localhost:3000/`;
    const body = {
      'username' : username,
      'password' : password,
      'name' : name,
      'email' : mail,
      'phone' : phone,
      'cedula' : id,
      'state' : state,
      'city' : city,
      'address_opt' : direction
    };
  }



}
