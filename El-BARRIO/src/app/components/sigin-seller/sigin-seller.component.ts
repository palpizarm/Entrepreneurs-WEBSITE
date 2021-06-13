import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-sigin-seller',
  templateUrl: './sigin-seller.component.html',
  styleUrls: ['./sigin-seller.component.css']
})
export class SiginSellerComponent implements OnInit {
  customer = {
    name: '',
    password1: '',
    password2: '',
    phone: '',
    id: '',
    mail: '',
    state: '',
    city: '',
    direction: '',
    shopName : '',
    shopDescription : ''
  }
  errorLogin:boolean = false;
  msgError:string = '';
  loading : boolean = false;
  successMsg:string = '';

  constructor(private registerService : RegisterService) { }

  ngOnInit(): void {
  }

  register(registerForm) {
    event.preventDefault();
    if (registerForm.invalid) {
      Object.values(registerForm.controls).forEach((control: any) => {
        control.markAsTouched();

      })
      return;
    }
    this.loading = true;
    this.registerService.registerSeller(registerForm.value)
      .subscribe((data:any) => {
        if (data.code > 0) {
          this.successMsg = data.msg;
          document.getElementById("BtnOpen").click();
        } else {
          this.loading = false;
          this.msgError = data.msg;
          this.errorLogin = true;
        }
      }, (errorSevice) => {
      })
      this.loading = false;
  }

}
