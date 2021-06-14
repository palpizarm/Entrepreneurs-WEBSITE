import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  items:any[] = [1,2,3];
  rating:any[] = ['fa fa-star fa-2x starGold','fa fa-star fa-2x starGold','fa fa-star fa-2x starGold','fa fa-star fa-2x starGray','fa fa-star fa-2x starGray'];
  
  constructor(private router : ActivatedRoute) {
    this.router.params.subscribe(params => {
      this.getItemInformation(params['id']);
    })
   }
  
  ngOnInit(): void {
  }

  getItemInformation(id:string) {

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
