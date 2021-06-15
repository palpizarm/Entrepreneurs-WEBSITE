import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  @Input() items : any[];

  constructor(private router : Router) { 
    
  }

  ngOnInit(): void {
  }


  goToItem(item){
    console.log(item.id_item);
    this.router.navigate(['itemView',item.id_item])
  }

}
