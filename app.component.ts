import { Component } from '@angular/core';
import { Platform,AlertController  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LanguageService } from './services/language.service';
import { GlobalService } from "./global.service";
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})


export class AppComponent {

  constructor(
    private platform: Platform,
    private translateService: TranslateService,
    private statusBar: StatusBar,
    public global: GlobalService,
    public alertController: AlertController,
    private languageService: LanguageService
  ) 
  {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      //this.splashScreen.hide();
      this.global.closeCalled=true;
      this.global.CRCAll01(); //CRC H/L byte
      this.global.CRCAll02(); //CRC H/L byte
      this.languageService.setInitialAppLanguage(); 
    this.platform.backButton.subscribeWithPriority(5, () => {
      console.log('Handler called to force close!');
      if(this.global.closeCalled)
      {
        this.global.closeCalled=false;
        this.showExitConfirm();
      }

    });
    }); //then
  }//initializeApp

  showExitConfirm() {
    var hat:any;
    this.translateService.get('MESSAGEhat').subscribe(
      value =>{ hat=value;});
    var dyw:any;
    this.translateService.get('MESSAGEdyw').subscribe(
      value =>{ dyw=value;});
    var stay:any;
    this.translateService.get('MESSAGEstay').subscribe(
      value =>{ stay=value;});
    var exit:any;
    this.translateService.get('MESSAGEexit').subscribe(
      value =>{ exit=value;});
    this.alertController.create({
      header: hat,
      message: dyw,
      backdropDismiss: false,
      buttons: [{
        text: stay,
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
          this.global.closeCalled=true;
        }
      }, {
        text: exit,
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }//showExitConfirm
  
}//ts

