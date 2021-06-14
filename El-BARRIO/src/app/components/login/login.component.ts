import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/class/user';
import { Parser } from '@angular/compiler/src/ml_parser/parser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;

  user = {
    username: '',
    password: '',
  }
  errorLogin: boolean = false;
  msgError: string = '';


  constructor(private router: Router, private login: LoginService) {

  }

  ngOnInit(): void {

  }


  startLogin(loginForm: any) {
    if (loginForm.invalid) {
      Object.values(loginForm.controls).forEach((control: any) => {
        control.markAsTouched();

      })
      return;
    }
    this.loading = true;
    this.login.getLogin(loginForm.value.username, loginForm.value.password)
      .subscribe((data: any) => {
        console.log(data);
        if (data.code > 0) {
          let user = data.data[0];
          console.log(JSON.stringify(user));
          localStorage.setItem('session', JSON.stringify(user))
          User.setData(user);
          this.router.navigate(['/home']);
        }
        else {
          this.loading = false;
          this.errorLogin = true;
          this.msgError = 'Usuario o contraseña incorrecta';
        }
      }, (errorSevice) => {
        this.loading = false;
      })
  }
}
