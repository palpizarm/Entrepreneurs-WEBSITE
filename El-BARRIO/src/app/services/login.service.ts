import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  static USER = {
    id : -1,
    username : 'Iniciar Sesión',
    password : ''
  }

  constructor(private http:HttpClient) { 

  }

  getLogin (username: string , password : string){
    const url = `http://localhost:3000/login/getSession`;
    const body = {
      'username' : username,
      'password' : password
    }
    return this.http.post(url,body);
  }
}
