import { Component, OnInit, ViewChild } from "@angular/core";
import { NewsService } from "src/app/services/news.service";
import {Article,Result} from "src/app/interfaces";
import {
  IonContent,
  IonInfiniteScroll,
  IonSlides,
  Platform,
} from "@ionic/angular";
import { environment } from "src/environments/environment";

const modeC = environment.mode;

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  public articles: Article[] = [];
  categories: string[] = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
  panoramaCategories: any = [];
  panoramaCategoriesId: any[] = [];
  page: number = 1;
  selectedCategory: string;
  selectedCategoryPanorama: number;
  currentIndex: number = 0;
  hayPanoramas: boolean = false;
  cargando: boolean = true;
  backToTop: boolean = false;
  public mode: number = modeC;
  public panoramas: Result[] = [];
  public categoryPlace: number[] = [
    126, 177, 118, 136, 145, 144, 44, 146, 139, 60, 168, 178, 32, 156,
  ];

  constructor(private newsService: NewsService, public platform: Platform) {}

  ngOnInit() {
    if (this.mode == 1) {
      this.selectedCategory = this.categories[0];
      this.newsService.getTopHeadLines(this.page).subscribe((resp) => {
        console.log(resp);
        this.articles = resp.articles;
      });
    }

    if (this.mode == 0) {
      this.newsService.getPanoramaCategories().subscribe((resp) => {
        this.panoramaCategories = resp;
        this.selectedCategoryPanorama = resp[0].id;
        this.panoramaCategoriesId = this.panoramaCategories.map(
          (object) => object.id
        );
      });

      // this.newsService.getPanoramas(this.page).subscribe(resp=>{
      //   console.log(resp.results);
      //   this.panoramas=resp.results;
      // });
    }
  }

  async segmentChanged(event: any) {
    this.cargando = true;
    this.hayPanoramas = true;
    this.infiniteScroll.disabled = false;

    this.page = 1;
    this.panoramas = [];

    if (this.mode == 1) {
      this.selectedCategory = event.detail.value;
      this.newsService
        .getTopHeadLinesByCategories(this.page, this.selectedCategory)
        .subscribe((resp) => {
          console.log(resp);
          this.articles = resp.articles;
        });
    }

    if (this.mode == 0) {
      this.selectedCategoryPanorama = event.detail.value;

      this.currentIndex = this.panoramaCategoriesId.indexOf(
        this.panoramaCategoriesId.find(
          (select) => select == this.selectedCategoryPanorama
        )
      );

      if (
        this.categoryPlace.find(
          (select) => select == this.selectedCategoryPanorama
        )
      ) {
        await this.newsService
          .getLugarByCategories(this.page, this.selectedCategoryPanorama)
          .subscribe((resp) => {
            console.log(resp);
            this.panoramas = resp.results;
            this.cargando = false;
            if (resp.results.length > 0) {
              this.hayPanoramas = true;
            } else {
              this.hayPanoramas = false;
            }
          });
      } else {
        await this.newsService
          .getPanoramaByCategories(this.page, this.selectedCategoryPanorama)
          .subscribe((resp) => {
            console.log(resp);
            this.panoramas = resp.results;
            this.cargando = false;
            if (resp.results.length > 0) {
              this.hayPanoramas = true;
            } else {
              this.hayPanoramas = false;
            }
          });
      }

      this.slides.slideTo(this.currentIndex, 0);
    }
  }

  loadData(event: any) {
    console.log(event);
    this.page += 1;
    if (this.mode == 1) {
      this.newsService
        .getTopHeadLinesByCategories(this.page, this.selectedCategory)
        .subscribe((resp) => {
          if (resp.articles.length === 0) {
            this.infiniteScroll.disabled = true;
          }
          this.articles = [...this.articles, ...resp.articles];
          this.infiniteScroll.complete();
        });
    }

    if (this.mode == 0) {
      if (
        this.categoryPlace.find(
          (select) => select == this.selectedCategoryPanorama
        )
      ) {
        this.newsService
          .getLugarByCategories(this.page, this.selectedCategoryPanorama)
          .subscribe((resp) => {
            if (resp.results.length === 0) {
              this.infiniteScroll.disabled = true;
            }
            this.panoramas = [...this.panoramas, ...resp.results];
            this.infiniteScroll.complete();
          });
      } else {
        this.newsService
          .getPanoramaByCategories(this.page, this.selectedCategoryPanorama)
          .subscribe((resp) => {
            if (resp.results.length === 0) {
              this.infiniteScroll.disabled = true;
            }
            this.panoramas = [...this.panoramas, ...resp.results];
            this.infiniteScroll.complete();
          });
      }
    }
  }

  getScrollPos(pos: number) {
    if (pos > this.platform.height()) {
      this.backToTop = true;
    } else {
      this.backToTop = false;
    }
  }

  async slideChanged() {
    this.infiniteScroll.disabled = false;
    this.page = 1;
    this.currentIndex = await this.slides.getActiveIndex();
    this.selectedCategoryPanorama =
      this.panoramaCategories[this.currentIndex].id;
  }
}
