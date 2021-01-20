import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from "../global.service";
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  information: any[];
  automaticClose = false;

  constructor(
    public global: GlobalService,
    private storage: Storage,
    private translate: TranslateService,
    private http: HttpClient) 
    {
      let langChoice = this.translate.getBrowserLang();
      let a=1;
      a +=1;11
      if( (langChoice!='en')&&(langChoice!='es')&&(langChoice!='fr')&&(langChoice!='zh') )
          langChoice='en';
      console.log('langChoice=',langChoice);
      switch(langChoice) 
      {
        case 'en':{
          langChoice='assets/information.json';
          break;
        }
        case 'zh':{
          langChoice='assets/informationzh.json';
          break;
        }
        case 'es':{
          langChoice='assets/informationspa.json';
          break;
        }
        case 'fr':{
          langChoice='assets/informationfra.json';
          break;
        }
      }//switch
      this.http.get(langChoice).subscribe(res => {
        this.information = res['items'];
    });  
      if( (this.global.connectionBluetooth)&&(!this.global.globalDownloaded)&&(this.global.basicIntervalID>0) )
      {
        this.global.commandIndex=this.global.currentStage=this.global.oldStage=100; //initial write 100
        this.global.dslen=this.global.oldLen=0;
        this.global.BleWrite();
        this.global.startDownload();
      } //if

      } //constructor

      ionViewDidEnter() {
        console.log('Enter Tab2 BLE view');
        this.global.tabNow=2;
        //set
        if(this.global.orgAtt)
        {
          this.information[1].children[0].children[0].name = '';
          this.information[1].children[0].children[0].name = this.global.orgAtt;
          this.information[1].children[0].children[0].name += this.global.currentAttenuator;
        }
            //Current
      } //ionViewDidEnter

      toggleSection(index) {
        if(!this.global.sorted) 
        { 
          this.sortingData();
          this.global.sorted=true;
        }
        this.information[index].open = !this.information[index].open;
        if (this.automaticClose && this.information[index].open) {
          this.information
          .filter((item, itemIndex) => itemIndex != index)
          .map(item => item.open = false);
        }
      } //toggleSection
    
      toggleItem(index, childIndex) {
        this.information[index].children[childIndex].open = !this.information[index].children[childIndex].open;
      } //toggleItem

      sortingData() {
        var iArray: any[]=[];
        var i: number;
        this.information[0].children[0].children[0].name += this.global.sn;
        this.information[0].children[0].children[1].name += this.global.swversion;
    //console.log('atteOne=',this.global.atteOne);
        for(i=0;i<this.global.logCount;i++){iArray[i]=this.global.atteOne[i];}
        iArray.sort(function(a, b) {return a - b;});
    //console.log('atteOne iArray=',iArray); 
            //backup original currentAttenuator
        this.global.orgAtt=this.information[1].children[0].children[0].name;
        this.information[1].children[0].children[0].name += this.global.currentAttenuator;  //Current       
        this.information[1].children[0].children[1].name += 0;  //iArray[0];  //Attenuation,Range,min
        this.information[1].children[0].children[2].name += this.global.centerAttenuator;  //center
        this.information[1].children[0].children[3].name += 3000;   //max
        this.information[1].children[1].children[0].name += iArray[0];  //Attenuation,Position,min
        this.information[1].children[1].children[1].name += iArray[this.global.logCount-1];   //max
    //console.log('tempOne=',this.global.tempOne);
        for(i=0;i<this.global.logCount;i++){iArray[i]=this.global.tempOne[i];}
        iArray.sort(function(a, b) {return a - b;});
        this.information[2].children[0].name += this.tempConvert(this.global.currentTemperature);  //Temperature,Current
        this.information[2].children[1].name += this.tempConvert(iArray[0]);  //min
        this.information[2].children[2].name += this.tempConvert(iArray[this.global.logCount-1]);  //max
    //console.log('i24vOne=',this.global.i24vOne);
        for(i=0;i<this.global.logCount;i++){iArray[i]=this.global.i24vOne[i];}
        iArray.sort(function(a, b) {return a - b;});
        this.information[3].children[0].children[0].name += this.global.current24V;  //24v current
        this.information[3].children[0].children[1].name += iArray[0];  //min
        this.information[3].children[0].children[2].name += iArray[this.global.logCount-1];  //max
    //console.log('i24vrOne=',this.global.i24vrOne);  
        for(i=0;i<this.global.logCount;i++){iArray[i]=this.global.i24vrOne[i];}
        iArray.sort(function(a, b) {return a - b;});        
        this.information[3].children[1].children[0].name += this.global.current24VR;  //24VR current
        this.information[3].children[1].children[1].name += iArray[0];  //min
        this.information[3].children[1].children[2].name += iArray[this.global.logCount-1];  //max            
      } //sortingData

      tempConvert(inum:number){
        var ctemp,ftemp:string;
        ctemp=inum.toString();
        ftemp=((inum*1.8)+32).toFixed(1);
        return ftemp+'/'+ctemp;
      }//tempConvert
} //ts