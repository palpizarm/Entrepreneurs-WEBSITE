import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

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
    if (localStorage.getItem('user-session')) {
      localStorage.removeItem('user-session');
    }
    if (loginForm.invalid) {
      Object.values(loginForm.controls).forEach((control: any) => {
        control.markAsTouched();

      })
      return;
    }
    this.loading = true;
    this.login.getLogin(loginForm.value.username, loginForm.value.password)
      .subscribe((data: any) => {
        if (data.code > 0) {
          let user = data.data[0];
          localStorage.setItem('user-session', JSON.stringify(user));
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
