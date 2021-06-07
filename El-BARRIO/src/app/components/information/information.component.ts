import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  about:boolean = true;
  questions:boolean = false;
  politics:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
