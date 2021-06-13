import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  session:string = "Perfil";
  userLogin: boolean = false;
  
  constructor(public router : Router) { 
    if (localStorage.getItem('user-session')) {
      try {
        var user = JSON.parse(localStorage.getItem('user-session'));
        this.session = user.user_name;
        this.userLogin = true;
      } catch(error) {
        localStorage.removeItem('user-session');
      }

    }
  }

  ngOnInit(): void {
    
  }

  login() {
    if (localStorage.getItem("user-session")) {
      this.router.navigate(["/profileInformation"]);
      this.userLogin = true;
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.userLogin = false;
    localStorage.removeItem("user-session");
    this.session = 'Iniciar Sesión';
    window.location.reload();

  }

  goShoppingCart() {
    if (localStorage.getItem("user-session")) {
      this.router.navigate(["/shopping-cart"]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  search() {
    let q = (<HTMLInputElement>document.getElementById("input-search")).value;
    if (q != '') {
      this.router.navigate(['search', q]);
    }
  }
}
