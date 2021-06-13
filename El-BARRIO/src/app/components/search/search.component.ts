import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  items: any[] = [];

  constructor(private router : ActivatedRoute, private itemService : ItemsService) { 
    this.router.params.subscribe(params => {
      this.getItems(params['q']);
    })
  }

  ngOnInit(): void {
  }


  getItems(q:string) {
    this.itemService.serachItems(q)
      .subscribe((data:any) => {
        if (data.code > 0) {
          this.items = data.data;
        }
      }, (error)=> {
        console.log(error);
      }) 
  }

}
