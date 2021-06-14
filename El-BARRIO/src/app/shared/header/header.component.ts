import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginSession:boolean = User.sessionIn;
  session:string = User.displayName;

  constructor(public router : Router) { 
  }

  ngOnInit(): void {
    document.addEventListener('mousemove', ()=> {
      if (localStorage.getItem('session')) {
        this.loginSession = true;
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
    if (User.isSession()) {
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
