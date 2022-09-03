import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article, Result } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _articles:Article[]=[];
  private _panoramas:Result[] = [];

  get getLocalPanoramas(){
    return [...this._panoramas];
  }

  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    await this.loadFavorites();
  }

async saveOrRemoveArticle(article:Article){
  this._articles = [article,...this._articles];
  this._storage.set('articles',this._articles);
}

async saveOrRemovePanorama(panorama:Result){
  const exists = this._panoramas.find(localPanorama =>localPanorama.id===panorama.id);

  if(exists){
    this._panoramas = this._panoramas.filter(localPanorama=>localPanorama.id != panorama.id);
  }else{
    this._panoramas = [panorama,...this._panoramas];
  }
  
  this._storage.set('panoramas',this._panoramas);
}

async loadFavorites(){
  try {
    const panoramas = await this._storage.get('panoramas');
    this._panoramas= panoramas || [];
  } catch (error) {
    console.log(error);
    
  }
}

panoramaInFavorites(panorama:Result){
  return !!this._panoramas.find(localPanorama => localPanorama.id ===panorama.id);
}


}
