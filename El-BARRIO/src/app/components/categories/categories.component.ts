import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoriesData: any[] = []
  banner_color: any[] = ['bg-el-barrio-golden', 'bg-el-barrio-dark-blue', 'bg-el-barrio-blue'];


  constructor(private categoryService: HomeService) {
    this.getData();
  }

  ngOnInit(): void {
  }


  getData() {
    this.categoryService.getAllCategoriesItems()
      .subscribe((data: any) => {
        if (data.code > 0) {
          var itemList = data.data;
          var names = this.getAllCategories(itemList);
          names.forEach(element => {
            var items = [];
            for (let index = 0; index < itemList.length; index++) {
              if (itemList[index].nameCategory == element) {
                items.push(itemList[index]);
              }
            }
            this.categoriesData.push(
              {
                'name' : element,
                'items' : items
              }
            )
          })
          console.log(this.categoriesData)
        }
      }, (error) => {
        console.log(error);
      });
  }

  getAllCategories(items: []) {
    var names: string[] = [];
    items.forEach((element: any) => {
      names.push(element.nameCategory);
    });
    var CategoriesNames = new Set(names);
    names = [...CategoriesNames];
    return names;
  }
}
