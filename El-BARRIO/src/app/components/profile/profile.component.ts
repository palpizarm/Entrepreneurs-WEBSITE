import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  customerFlag:boolean = false;
  options: boolean[] = [true, false, false, false];
  userData : any = {};
  readonlyInfo:boolean = true;
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
  items:any[] = [1,2,3,4,5,6];
  
  constructor() { 
    if (localStorage.getItem('session')) {
      this.userData = JSON.parse(localStorage.getItem('session'));
      this.customerFlag = this.userData.id_customer == 2;
    }
  }

  ngOnInit(): void {
    console.log(this.userData);
    this.customer.name = this.userData.name;
    this.customer.password1 = '';
    this.customer.password2 = '';
    this.customer.phone = this.userData.phone;
    this.customer.id = this.userData.cedula;
    this.customer.mail = this.userData.email;
    this.customer.state = this.userData.state;
    this.customer.city = this.userData.city;
    this.customer.direction = this.userData.address_opt;
  }

  changeContent(opt: number) {
    for (let index = 0; index < this.options.length; index++) {
      this.options[index] = false;
    }
    this.options[opt] = true;
    switch (opt) {
      case 0: // show personal infor
        break;
      case 1: // purchases history
        break;
      case 2: // shops items product
        break;
      case 3: // sales history
        break;
      default:
        break;
    }
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

    this.loading = false;

  }

}
