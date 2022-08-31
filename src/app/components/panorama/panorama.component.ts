import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-panorama',
  templateUrl: './panorama.component.html',
  styleUrls: ['./panorama.component.scss'],
})
export class PanoramaComponent implements OnInit {

  @Input() panorama : Result;
  @Input() index : number;

  constructor(private iab: InAppBrowser) { }

  ngOnInit() {}

  openArticle(){
    console.log('oli')
    const browser = this.iab.create(this.panorama.link);
    browser.show();   
  }

}
