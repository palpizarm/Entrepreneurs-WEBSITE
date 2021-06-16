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
  shopDetails: any = {};
  optionToDo: number = 0;
  msgList: string[] = [
    '¿Esta seguro que desea aprobar la solicitud de la tienda?',
    '¿Esta seguro que desea rechazar la solicitud de la tienda?',
    '¿Esta seguro que desea bloquear de forma permanente a la tienda?',
    'La tienda será suspendida por 15 días. ¿Esta seguro?'
  ]

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
    this.router.navigate(['/home']);

  }

  changeContent(opt: number) {
    for (let index = 0; index < this.options.length; index++) {
      this.options[index] = false;
    }
    this.options[opt] = true;
    switch (opt) {
      case 0: // show all shops
        this.getAllShops();
        break;
      case 1: // show shops to aprove
        this.getShopsToAprove();
        break;
      case 2: // show questions 
        this.getQuestions();
        break;
      case 3: // show admin form
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
    this.shopService.getShopToAprove()
      .subscribe((data: any) => {
        if (data.code > 0) {
          this.shops = data.data;
        }
      })
  }

  getQuestions() {

  }

  response(question) {
    let response = (<HTMLInputElement>document.getElementById("text-reponse")).value;
    console.log(question,response);
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
      .subscribe((data: any) => {
        if (data.code > 0) {
          this.shopDetails = data.data;
          console.log(this.shopDetails);
        }
      }, (error) => {
        console.log(error);
      })
  }

  viewModalTo(option, shop) {
    this.shopDetails = shop;
    this.optionToDo = option;
    document.getElementById('btn-modal').click()
  }


  actionEjecut() {
    // aproveOption
    if (this.optionToDo == 0) {
      console.log('aprove shop');
    }
    // reject option
    else if (this.optionToDo == 1) {
      console.log('reject option');
    }
    // block shop
    else if (this.optionToDo == 2) {
      console.log('block shop');
    }
    // suspender shop
    else if (this.optionToDo == 3) {
      console.log('suspender shop');
    }
  }


}
