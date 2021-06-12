import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {
  count : number = 1;
  item = {
    img : '',
    name : '',
    price : '',
  }
  rating:any[] = ['fa fa-star fa-2x starGold','fa fa-star fa-2x starGold','fa fa-star fa-2x starGold','fa fa-star fa-2x','fa fa-star fa-2x'];
  constructor() { }
  items:any[] = [1,2,3];
  ngOnInit(): void {
  }

  quantityAdd() {
    this.count = this.count + 1;
  }

  quantitySub() {
    if (this.count > 1) {
      this.count = this.count - 1;
    }
  }

}
