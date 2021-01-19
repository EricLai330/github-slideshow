import { Component } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { GlobalService } from "../global.service";
import { LoadingController } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
 
  csvData: any[] = [];
  headerRow: any[] = [];

  csvEvent: any[] = [];
  headerEvent: any[] = [];

  hideChart:boolean;  //=false;
  hideCSV:boolean;  //=true;


 // Data
 chartData: ChartDataSets[] = [{data: [], label: 'Attenuator',fill:false,yAxisID: 'A1X'},
          {data: [], label: 'Temperature',fill:false,yAxisID: 'A2X'},
          {data: [], label: 'Pilot',fill:false,yAxisID: 'A2X'}
        ];
 chartData4: ChartDataSets[] = [{ data: [], label: '24V',fill:false,yAxisID: '24V'},
          { data: [], label: '24V Ripple',fill:false,yAxisID: '24V Ripple'}];

 chartLabels: Label[];

 // Options
 chartOptions = {
   responsive: true,
   maintainAspectRatio: false,
   scales: {
    yAxes: [{
      id: 'A1X',
      type: 'linear',
      position: 'left',
      ticks: {
        max: 3000,
        min: 0,
        stepSize: 1000
      },
    }, {
      id: 'A2X',
      type: 'linear',
      position: 'right',
      ticks: {
        max: 400,
        min: 0,
        stepSize: 20
    },
    }],
    },//scales
   title: {
     display: true,
     text: 'AGC Data'
   },
   pan: {
     enabled: true,
     mode: 'xy'
   },
   zoom: {
     enabled: true,
     mode: 'xy'
   }
 };

 chartOptions4 = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      id: '24V',
      type: 'linear',
      position: 'left',
      ticks: {
        max: 25.0,
        min: 23.0,
        stepSize: 0.4
      },
    }, {
      id: '24V Ripple',
      type: 'linear',
      position: 'right',
      ticks: {
        max: 20.0,
        min: 0.0,
        stepSize: 5.0
      },
    }],
    },//scales
  title: {
    display: true,
    text: 'Power Supply'
  },
  pan: {
    enabled: true,
    mode: 'xy'
  },
  zoom: {
    enabled: true,
    mode: 'xy'
  }
};

 chartColors: Color[] = [
   {
     borderColor: '#000000',
     backgroundColor: '#ffffff' //
   }
 ];
 chartType = 'line';
 showLegend = true;

  constructor( 
    public global: GlobalService,
    private translateService: TranslateService,
    private http: HttpClient,
    private loadingCtrl:LoadingController,
    private papa: Papa,
    private emailComposer: EmailComposer,
    private plt: Platform,
    private file: File,
    private socialSharing: SocialSharing
    ) {

    if((this.global.connectionBluetooth)&&(this.global.basicIntervalID>0))
    {
      if(!this.global.globalDownloaded)
      {
        this.global.commandIndex=this.global.currentStage=this.global.oldStage=100; //initial write 100
        this.global.dslen=this.global.oldLen=this.global.dslenTotal=0;
        this.global.BleWrite();
  //     this.global.startDownload();
        console.log('test11111111111111111111');
        this.T4startDownload();
      } //if
      else
      {
        this.T4LoadCSV();       //log
        this.T4ProcessEvent(); //event
        this.T4LoadEvent(); //reading 2048
      } //else
    }//if

  } //constructor

  ionViewDidEnter() {
    console.log('Enter Tab4 BLE view');
    this.global.tabNow=4;
    this.hideChart=true;
    this.hideCSV=true;
  } //ionViewDidEnter

  getData() {
    this.chartLabels = [];
    this.chartData[0].data = [];
    this.chartData[1].data = [];
    this.chartData[2].data = [];
    this.chartData4[0].data = [];
    this.chartData4[1].data = [];
    for(var i=0;i<this.global.logCount;i++)
    {
      if((i%16)==0) this.chartLabels.push(this.csvData[i][0].slice(5,16));
      this.chartData[0].data.push(this.csvData[i][2]);  //Attenuator
      this.chartData[1].data.push(this.csvData[i][1]);  //temperature
      this.chartData[2].data.push(this.csvData[i][3]);  //pilot

      this.chartData4[0].data.push(this.csvData[i][4]);
      this.chartData4[1].data.push(this.csvData[i][5]);
    }
    console.log('chartdata0',this.chartData[0].data);
    console.log('chartdata1',this.chartData[1].data);
    console.log('chartdata2',this.chartData[2].data);
  } //getData

  typeChanged(e) {
    const on = e.detail.checked;
    this.chartType = on ? 'line' : 'bar';
  } //typeChanged
 
  downloadDSIMData(){
    this.hideCSV=true;
    this.hideChart=false;
    console.log("switch to chart");
  } //downloadDSIMData
  
  showCSV(){
    this.hideCSV=false;
    this.hideChart=true;
    console.log("switch CSV table");
  }//showCSV

  sendData(){
    if(this.global.connectionBluetooth)
    {
      this.exportCSV();
      this.exportEvent();
      console.log("Send Data through other App");
    }
  }//sendData

  async loadCSV() {
    await this.http
      .get('./assets/dsimheader.csv', {
        responseType: 'text'
      })
      .subscribe(
        data => this.extractData(data),
        err => console.log('something went wrong: ', err)
      );
  }//loadCSV
 
  public extractData(res) 
  {
//    let csvData = res || '';
 
//    console.log('Here is data',res);
    this.papa.parse(res, {
      complete: parsedData => {
        this.headerRow = parsedData.data.splice(0, 1)[0];
        this.csvData = parsedData.data;
        var next:any; //Get current time
        var now = new Date();
        var num: number;

        //console.log(this.DateFormat(now));

        for (var i=0;i<this.global.logCount;i++)
        {
          this.csvData[i][0]=this.global.timeOneString[i];
          this.csvData[i][1]=this.global.tempOne[i];
          this.csvData[i][2]=this.global.atteOne[i];
          this.csvData[i][3]=this.global.pilotOne[i];
          this.csvData[i][4]=this.global.i24vOne[i];
          this.csvData[i][5]=this.global.i24vrOne[i];
        }  

    //sorting time
        var temp:number,tempS:string,numa:number,numb:number;
        var a:number,b:number,x:number;
        var aStr:string,bStr:string;
        let tArray:any;
        for(a=0;a<this.global.logCount;a++)
        { 
          for(b=(a+1);b<this.global.logCount;b++)
          {
            aStr=this.csvData[a][0];
            bStr=this.csvData[b][0];
            numa = parseInt(aStr,10);
            numb = parseInt(bStr,10);
            if(numa < numb)
            { 
              tArray=this.csvData[a];
              this.csvData[a]=this.csvData[b];
              this.csvData[b]=tArray; 
            }
          }
        }

        for (var i=0;i<this.global.logCount ;i++)
        { 
          //console.log('time before sort',this.csvData[i][0]);
          num=parseInt(this.csvData[i][0], 10);
          next = this.adjustMinutesToDate(now,num);
          this.csvData[i][0]=this.DateFormat(next);
          //console.log('time after sort',this.csvData[i][0]);
        } 

       this.getData(); //config chart data
      }
    });
  } //extractData

  exportCSV() {
    let csv = this.papa.unparse({
      fields: this.headerRow,
      data: this.csvData
    });
    let fileShareName='Log-'+this.global.basicLocation+'.csv';
    console.log('fileShareName',fileShareName);
    if (this.plt.is('cordova')) {
      this.file.writeFile(this.file.dataDirectory, fileShareName, csv, {replace: true}).then( res => {
        this.socialSharing.share(null, null, res.nativeURL, null).then(e =>{
          // Success
        }).catch(e =>{
          console.log('Share failed:', e)
        });
      }, err => {
        console.log('Error: ', err);
      });
    } 
  } //exportCSV

  exportEvent() {
    let csv = this.papa.unparse({
      fields: this.headerEvent,
      data: this.csvEvent
    });
    let fileShareEvent='Event-'+this.global.basicLocation+'.csv';
    console.log('fileShareEvent',fileShareEvent);
    if (this.plt.is('cordova')) {
      this.file.writeFile(this.file.dataDirectory, fileShareEvent, csv, {replace: true}).then( res => {
        this.socialSharing.share(null, null, res.nativeURL, null).then(e =>{
          // Success
        }).catch(e =>{
          console.log('Share failed:', e)
        });
      }, err => {
        console.log('Error: ', err);
      });
    } 
  } //exportEvent

    adjustMinutesToDate(date, minutes) {
      return new Date(date.getTime() - minutes*60000);
    }//adjustMinutesToDate
    
    DateFormat(date){
    var days = date.getDate();
    var year = date.getFullYear();
    var month = (date.getMonth()+1);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = year + '-' + month + '-' + days+ ' ' +hours + ':' + minutes;
//    var strTime = days + '/' + month + '/' + year + '/ '+hours + ':' + minutes;
    return strTime;
    }

    async T4startDownload() {
      this.global.loadingTimeout=0;
      var mymsg:any;
      this.translateService.get('MESSAGEdl').subscribe(
        value =>{ mymsg=value;});
      const loading = await this.loadingCtrl.create({  
        message: mymsg  
        });  
        loading.present(); 

      const interval4 = setInterval(() => {
        this.global.loadingTimeout++;
        if((this.global.currentStage == this.global.oldStage) && (this.global.dslen==this.global.oldLen))
        {
          //rewrite Ble with old Stage
          if(!this.global.globalDownloaded)
          {
            console.log('T4 dslen',this.global.dslen);
            this.global.dslen=this.global.oldLen=0;
            this.global.oldStage =this.global.currentStage=this.global.commandIndex;
            this.global.dsOneTemp=[]; //clear
            this.global.BleWrite();
            console.log('T4 rewrite stage',this.global.currentStage);
          }
        }
        else
        { 
          //update stage
          this.global.oldStage =this.global.currentStage=this.global.commandIndex;
          this.global.oldLen = this.global.dslen;
          console.log('updata stage',this.global.currentStage);
        }
        if (this.global.globalDownloaded) {
          console.log('test222222222222222222');
          this.T4LoadCSV(); //log
          this.T4ProcessEvent(); //event
          this.T4LoadEvent();
          loading.dismiss();
          clearInterval(interval4);
        }
        if (this.global.loadingTimeout>15) {
          clearInterval(interval4);
          loading.dismiss();
          var sr:any;
          this.translateService.get('MESSAGEdl').subscribe(
            value =>{sr=value;});
          var nabdf:any;
          this.translateService.get('MESSAGEdct').subscribe(
            value =>{ nabdf=value;});
          this.global.showAlert(sr,nabdf);
        }
      }, 2000);
    } // T4startDownload

    async T4LoadCSV() {
      var mymsg:any;
      this.translateService.get('MESSAGEpd').subscribe(
        value =>{ mymsg=value;});
      const loading = await this.loadingCtrl.create({  
        message: mymsg   
        });  
        loading.present(); 
        await this.http.get('./assets/dsimheader.csv', {
          responseType: 'text'
        })
        .subscribe(
          data => {this.extractData(data);loading.dismiss();},
          err => console.log('something went wrong: ', err)
        );
    } // T4LoadCSV

    sendEmail(){
   //   if(!this.global.eventDownloaded)
   //       this.T4LoadEvent(); //reading 2048
      if(!this.global.connectionBluetooth)
          return;
      let csv = this.papa.unparse({
        fields: this.headerRow,
        data: this.csvData
      });
      let fileShareName='Log-'+this.global.basicLocation+'.csv';
      this.file.writeFile(this.file.dataDirectory, fileShareName, csv, {replace: true});

      let csv1 = this.papa.unparse({
        fields: this.headerEvent,
        data: this.csvEvent
      });
      let fileShareEvent='Event-'+this.global.basicLocation+'.csv';
      this.file.writeFile(this.file.dataDirectory, fileShareEvent, csv1, {replace: true});

      let email = {
        to: '',
        cc: '',
        attachments: [
          this.file.dataDirectory+'/'+fileShareName,
          this.file.dataDirectory+'/'+fileShareEvent
        ],
        subject: fileShareName+' and '+fileShareEvent,
        body: this.global.basicType+this.global.basicLocation,
        isHtml: true
      }; 

      if (this.plt.is('cordova')) 
      {
          this.emailComposer.open(email).then
          (e =>{
            // Success
            var mymsg:any;
            this.translateService.get('TOASTes').subscribe(
              value =>{ mymsg=value;});
            this.global.showToastInfo(mymsg);
          }).catch(e =>{
            console.log('Email failed:', e)
          });
      } //if    
    }//sendEmail

    async T4ProcessEvent() {
      var mymsg:any;
      this.translateService.get('MESSAGEpd').subscribe(
        value =>{ mymsg=value;});
      const loading = await this.loadingCtrl.create({  
        message: mymsg   
        });  
        loading.present(); 
        await this.http.get('./assets/logheader.csv', {
          responseType: 'text'
        })
        .subscribe(
          data => {
            this.extractEvent(data);
            loading.dismiss();},
          err => console.log('something went wrong: ', err)
        );
    } // T4ProcessEvent

    public extractEvent(res) 
    {
      this.papa.parse(res, {
        complete: parsedData => {
          this.headerEvent = parsedData.data.splice(0, 1)[0];
          this.csvEvent = parsedData.data;
          console.log('headerEvent',this.headerEvent);
          console.log('csvEvent',this.csvEvent); 
        }
      });
    } //extractEvent

    async T4LoadEvent() {
      this.global.loadingTimeout=0;
      this.global.commandIndex=this.global.currentStage=this.global.oldStage=300; //initial write 100
      this.global.dslen=this.global.oldLen=this.global.dslenTotal=0;
      this.global.BleWrite();
      var mymsg:any;
      this.translateService.get('MESSAGEdl').subscribe(
        value =>{ mymsg=value;});

      const loading = await this.loadingCtrl.create({  
        message: mymsg  
        });  
        loading.present(); 

      const interval5 = setInterval(() => {
        this.global.loadingTimeout++;
        if((this.global.currentStage == this.global.oldStage) && (this.global.dslen==this.global.oldLen))
        {
          //rewrite Ble with old Stage
          if(!this.global.eventDownloaded)
          {
            console.log('event event dslen',this.global.dslen);
            this.global.dslen=this.global.oldLen=0;
            this.global.oldStage =this.global.currentStage=this.global.commandIndex;
            this.global.dsOneTemp=[]; //clear
            this.global.BleWrite();
            console.log('event rewrite stage',this.global.currentStage);   
          }
        } //if
        else
        { 
          //update stage
          this.global.oldStage =this.global.currentStage=this.global.commandIndex;
          this.global.oldLen = this.global.dslen;
          console.log('event updata stage',this.global.currentStage);
        }//else
        if (this.global.eventDownloaded) {
          this.getEvent();
          loading.dismiss();
          clearInterval(interval5);
        }
        if (this.global.loadingTimeout>15) {
          clearInterval(interval5);
          loading.dismiss();
          var sr:any;
          this.translateService.get('MESSAGEdl').subscribe(
            value =>{sr=value;});
          var nabdf:any;
          this.translateService.get('MESSAGEdct').subscribe(
            value =>{ nabdf=value;});
          this.global.showAlert(sr,nabdf);
        }
      }, 2000);
    } // T4LoadEvent

    getEvent(){
      var next:any; //Get current time
      var now = new Date();
      var num: number;   
      var timeS,timeEvent: string;  
      console.log('getEvent');      
      for (var i=0;i<128;i++)
      {
        num=this.global.timeTwo[i];
        next = this.adjustMinutesToDate(now,num);
        timeS =this.DateFormat(next);
    
        //console.log('num-next-timeS-switch',num,next,timeS,this.global.eCodeTwo[i]);
        switch(this.global.eCodeTwo[i]) 
        {
          case 0x0000:{ //EventCPEstart 0
            this.csvEvent[i][0]= timeEvent = timeS;
            if(this.global.eParamTwo[i]>0)
                this.csvEvent[i][0]= timeEvent+'@'+ this.global.eParamTwo[i].toString();
            //console.log('EventCPEstart 0=',this.csvEvent[i][0]);
            break;
          }
          case 0x0001:{ //EventCPEstop 1
            this.csvEvent[i][1]= timeEvent = timeS;
            if(this.global.eParamTwo[i]>0)
                this.csvEvent[i][1]= timeEvent+'@'+ this.global.eParamTwo[i].toString();
            console.log('EventCPEstop 1=',this.csvEvent[i][1]);
            break;
          }
          case 0x0002:{ //Event24VOver 2
            this.csvEvent[i][2]=timeEvent = timeS;
            if(this.global.eParamTwo[i]>0)
                this.csvEvent[i][2]= timeEvent+'@'+ (this.global.eParamTwo[i]/10).toString();
            console.log('Event24VOver 2=',this.csvEvent[i][2]);
            break;
          }
          case 0x0004:{ //Event24VLess 3
            this.csvEvent[i][3]=timeEvent = timeS;
            if(this.global.eParamTwo[i]>0)
                this.csvEvent[i][3]= timeEvent+'@'+ (this.global.eParamTwo[i]/10).toString();
            console.log('Event24VLess 3=',this.csvEvent[i][3]);
            break;
          }
          case 0x0008:{ //EventTemOver 4
            this.csvEvent[i][4]=timeEvent = timeS;
            if(this.global.eParamTwo[i]>0)
                this.csvEvent[i][4]= timeEvent+'@'+(this.global.eParamTwo[i]/10).toString();
            console.log('EventTemOver 4=',this.csvEvent[i][4]);
            break;
          }
          case 0x0010:{ //EventTemLess 5
            this.csvEvent[i][5]=timeEvent = timeS;
            if(this.global.eParamTwo[i]>0)
                this.csvEvent[i][5]= timeEvent+'@'+(this.global.eParamTwo[i]/10).toString();
            console.log('EventTemLess 5=',this.csvEvent[i][5]);
            break;
          }
          case 0x0020:{ //EventSSIOver 6
            this.csvEvent[i][6]=timeEvent = timeS;
            if(this.global.eParamTwo[i]>0)
                this.csvEvent[i][6]= timeEvent+'@'+this.global.eParamTwo[i].toString();
            console.log('EventSSIOver 6=',this.csvEvent[i][6]);
            break;
          }
          case 0x0040:{ //EventSSILess 7
            this.csvEvent[i][7]=timeEvent = timeS;
            if(this.global.eParamTwo[i]>0)
                this.csvEvent[i][7]= timeEvent+'@'+this.global.eParamTwo[i].toString();
            console.log('EventSSILess 7=',this.csvEvent[i][7]);
            break;
          }
          case 0x0080:{ //Event24VriOv 8
            this.csvEvent[i][8]=timeEvent = timeS;
            if(this.global.eParamTwo[i]>0)
                this.csvEvent[i][8]= timeEvent+'@'+this.global.eParamTwo[i].toString();
            console.log('Event24VriOv 8=',this.csvEvent[i][8]);
            break;
          }
          case 0x0100:{ //EventAlPiLos 9
            this.csvEvent[i][9]=timeEvent = timeS;
            if(this.global.eParamTwo[i]>0)
                this.csvEvent[i][9]= timeEvent+'@'+this.global.eParamTwo[i].toString();
            console.log('EventAlPiLos 9=',this.csvEvent[i][9]);
            break;
          }
          case 0x0200:{ //EventAGPiLos 10
            this.csvEvent[i][10]=timeEvent = timeS;
            if(this.global.eParamTwo[i]>0)
                this.csvEvent[i][10]= timeEvent+'@'+this.global.eParamTwo[i].toString();
            console.log('EventAGPiLos 10=',this.csvEvent[i][10]);
            break;
          }
          case 0x1000:{ //EventCTRPlin 11 used
            this.csvEvent[i][11]=timeEvent = timeS;
            if(this.global.eParamTwo[i]>0)
                this.csvEvent[i][11]= timeEvent+'@'+this.global.eParamTwo[i].toString();
            console.log('EventCTRPlin 11 reused',i);
            break;
          }
          case 0x2000:{ //EventCTRPlout 12 used
            this.csvEvent[i][12]=timeEvent = timeS;
            if(this.global.eParamTwo[i]>0)
                this.csvEvent[i][12]= timeEvent+'@'+this.global.eParamTwo[i].toString();
            console.log('EventCTRPlout 12 reused',i);
            break;
          }
        }//switch
      
      }//for
      console.log('all event=',this.csvEvent);
    }//getEvent
 
  
} //ts