import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {

  session: string = "Perfil";
  userLogin: boolean = false;
  options: boolean[] = [true, false, false, false];
  loading: boolean = false;
  admin = {
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
  shops: any[] = [];
  shopDetails:any = {};

  constructor(public router: Router, private shopService: ShopService) {
    if (localStorage.getItem('user-session')) {
      try {
        var user = JSON.parse(localStorage.getItem('user-session'));
        this.session = user.user_name;
        this.userLogin = true;
      } catch (error) {
        localStorage.removeItem('user-session');
      }
    }
    this.getAllShops();
  }

  ngOnInit(): void {
  }

  logout() {
    this.userLogin = false;
    localStorage.removeItem("user-session");
    this.session = 'Iniciar Sesión';
    window.location.reload();

  }

  changeContent(opt: number) {
    for (let index = 0; index < this.options.length; index++) {
      this.options[index] = false;
    }
    this.options[opt] = true;
    switch (opt) {
      case 0:
        this.getAllShops();
        break;
      case 1:
      this.getShopsToAprove();
        break;
      case 2:
        this.getQuestions();
        break;
      case 3:
        break;
      default:
        break;
    }
  }

  getAllShops() {
    this.shopService.getAllShopAdmin()
      .subscribe((data: any) => {
        if (data.code > 0) {
          this.shops = data.data;
          console.log(this.shops);
        }
      })
  }

  getShopsToAprove() {
    this.shopService.getShopTopAprove()
      .subscribe((data: any) => {
        if (data.code > 0) {
          this.shops = data.data;
        }
      })
  }

  getQuestions() {

  }

  answerQuestion() {

  }

  registerAdmin(registerForm) {
    if (registerForm.invalid) {
      Object.values(registerForm.controls).forEach((control: any) => {
        control.markAsTouched();

      })
      return;
    }
    this.loading = true;
  }

  viewShop(shop) {
    this.shopDetails = {};
    document.getElementById('btn-show-shop').click();
    this.shopService.getShopById(shop.id_shop)
      .subscribe((data:any) => {
        if(data.code > 0) {
          this.shopDetails = data.data;
          console.log(this.shopDetails);
        }
      }, (error) => {
        console.log(error);
      })
  }

  suspender(shop) {

  }

  blockShop(shop) {

  }

}
