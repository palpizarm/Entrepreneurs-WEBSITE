import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {
  count: number = 1;
  item: any = {};
  items: any[] = [];
  reviews: any[] = [];
  user: any = {
    id_customer: '',
    name: '',
    annotation: '',
    id_rating: 0,
    image: ''
  };
  ratingList = [true, true, true, false, false];
  loading: boolean = false;
  msg: string = '';

  constructor(private router: ActivatedRoute, private itemService: ItemsService, private shopCartService: ShoppingCartService, private r: Router) {
    this.router.params.subscribe(params => {
      this.getItemInformation(params['id']);
    })
    if (localStorage.getItem('session')) {
      var userData = JSON.parse(localStorage.getItem('session'));
      this.user.name = userData.name;
      if (userData.id_customer) {
        this.user.id_customer = userData.id_customer;
      }
      else {
        this.user.id_customer = userData.id_entrepreneur;
      }
      this.user.image = userData.image;
    } else {
      r.navigate(['/login'])
    }
  }

  ngOnInit(): void {

  }

  getItemInformation(id: number) {
    this.count = 1;
    this.itemService.getItemInfo(id)
      .subscribe((data: any) => {
        if (data.code > 0) {
          this.item = data.data.item[0];
          this.items = data.data.relatedItems;
          this.reviews = data.data.reviews;
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

  registerReview(form: any) {
    if (form.invalid) {
      Object.values(form.controls).forEach((control: any) => {
        control.markAsTouched();
      })
      if (this.user.rating == 0) {
        this.msg = 'Por favor, califique el producto con las estrellas';
      }
      return;
    }
    this.loading = true;
    this.itemService.setItemReview(this.user.id_customer, this.item.id_item, this.user.id_rating, form.value.annotation)
      .subscribe((data: any) => {
        if (data.code > 0) {
          this.getItemInformation(this.item.id_item);
          this.resetValues();
        }
      }, error => {
        console.log(error);
        this.loading = false;
      })


  }

  AddItem() {
    let id_item = this.item.id_item;
    let id_user = this.user.id_customer;
    this.loading = true;
    this.shopCartService.addItemShopCart(id_item, id_user, this.count)
      .subscribe((data: any) => {
        if (data.code > 0) {
          document.getElementById('btn-successAdd').click();
          this.resetValues();
        }
        else {
          console.log(data.msg)
          this.loading = false;
        }
      }, error => {
        console.log(error);
        this.loading = false;
      })
  }

  resetValues() {
    this.user.annotation = '';
    this.user.rating = 0;
  }

}
