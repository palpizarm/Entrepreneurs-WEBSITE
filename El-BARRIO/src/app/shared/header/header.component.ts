import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { AdminService } from 'src/app/services/admin.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginSession:boolean = false;;
  session:string = User.displayName;
  cartItemCount:number = 0;

  questionForm = {
    id_customer : '',
    question : ''
  }

  constructor(public router : Router, private cartService : ShoppingCartService, private questionService : AdminService) { 
  }

  ngOnInit(): void {
    document.addEventListener('mousemove', ()=> {
      if (localStorage.getItem('session')) {
        let user = JSON.parse(localStorage.getItem('session'));
        if (!user.id_admin) {
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

  sendMsg(questions) {
    let id_user = JSON.parse(localStorage.getItem('session')).id_user;
    this.questionService.registerQues(id_user,questions)
      .subscribe((data:any) => {
        if (data.code > 0) {
          document.getElementById('closeQuestModal').click();
        }
        else {
          document.getElementById('closeQuestModal').click();
        }
      }, (err) => {
        document.getElementById('closeQuestModal').click();
      })
  }
}
