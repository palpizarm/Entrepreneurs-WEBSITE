import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  session:string = "Iniciar Sesión";
  userLogin: boolean = false;
  
  constructor(public router : Router) { 
    if (localStorage.getItem('user-session')) {
      var user = JSON.parse(localStorage.getItem('user-session'));
      this.session = user.user_name;
      this.userLogin = true;
    }
  }

  ngOnInit(): void {
  }


  login() {
    if (localStorage.getItem("user-session")) {
      this.router.navigate([""]);
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

}
