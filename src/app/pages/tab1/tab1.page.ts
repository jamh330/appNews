import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article, NewsResponse, Result } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';
import { environment } from 'src/environments/environment';

const modeC = environment.mode;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  @ViewChild(IonInfiniteScroll, {static:true}) infiniteScroll:IonInfiniteScroll;
  public articles: Article[]=[];
  public panoramas: Result[]=[];
  page:number=1;
  public mode:number= modeC;
  

  constructor(private newsService:NewsService) {}

  ngOnInit() {

    if(this.mode==1){

    this.newsService.getTopHeadLines(this.page).subscribe(resp=>{
      console.log(resp.articles);
      this.articles=resp.articles;
     }); 
    }

    if(this.mode == 0){
    this.newsService.getPanoramas(this.page).subscribe(resp=>{
      console.log(resp.results);
      this.panoramas=resp.results;
    }); 
  }

  }

  loadData(event:any){
    console.log(event);
    this.page += 1;

    if(this.mode == 1){
    this.newsService.getTopHeadLines(this.page).subscribe(resp=>{
      if(resp.articles.length ===0){
        this.infiniteScroll.disabled = true;
      }
      this.articles= [...this.articles,...resp.articles];
      this.infiniteScroll.complete();
    }); 
  }

  if(this.mode == 0){

    this.newsService.getPanoramas(this.page).subscribe(resp=>{
      console.group();
      console.log(resp);
      console.log(resp.results);
      console.log(resp.results.length);
      console.groupEnd();
      if(resp.results.length ===0){
        this.infiniteScroll.disabled = true;
      }
      this.panoramas= [...this.panoramas,...resp.results];
      this.infiniteScroll.complete();
    }); 

  }


  }

}
