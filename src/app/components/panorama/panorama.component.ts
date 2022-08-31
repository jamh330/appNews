import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import {Share} from '@capacitor/share';

@Component({
  selector: 'app-panorama',
  templateUrl: './panorama.component.html',
  styleUrls: ['./panorama.component.scss'],
})
export class PanoramaComponent implements OnInit {

  @Input() panorama : Result;
  @Input() index : number;

  constructor(private iab: InAppBrowser, private actionSheetCtrl:ActionSheetController) { }

  ngOnInit() {}

  openArticle(){
    console.log('oli')
    const browser = this.iab.create(this.panorama.link);
    browser.show();   
  }

  async openMenu(){

    const actionSheet = await  this.actionSheetCtrl.create({
      header: 'options',
      buttons: [
        {
          text:'Share',
          icon: 'share-outline',
          handler : ()=> this.shareArticle()
        },
        {
          text:'Favorite',
          icon: 'heart-outline',
          handler : ()=> this.onToggleFavorite()
        },
        {
          text:'Cancel',
          icon: 'close-outline',
          role : 'cancel'
        }
    ]
    });

    await actionSheet.present();
}

async shareArticle(){

await Share.share({
  title: this.panorama.title,
  text: this.panorama.description,
  url: this.panorama.link
});

}

onToggleFavorite(){

}

}
