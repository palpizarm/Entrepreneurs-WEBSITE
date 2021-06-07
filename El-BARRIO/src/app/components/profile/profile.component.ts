import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  customerFlag:boolean = false;
  tabs:boolean[] = [true,false,false,false];

  constructor() { }

  ngOnInit(): void {
  }

  showTab(activeTab:number) {
    for (let index = 0; index < this.tabs.length; index++) {
      this.tabs[index] = false;
    }
    this.tabs[activeTab] = true;
  }

}
