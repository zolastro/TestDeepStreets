import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analyzing',
  templateUrl: './analyzing.component.html',
  styleUrls: ['./analyzing.component.css']
})
export class AnalyzingComponent implements OnInit {

  monkey: number;

  constructor() { }

  ngOnInit(): void {
    this.monkey = Math.floor(Math.random() * 6);
  }

}
