import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories:any = [1,2,3,4,5,6]
  banner_color:any[] = ['bg-el-barrio-golden','bg-el-barrio-dark-blue','bg-el-barrio-blue'];
  constructor() { }

  ngOnInit(): void {
  }

}
