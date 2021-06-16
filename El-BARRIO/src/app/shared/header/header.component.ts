import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginSession:boolean = User.sessionIn;
  session:string = User.displayName;
  cartItemCount:number = 0;
  constructor(public router : Router, private cartService : ShoppingCartService) { 
  }

  ngOnInit(): void {
    document.addEventListener('mousemove', ()=> {
      if (localStorage.getItem('session')) {
        let user = JSON.parse(localStorage.getItem('session'));
        if (user.id_customer || user.id_entrepreneur) {
          this.loginSession = true;
          this.cartService.getItemCartQuantity(user.id_customer)
            .subscribe((data:any) => {
              if (data.code > 0) {
                this.cartItemCount = data.data[0].count;
              }
              else {
                this.cartItemCount = 0;
              }
            }, (error) => {
            })
        }
      }
    })
    
  }

  login() {
    if (localStorage.getItem('session')) {
      this.router.navigate(["/profileInformation"]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    User.logout();
    this.loginSession = false;
    localStorage.removeItem('session');
    this.router.navigate(['/home']);
    
  }

  goShoppingCart() {
    if (localStorage.getItem('session')) {
      this.router.navigate(["/shopping-cart"]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  search() {
    let q = (<HTMLInputElement>document.getElementById("input-search")).value;
    if (q != '') {
      this.router.navigate(['/search', q]);
    }
  }
}
