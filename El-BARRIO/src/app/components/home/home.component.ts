import { Component, OnInit } from '@angular/core';
import { ItemscategoriesService } from 'src/app/services/itemscategories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories:any = [];

  constructor(private categoriesService:ItemscategoriesService) { 
    this.categoriesService.getTopCategories()
      .subscribe((data:any) => {
        if (data.code > 0) {
          (data.data).forEach( categorie => {
            this.categories.push(categorie.name);
          });
        }
      },(error) => {
      })
  }

  ngOnInit(): void {
  }

}
