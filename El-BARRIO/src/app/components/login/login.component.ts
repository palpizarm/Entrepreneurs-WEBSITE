import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string = '';
  password:string = '';

  constructor(private router:Router) { 
  }

  ngOnInit(): void {

  }


  startLogin(event) {
    console.log(this.username, this.password);
    //setTimeout("window.location.reload()",500);

    this.router.navigate(['/profileInformation']);
    

  }

}
