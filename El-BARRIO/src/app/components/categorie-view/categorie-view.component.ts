import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-categorie-view',
  templateUrl: './categorie-view.component.html',
  styleUrls: ['./categorie-view.component.css']
})
export class CategorieViewComponent implements OnInit {
  items:any[] = [{}]
  constructor(private router : ActivatedRoute, private homeService : HomeService) { 
    this.router.params.subscribe(params => {
      this.getItemsByCategory(params['id']);
    })
  }


  getItemsByCategory(id:number){
    this.homeService.getItemsByCategory(id)
      .subscribe((data:any) => {
        if (data.code > 0) {
          this.items = data.data;
          console.log(this.items);
        }
      }) 
  }

  ngOnInit(): void {
  }

}
