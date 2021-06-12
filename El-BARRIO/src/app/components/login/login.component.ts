import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  username:string = '';
  password:string = '';
  msgError:string = '';
  errorLogin:boolean = false;

  constructor(private router:Router, private login:LoginService) {

  }

  ngOnInit(): void {

  }


  startLogin(event) {
    if (localStorage.getItem('user-session')) {
      localStorage.removeItem('user-session');
    }
    
    if (this.username.length != 0 && this.password.length != 0) {
      this.loading = true;
      this.login.getLogin(this.username, this.password)
        .subscribe((data:any) =>{
          if(data.code > 0) {
            let user = data.data[0];
            localStorage.setItem('user-session', JSON.stringify(user));
            this.router.navigate(['/home']);
          }
          else {
            this.loading = false;
            this.username = ''; 
            this.password = '';
            this.errorLogin = true;
            this.msgError = data.msg;
          }
        }, (errorSevice) => {
          this.loading = false;
        })
    } else {
      this.errorLogin = true;
      this.msgError = "Ingrese el usuario y contraseña";
    }
  }

}
