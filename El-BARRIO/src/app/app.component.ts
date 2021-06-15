import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'El-BARRIO';
  isAdmin:boolean = false;



  constructor() {
    document.addEventListener('mousemove', ()=> {
      if (localStorage.getItem('session')) {
        let user = JSON.parse(localStorage.getItem('session'));
        if (user.id_customer || user.id_entrepreneur) {
          this.isAdmin = false;
        }
        else {
          this.isAdmin = true;
        }
      } else {
        this.isAdmin = false;
      }
    })
  }
}
