import { Component } from '@angular/core';
import { Result } from 'src/app/interfaces';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  get panoramas():Result[]{
    return this.storageService.getLocalPanoramas;
  }

  constructor(private storageService:StorageService) {}

}
