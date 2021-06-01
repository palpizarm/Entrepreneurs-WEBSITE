import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  session:string = "Iniciar Sesión";

  constructor(public router : Router) { }

  ngOnInit(): void {
  }


  login() {
    if (localStorage.getItem("user-session")) {
      this.router.navigate([""]);
      this.session = "Pablo Alpizar"
    } else {
      this.router.navigate(['login']);
    }
  }

}
