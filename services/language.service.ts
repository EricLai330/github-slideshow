import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = '';

  constructor(private translate: TranslateService, private storage: Storage, private plt: Platform) { }

  setInitialAppLanguage() {
    // Since there is only one language, recomment
    let language = this.translate.getBrowserLang();
    if( (language!='en')&&(language!='es')&&(language!='fr')&&(language!='zh') )
      language='en';
    this.translate.setDefaultLang(language);
 //   this.translate.setDefaultLang('en');
    this.translate.use(language);
    console.log('language=',language);
/*
    this.storage.get(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
    }); 
 */   
  }


    getLanguages() {
      return [
        { text: 'English', value: 'en' },
        { text: '繁體中文', value: 'zh' },
        { text: 'Español', value: 'es' },
        { text: 'français', value: 'fr' },
      ];
    }
 
  setLanguage(lng) {
    this.translate.use(lng);
    this.selected = lng;
    this.storage.set(LNG_KEY, lng);
  }
}
