import { Component} from '@angular/core';
//import { PopoverController} from '@ionic/angular';
import { GlobalService } from "../global.service";
//import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    public global: GlobalService,
      ) { }

  ionViewDidEnter() {
    console.log('Enter Tabs ionView'); 
    this.global.tabNow=0;
  } //ionViewDidEnter

} //ts