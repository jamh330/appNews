import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles/articles.component';
import { IonicModule } from '@ionic/angular';
import { ArticleComponent } from './article/article.component';
import { PanoramaComponent } from './panorama/panorama.component';
import { PanoramasComponent } from './panoramas/panoramas.component';



@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleComponent,
    PanoramasComponent,
    PanoramaComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    ArticlesComponent,
    PanoramasComponent
  ]
})
export class ComponentsModule { }
