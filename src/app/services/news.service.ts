import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NewsResponse, PanoramaCategories, PanoramaResponse } from '../interfaces';

const apiKey = environment.apiKey;
const url = environment.url;
const urlPanorama = environment.urlPanorama;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private htpp:HttpClient) { }

  getTopHeadLines(page:number){
    return this.htpp.get<NewsResponse>(`${url}`, {
      params:{
        apiKey: apiKey,
        country: 'us',
        category: 'business',
        page: page
      }
    });
  }

  getPanoramas(page:number){
    return this.htpp.get<PanoramaResponse>(`${urlPanorama}`, {
      params:{
        page: page
      }
    });
  }

  getPanoramaCategories(){
    return this.htpp.get<PanoramaCategories>('https://tupanoramaurbano.cl/wp-json/wp/v2/categories' , {
      params:{
        per_page: 100,
        exclude: '1,172,719,181,171,623',
      }
    });
  }

  getTopHeadLinesByCategories(page:number, category:string){
    return this.htpp.get<NewsResponse>(`${url}`, {
      params:{
        apiKey: apiKey,
        country: 'us',
        category: category,
        page: page
      }
    });
  }


  getPanoramaByCategories(page:number, category:number){
    return this.htpp.get<PanoramaResponse>(`${urlPanorama}`, {
      params:{
        cat: category,
        page: page
      }
    });
  }



}
