import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article, NewsResponse, PanoramaCategories, Result } from 'src/app/interfaces';
import { IonContent, IonInfiniteScroll, Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

const modeC = environment.mode;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonInfiniteScroll, {static:true}) infiniteScroll:IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;
  public articles: Article[]=[];
  categories:string[]=['business','entertainment','general','health','science','sports','technology'];
  panoramaCategories:any=[];
  page:number=1;
  selectedCategory:string;
  selectedCategoryPanorama:number;
  backToTop: boolean = false;
  public mode:number=modeC;
  public panoramas: Result[]=[];
  public categoryPlace:number[] = [126, 177, 118, 136, 145, 144, 44, 146, 139, 60, 168, 178, 32, 156]

  constructor(private newsService:NewsService, public platform: Platform) {}

  ngOnInit() {

    if(this.mode==1){
    this.selectedCategory=this.categories[0];
    this.newsService.getTopHeadLines(this.page).subscribe(resp=>{
      console.log(resp);
      this.articles=resp.articles;
    }); 
  }

  if(this.mode==0){

    this.newsService.getPanoramaCategories().subscribe(resp=>{      
      this.panoramaCategories=resp;
      console.log(this.panoramaCategories); 
      console.log(this.selectedCategoryPanorama);
      this.selectedCategoryPanorama=resp[0].id;
    }); 

    
    this.newsService.getPanoramas(this.page).subscribe(resp=>{
      console.log(resp.results);
      this.panoramas=resp.results;
    }); 

    
  }



  }

  segmentChanged(event:any){
    this.infiniteScroll.disabled=false;
    this.page=1;
    
    if(this.mode==1){
      this.selectedCategory=event.detail.value;
    this.newsService.getTopHeadLinesByCategories(this.page,this.selectedCategory).subscribe(resp=>{
      console.log(resp);
      this.articles=resp.articles;
    }); 
  }

  if(this.mode==0){
    this.selectedCategoryPanorama=event.detail.value;
    console.log(this.selectedCategoryPanorama)
    console.log(this.categoryPlace.find(select => select == this.selectedCategoryPanorama))

    if(this.categoryPlace.find(select => select == this.selectedCategoryPanorama)){
      this.newsService.getLugarByCategories(this.page,this.selectedCategoryPanorama).subscribe(resp=>{
        console.log(resp);
        this.panoramas=resp.results;
        
      }); 
    }

    else{
    this.newsService.getPanoramaByCategories(this.page,this.selectedCategoryPanorama).subscribe(resp=>{
      console.log(resp);
      this.panoramas=resp.results;
    }); 
    
  }

  }

  }

  loadData(event:any){
    console.log(event);
    this.page += 1;
    if(this.mode==1){
    this.newsService.getTopHeadLinesByCategories(this.page,this.selectedCategory).subscribe(resp=>{
      if(resp.articles.length ===0){
        this.infiniteScroll.disabled = true;
      }
      this.articles= [...this.articles,...resp.articles];
      this.infiniteScroll.complete();
    }); 
  }

  if(this.mode==0){
    this.newsService.getPanoramaByCategories(this.page,this.selectedCategoryPanorama).subscribe(resp=>{
      if(resp.results.length ===0){
        this.infiniteScroll.disabled = true;
      }
      this.panoramas= [...this.panoramas,...resp.results];
      this.infiniteScroll.complete();
    }); 
  }

  }

  getScrollPos(pos: number) {
    if (pos > this.platform.height()) {
         this.backToTop = true;
    } else {
         this.backToTop = false;
    }
}



}
