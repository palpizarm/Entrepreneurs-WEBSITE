import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-sigin-customer',
  templateUrl: './sigin-customer.component.html',
  styleUrls: ['./sigin-customer.component.css']
})
export class SiginCustomerComponent implements OnInit {

  customer = {
    name: '',
    password1: '',
    password2: '',
    phone: '',
    id: '',
    mail: '',
    state: '',
    city: '',
    direction: ''
  }
  loading: boolean = false;
  msgError: string = '';
  errorLogin: boolean = false;


  constructor(private registerService: RegisterService, private router : Router) { }

  ngOnInit(): void {
  }

  registerCustomer(registerForm) {
    event.preventDefault();
    if (registerForm.invalid) {
      Object.values(registerForm.controls).forEach((control: any) => {
        control.markAsTouched();

      })
      return;
    }
    this.loading = true;
    this.registerService.RegisterCustomer(registerForm.value)
      .subscribe((data: any) => {
        if (data.code > 0) {
          console.log(data);
          let user = data.data[0];
          localStorage.setItem('user-session', JSON.stringify(user));
          this.router.navigate(['/home']);
        } else {
          this.loading = false;
          this.msgError = data.msg;
          this.errorLogin = true;
        }
      }, (errorService) => {
        this.loading = false;
      });



    this.loading = false;

  }

}
