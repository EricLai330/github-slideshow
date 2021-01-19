import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from "./../../global.service";

@Component({
  selector: 'app-sticker-popover',
  templateUrl: './sticker-popover.page.html',
  styleUrls: ['./sticker-popover.page.scss'],
})
export class StickerPopoverPage implements OnInit {
  
  stickers = [];
  selected = '';

  constructor(private popoverCtrl: PopoverController,
    public global: GlobalService
    ) { }

  ngOnInit() {
  } //ngOnint

  select(lng) {
 //   this.languageService.setLanguage(lng);
  this.selected = lng;
    this.popoverCtrl.dismiss();
//    this.selected = <img [src]="https://nuxight.com/ezunify/pic/sticker/1/Focus-0000000009.jpg?ut=1580960808952"> ;
  } //select this.clipboard.copy(this.selected)

} //ts
