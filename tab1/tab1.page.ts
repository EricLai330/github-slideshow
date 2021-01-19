import { Component } from '@angular/core';
import { PopoverController} from '@ionic/angular';
import { LanguagePopoverPage } from './../pages/language-popover/language-popover.page';
import { StickerPopoverPage } from './../pages/sticker-popover/sticker-popover.page';
import { GlobalService } from "../global.service";
//import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  constructor(
    private popoverCtrl: PopoverController,
    public global: GlobalService
      ) 
      { 
      this.global.startScan();  
      this.global.startScanBle();
      }

  ngOnInit() {
  } //ngOnInit

  ionViewDidEnter() {
    this.global.tabNow=1;
    console.log('Enter Tab1 BLE view');
    this.global.sLocation = this.global.basicLocation;
    this.global.sMode = this.global.basicMode;
    this.global.sPC = this.global.basicCP;
    if(this.global.basicCPModeID==1) 
      this.global.sPC+=' IRC';
    else
      this.global.sPC+=' DIG';
    //if(this.global.basicCPModeID==2) this.global.sPC+=' DIG';
    this.global.sLog = this.global.basicInterval;
  } //ionViewDidEnter

  async openLanguagePopover(ev) {
    const popover = await this.popoverCtrl.create({
      component: LanguagePopoverPage,
      event: ev
      });
     await popover.present();
    }//openLanguagePopover

  async openStickerPopover(ev) {
    const popover = await this.popoverCtrl.create({
      component: StickerPopoverPage,
      event: ev
    });
    await popover.present();
    }//openStickerPopover

    refreshBasic(){
      this.global.scanMain();
    }//refreshBasic
}//ts
