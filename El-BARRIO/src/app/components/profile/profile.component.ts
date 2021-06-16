import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  customerFlag: boolean = false;
  options: boolean[] = [true, false, false, false];
  userData: any = {};
  readonlyInfo: boolean = true;
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
    image : ''
  }
  loading: boolean = false;
  msgError: string = '';
  errorLogin: boolean = false;
  items: any[] = [];

  selectedItem:any= {};

  constructor(private shopService: ShopService, private itemService: ItemsService) {
    if (localStorage.getItem('session')) {
      this.fillUser();
    }
  }

  fillUser() {
    this.userData = JSON.parse(localStorage.getItem('session'));
    this.customerFlag = this.userData.id_customer == 2;
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

  ngOnInit(): void {

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
        this.loadItemsByShop();
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

  loadItemsByShop() {
    let id_shop = JSON.parse(localStorage.getItem('session')).id_shop;
    this.shopService.getShopItemsEntrepreneur(id_shop)
      .subscribe((data: any) => {
        this.items = data.data;
        console.log(this.items);
      })
  }

  changeStatus(item, newStatus) {
    this.loading = true;
    this.itemService.changeItemStatus(newStatus, item.id_item)
      .subscribe((data: any) => {
        if (data.code > 0) {
          this.loadItemsByShop();
        }
      }, (error) => {
        console.log(error);
      })
    this.loading = false;
  }


  openModalToAdd(item){
    this.selectedItem = item;
    document.getElementById('btn-modalAdd').click()
  }

}
