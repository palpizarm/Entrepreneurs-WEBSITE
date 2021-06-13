import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: any = [];
  bestSellerItems: any = [];
  newItems: any = [];

  constructor(private homeService: HomeService) {
    this.homeService.getTopCategories()
      .subscribe((data: any) => {
        if (data.code > 0) {
            this.categories = data.data;
        }
      }, (error) => {
        console.log(error);
      })
    this.homeService.getBestSellerItems()
      .subscribe((data: any) => {
        if (data.code > 0) {
          this.bestSellerItems = data.data;
        }
      }, (error) => { })
    this.homeService.getTopNewItems()
      .subscribe((data: any) => {
        if (data.code > 0) {
          this.newItems = data.data;
        }
      }, (error) => { })
  }

  ngOnInit(): void {
  }


}
