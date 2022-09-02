import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces';

@Component({
  selector: 'app-panoramas',
  templateUrl: './panoramas.component.html',
  styleUrls: ['./panoramas.component.scss'],
})
export class PanoramasComponent implements OnInit {

  @Input() panoramas:Result[];


  constructor() { }

  ngOnInit() {
  }

 

}
