import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {
  count : number = 1;
  item:any = {};
  items:any[] = [];
  reviews:any[] = [];
  rating:any[] = ['fa fa-star fa-2x starGold','fa fa-star fa-2x starGold','fa fa-star fa-2x starGold','fa fa-star fa-2x starGray','fa fa-star fa-2x starGray'];
  user:any={
    name: '',
    annotation : '',
    rating : ''
  };
  loading :boolean = false;

  constructor(private router : ActivatedRoute, private itemService : ItemsService) {
    this.router.params.subscribe(params => {
      this.getItemInformation(params['id']);
    })
    var userData = JSON.parse(localStorage.getItem('session'));
    this.user.name = userData.name;
  }
  
  ngOnInit(): void {
  }

  getItemInformation(id:number) {
    this.itemService.getItemInfo(id)
      .subscribe((data:any) => {
        if (data.code > 0) {
          this.item = data.data.item[0];
          this.items = data.data.relatedItems;
          this.reviews = data.data.reviews;
          console.log(this.item);
          console.log(this.items);
          console.log(this.reviews);
        }
      }, (error) => {
        console.log(error);
      })
  }

  quantityAdd() {
    this.count = this.count + 1;
  }

  quantitySub() {
    if (this.count > 1) {
      this.count = this.count - 1;
    }
  }

  registerReview(form:any){

  }

}
