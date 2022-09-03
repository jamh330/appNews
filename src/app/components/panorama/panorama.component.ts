import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import {Share} from '@capacitor/share';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-panorama',
  templateUrl: './panorama.component.html',
  styleUrls: ['./panorama.component.scss'],
})
export class PanoramaComponent implements OnInit {

  @Input() panorama : Result;
  @Input() index : number;

  constructor(private iab: InAppBrowser, private actionSheetCtrl:ActionSheetController,private storageService:StorageService) { }

  ngOnInit() {}

  openArticle(){
    console.log('oli')
    const browser = this.iab.create(this.panorama.link);
    browser.show();   
  }

  async openMenu(){
    
    const panoramaInFavorite= this.storageService.panoramaInFavorites(this.panorama);
    const actionSheet = await  this.actionSheetCtrl.create({
      header: 'options',
      buttons: [
        {
          text:'Share',
          icon: 'share-outline',
          handler : ()=> this.shareArticle()
        },
        {
          text: panoramaInFavorite ? 'Remove':'Favorite',
          icon: panoramaInFavorite ? 'heart':'heart-outline',
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
  this.storageService.saveOrRemovePanorama(this.panorama)
}

}
