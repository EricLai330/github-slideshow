import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { ToastController, AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
// Bluetooth UUIDs
const BLE_SERVICE = "ffe0";
const BLE_CHARACTERISTIC = "ffe1";

@Injectable({
  providedIn: 'root'
})

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule
  ],
  declarations: [GlobalService]
})

export class GlobalService {

  peripheral: any = {};
  devices: any[] = [];
  bleNames: any[] = [];
  bBLEOn: boolean;
  statusMessage: string;
  //public bNoshow: boolean = false;
  public langID: number;
  public chosenWork: number;
  public curSetMode: number;
  public chosenWorkString: string;
  public logCount: number;
  public alignReadMode: number;
  public closeCalled: boolean;
  public oneTimeAsk: boolean = false;
  public workon2channel:boolean;
  public dsOne: any[]=[];
  public dsTwo: any[]=[];
  public dsOneTemp: any[]=[];
  public ds17: any[]=[];
  public timeOne: any[]=[];
  public timeTwo: any[]=[];
  public timeOneString: any[]=[];
  public timeTwoString: any[]=[];
  public tempOne: any[]=[];
  public atteOne: any[]=[];
  public pilotOne: any[]=[];
  public i24vOne: any[]=[];
  public i24vrOne: any[]=[];
  public dSimData: any[]=[];  
  public eCodeTwo: any[]=[];
  public eParamTwo: any[]=[];
  public sLocation:string;
  public sMode:string;
  public sPC:string;
  public sPC2:string;
  public sLog: string;
  public gTempNumber:number;
  public gTempNumber2:number;
  public gTempString:string;

  public dslen:number;
  public dslenTotal:number;
  public oldLen:number;
  public oldStage:number;
  public currentStage:number;
  public loadingTimeout:number;
  public dsTime: any;
  public dsTemp: any;
  public dsAtte: any;
  public dsSSI: any;
  public ds24V: any;
  public ds24VR: any;

  public bDuel: boolean;
  public tabNow: number;
  public dataFromDevice: any;
  public connectionBluetooth: boolean;
  public dongleName: string;
  public connectionDsim: boolean;
  public dongleID: string;
  public choice1Set: boolean;
  public choice2Set: boolean;  
  public bleDevice: any;

  public sorted: boolean;
  public eventDownloaded: boolean;
  public globalDownloaded: boolean;
  public commandIndex: number;
  public basicType: string;     //type number 00-12bytes
  public basicPart: string;     //part number 01-12bytes
  public basicLocation: string; //location
  public basicModeID: number;     //DSIM mode
  public basicMode: string;     //DSIM mode
  public basicCableLength: string;  //Pilot Channel
  public basicCableLengthID: number;  //Pilot Channel
  public basicCP: string;       //
  public basicCPID: number;
  public basicCPModeID: number;
  public basicCPModeID2: number;
  public basicInterval: string; //log interval
  public basicIntervalID: number; //log interval
  public alarmR: number;      // alarm RF level
  public alarmRColor: string;      // alarm RF level color
  public alarmT: number;   //alarm Temperature
  public alarmP: number;   // alarm power supply
  public sn: string;            // serial number
  public swversion: string;     // software number
  public centerAttenuator: number;     // center Att
  public currentAttenuator: number;     // current Att
  public orgAtt:string ='';
  public nowTimeCount: number;     // center Att
  public currentTemperature: number;     // current Temp
  public current24V: number;     // current 24V
  public current24VR: number;     // current 24 ripple
  public newLocIndex: number;
  public newLoc9String: string;
  public newLocAString: string;
  public newLocBString: string;
  public newLocCString: string;
  public locationBuffer: any[]=[];

  public readIndex: number;
  public firstRead: boolean;
 // public redoBuffer: boolean;
 // public redoH: number;
 // public redoL: number;    
  public buffer0: any;
  public buffer1: any;
  public buffer2: any;
  public buffer3: any;
  public buffer4: any;
  public buffer5: any;
  public buffer6: any;
  public buffer7: any;
  public buffer8: any;
  public buffer9: any;
  public bufferA: any;
  public bufferB: any;
  public bufferC: any;
  public buffer13: any;
  public buffer100: any;
  public buffer17length: number;

  public req00Cmd =  [0xB0,0x03,0x00,0x00,0x00,0x06,0,0];    //0
  public req01Cmd =  [0xB0,0x03,0x00,0x01,0x00,0x06,0,0];    //1
  public req02Cmd =  [0xB0,0x03,0x00,0x02,0x00,0x06,0,0];    //2
  public req03Cmd =  [0xB0,0x03,0x00,0x03,0x00,0x06,0,0];    //3
  public req04Cmd =  [0xB0,0x03,0x00,0x04,0x00,0x06,0,0];    //4
  public req05Cmd =  [0xB0,0x03,0x00,0x05,0x00,0x06,0,0];    //5
  public req06Cmd =  [0xB0,0x03,0x00,0x06,0x00,0x06,0,0];    //6
  public req07Cmd =  [0xB0,0x03,0x00,0x07,0x00,0x06,0,0];    //7
  public req08Cmd =  [0xB0,0x03,0x00,0x08,0x00,0x06,0,0];    //8
  public location1 = [0xB0,0x03,0x00,0x09,0x00,0x06,0,0];    //9
  public location2 = [0xB0,0x03,0x00,0x0A,0x00,0x06,0,0];    //10
  public location3 = [0xB0,0x03,0x00,0x0B,0x00,0x06,0,0];    //11
  public location4 = [0xB0,0x03,0x00,0x0C,0x00,0x06,0,0];    //12
  public req0DCmd =  [0xB0,0x03,0x00,0x0D,0x00,0x06,0,0];    //13

  public ddataE8 = [0xB0,0x03,0xE8,0x00,0x00,0x80,0,0];    //0
  public ddataE9 = [0xB0,0x03,0xE9,0x00,0x00,0x80,0,0];    //1
  public ddataEA = [0xB0,0x03,0xEA,0x00,0x00,0x80,0,0];    //2
  public ddataEB = [0xB0,0x03,0xEB,0x00,0x00,0x80,0,0];    //3
  public ddataEC = [0xB0,0x03,0xEC,0x00,0x00,0x80,0,0];    //4
  public ddataED = [0xB0,0x03,0xED,0x00,0x00,0x80,0,0];    //5
  public ddataEE = [0xB0,0x03,0xEE,0x00,0x00,0x80,0,0];    //6
  public ddataEF = [0xB0,0x03,0xEF,0x00,0x00,0x80,0,0];    //7

  public ddataF0 = [0xB0,0x03,0xF0,0x00,0x00,0x80,0,0];    //8
  public ddataF1 = [0xB0,0x03,0xF1,0x00,0x00,0x80,0,0];    //9
  public ddataF2 = [0xB0,0x03,0xF2,0x00,0x00,0x80,0,0];    //10
  public ddataF3 = [0xB0,0x03,0xF3,0x00,0x00,0x80,0,0];    //11
  public ddataF4 = [0xB0,0x03,0xF4,0x00,0x00,0x80,0,0];    //12
  public ddataF5 = [0xB0,0x03,0xF5,0x00,0x00,0x80,0,0];    //13
  public ddataF6 = [0xB0,0x03,0xF6,0x00,0x00,0x80,0,0];    //14
  public ddataF7 = [0xB0,0x03,0xF7,0x00,0x00,0x80,0,0];    //15
  public ddataF8 = [0xB0,0x03,0xF8,0x00,0x00,0x80,0,0];    //16
  public ddataF9 = [0xB0,0x03,0xF9,0x00,0x00,0x80,0,0];    //17
  public ddataFA = [0xB0,0x03,0xFA,0x00,0x00,0x80,0,0];    //18
  public ddataFB = [0xB0,0x03,0xFB,0x00,0x00,0x80,0,0];    //19
  public ddataFC = [0xB0,0x03,0xFC,0x00,0x00,0x80,0,0];    //20
  public ddataFD = [0xB0,0x03,0xFD,0x00,0x00,0x80,0,0];    //21
  public ddataFE = [0xB0,0x03,0xFE,0x00,0x00,0x80,0,0];    //22
  public ddataFF = [0xB0,0x03,0xFF,0x00,0x00,0x80,0,0];    //23

  public set04Cmd= [0xB0,0x10,0x00,0x04,0x00,0x06,0x0C,
    0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00]; // set 04
  public setLoc9Cmd= [0xB0,0x10,0x00,0x09,0x00,0x06,0x0C,
      0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00];
  public setLocACmd= [0xB0,0x10,0x00,0x0A,0x00,0x06,0x0C,
      0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00];
  public setLocBCmd= [0xB0,0x10,0x00,0x0B,0x00,0x06,0x0C,
      0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00];
  public setLocCCmd= [0xB0,0x10,0x00,0x0C,0x00,0x06,0x0C,
      0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00];

  constructor(
    private ngZone: NgZone,
    private ble: BLE,
    private toastCtrl: ToastController,
    private router: Router,
    private translateService: TranslateService,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

async alertMessageExitReconnect(headmsg:string,content:string,choice1:string,choice2:string){
  let alert = await this.alertCtrl.create({
    header: headmsg, 
    message: content,
    buttons: [
      {
        text: choice1,
        handler: () => {
          //this.choice1Set=true;
          //this.choice2Set=false;
          navigator['app'].exitApp();
        }
      },
      {
        text: choice2,
        handler: () => {
          this.ReconnectBle();
        }
      }
    ]
  });
  await alert.present();
}//

  setNewLocation(newS:string){
    var newLen=newS.length;
    var imod:number;
    for (var i=0;i<12;i++)
    {
      this.setLoc9Cmd[7+i]=0;
      this.setLocACmd[7+i]=0;
      this.setLocBCmd[7+i]=0;
      this.setLocCCmd[7+i]=0;
    }


    if(newLen>=40) newLen=40;
//    this.newLoc9String=this.newLocAString=this.newLocBString=this.newLocCString='';
    imod=newLen%12;
    this.newLocIndex= (newLen-imod)/12;
    if(imod>0) this.newLocIndex+=1;
    if(imod==0) imod=12;
    console.log('newS,newLocIndex,imod',newS,this.newLocIndex,imod);
    if(this.newLocIndex==4){
      this.newLoc9String=newS.slice(0,12);
      for (var i=0;i<12;i++)
        this.setLoc9Cmd[7+i]=this.newLoc9String.charCodeAt(i);
      this.newLocAString=newS.slice(12,24);
      for (var i=0;i<12;i++)
        this.setLocACmd[7+i]=this.newLocAString.charCodeAt(i);      
      this.newLocBString=newS.slice(24,36);
      for (var i=0;i<12;i++)
        this.setLocBCmd[7+i]=this.newLocBString.charCodeAt(i);
      if(imod>4) imod=4;
      this.newLocCString=newS.slice(36,36+imod);
      for (var i=0;i<imod;i++)
        this.setLocCCmd[7+i]=this.newLocCString.charCodeAt(i);
    } //4
    if(this.newLocIndex==3){
      this.newLoc9String=newS.slice(0,12);
      for (var i=0;i<12;i++)
        this.setLoc9Cmd[7+i]=this.newLoc9String.charCodeAt(i);      
      this.newLocAString=newS.slice(12,24);
      for (var i=0;i<12;i++)
        this.setLocACmd[7+i]=this.newLocAString.charCodeAt(i);
      this.newLocBString=newS.slice(24,24+imod); 
      for (var i=0;i<imod;i++)
        this.setLocBCmd[7+i]=this.newLocBString.charCodeAt(i);   
    } //3
    if(this.newLocIndex==2){
      this.newLoc9String=newS.slice(0,12);
      for (var i=0;i<12;i++)
        this.setLoc9Cmd[7+i]=this.newLoc9String.charCodeAt(i);
      this.newLocAString=newS.slice(12,12+imod);
      for (var i=0;i<imod;i++)
        this.setLocACmd[7+i]=this.newLocAString.charCodeAt(i);      
    } //2
    if(this.newLocIndex==1){
      this.newLoc9String=newS.slice(0,imod);
      for (var i=0;i<imod;i++)
        this.setLoc9Cmd[7+i]=this.newLoc9String.charCodeAt(i);
    } //1
//    console.log('newLoc9String', this.newLoc9String);
//    console.log('newLocAString', this.newLocAString);
//    console.log('newLocBString', this.newLocBString);
//    console.log('newLocCString', this.newLocCString);
  }//setNewLocation

  set09Location(){
  //  console.log('set09Location',this.newLoc9String);
 //   for (var i=0;i<12;i++)
 //     this.setLoc9Cmd[7+i]=this.newLoc9String.charCodeAt(i);
    this.CRC16Calc(this.setLoc9Cmd,19);
    console.log('setLoc9Cmd', this.setLoc9Cmd);
    this.commandIndex = 288;
    this.BleSet();
  }//set09Location

  set0ALocation(){
 //   console.log('set0ALocation',this.newLocAString);   
 //   for (var i=0;i<12;i++)
 //     this.setLocACmd[7+i]=this.newLocAString.charCodeAt(i);
    this.CRC16Calc(this.setLocACmd,19);
    console.log('setLocACmd', this.setLocACmd);
    this.commandIndex = 289;
    this.BleSet();
  }//set0ALocation

  set0BLocation(){
//    console.log('set0BLocation',this.newLocBString);
//    for (var i=0;i<12;i++)
//      this.setLocBCmd[7+i]=this.newLocBString.charCodeAt(i);
    this.CRC16Calc(this.setLocBCmd,19);
    console.log('setLocBCmd', this.setLocBCmd);
    this.commandIndex = 290;
    this.BleSet();
  }//set0BLocation

  set0CLocation(){
  //  console.log('set0CLocation',this.newLocCString);
  //  for (var i=0;i<12;i++)
  //    this.setLocCCmd[7+i]=this.newLocCString.charCodeAt(i);
    this.CRC16Calc(this.setLocCCmd,19);
    console.log('setLocCCmd', this.setLocCCmd);
    this.commandIndex = 291;
    this.BleSet();
  }//set0CLocation

  set04Work(wmode:number){
    this.set04Cmd[7]= wmode; //2-4
    this.set04Cmd[8] = this.currentAttenuator/256; //MGC Value 2Bytes
    this.set04Cmd[9] = this.currentAttenuator%256; //MGC Value
    this.set04Cmd[10] = this.basicCableLengthID; //TGC Cable length
    this.set04Cmd[11] = this.basicCPID; //AGC Channel 1Byte
    this.set04Cmd[12] = this.basicCPModeID; //AGC channel Mode 1 Byte
    this.set04Cmd[13] = this.basicIntervalID; //Log Minutes 1Byte
    this.set04Cmd[14] = 0x03; //AGC Channel 2 1Byte
    this.set04Cmd[15] = 0x02; //AGC Channel 2 Mode 1Byte
    this.CRC16Calc(this.set04Cmd,19);
    this.commandIndex = 201;
    this.BleSet();
  }//set04Work

  set04Work1(){
    this.set04Cmd[7]= 1; //Align specific
    this.set04Cmd[8] = this.currentAttenuator/256; //MGC Value 2Bytes
    this.set04Cmd[9] = this.currentAttenuator%256; //MGC Value
    this.set04Cmd[10] = this.basicCableLengthID; //TGC Cable length
    this.set04Cmd[11] = this.basicCPID; //AGC Channel 1Byte
    this.set04Cmd[12] = this.basicCPModeID; //AGC channel Mode 1 Byte
    this.set04Cmd[13] = this.basicIntervalID; //Log Minutes 1Byte
    this.set04Cmd[14] = 0x03; //AGC Channel 2 1Byte
    this.set04Cmd[15] = 0x02; //AGC Channel 2 Mode 1Byte
    this.CRC16Calc(this.set04Cmd,19);
    this.commandIndex = 201;
    this.BleSet();
  }//set04Work


  set04Work4(){
    this.set04Cmd[7]= 4; //2-4
    this.set04Cmd[8] = this.centerAttenuator/256; //MGC Value 2Bytes
    this.set04Cmd[9] = this.centerAttenuator%256; //MGC Value
    this.set04Cmd[10] = this.basicCableLengthID; //TGC Cable length
    this.set04Cmd[11] = this.basicCPID; //AGC Channel 1Byte
    this.set04Cmd[12] = this.basicCPModeID; //AGC channel Mode 1 Byte
    this.set04Cmd[13] = this.basicIntervalID; //Log Minutes 1Byte
    this.set04Cmd[14] = 0x03; //AGC Channel 2 1Byte
    this.set04Cmd[15] = 0x02; //AGC Channel 2 Mode 1Byte
    this.CRC16Calc(this.set04Cmd,19);
    this.commandIndex = 201;
    this.BleSet();
  }//set04Work

  /*if wmode(1-4),3,2,VEQ=0 filled into
  Setting mode 1Byte +
  MGC Value 2Bytes +
  TGC Cable length 1Byte +
  AGC Channel 1Byte +
  AGC channel Mode 1 Byte+
  Log Minutes 1Byte+
  AGC Channel 2 1Byte+
  AGC Channel 2 Mode 1Byte+
  VEQ Value 2 Byte+ 
  0x00
  1,?,?,TGCL,inumber=AGC channel,AGC mode,Log,3,2,VEQ0,VEQ0,0
    public set04Cmd= [0xB0,0x10,0x00,0x04,0x00,0x06,0x0C,
    0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00]; 
  */
  set04CP(wmode:number,inumber:number){
    this.set04Cmd[7] = wmode; //1 align
    this.set04Cmd[8] = this.currentAttenuator/256; //MGC Value 2Bytes
    this.set04Cmd[9] = this.currentAttenuator%256; //MGC Value
    this.set04Cmd[10] = this.basicCableLengthID; //TGC Cable length
    this.set04Cmd[11] = inumber; //AGC Channel 1Byte
    this.set04Cmd[12] = this.basicCPModeID; //AGC channel Mode 1 Byte
    this.set04Cmd[13] = this.basicIntervalID; //Log Minutes 1Byte
    this.set04Cmd[14] = 0x03; //AGC Channel 2 1Byte
    this.set04Cmd[15] = 0x02; //AGC Channel 2 Mode 1Byte
    this.CRC16Calc(this.set04Cmd,19);
    this.commandIndex = 202;
    this.BleSet();
  }//set04CP

  set04CP2(wmode:number,inumber:number){
    console.log('CP2',inumber);
    this.set04Cmd[7] = wmode; //1 align
    this.set04Cmd[8] = this.currentAttenuator/256; //MGC Value 2Bytes
    this.set04Cmd[9] = this.currentAttenuator%256; //MGC Value
    this.set04Cmd[10] = this.basicCableLengthID; //TGC Cable length
    this.set04Cmd[11] = this.basicCPID; //AGC Channel 1Byte
    this.set04Cmd[12] = this.basicCPModeID; //AGC channel Mode 1 Byte
    this.set04Cmd[13] = this.basicIntervalID; //Log Minutes 1Byte
    this.set04Cmd[14] = inumber; //AGC Channel 2 1Byte
    this.set04Cmd[15] = this.basicCPModeID2; //AGC Channel 2 Mode 1Byte
    this.CRC16Calc(this.set04Cmd,19);
    this.commandIndex = 202;
    this.workon2channel=true;
    this.BleSet();
  }//set04CP2

  set04Interval(wmode:number,inumber:number){
    this.set04Cmd[7]=wmode; //8
    this.set04Cmd[13]=inumber; //7+06
    this.CRC16Calc(this.set04Cmd,19);
    this.commandIndex = 203;
    this.BleSet();
  }//set04Interval

  set04Att(wmode:number,inumber:number,jnumber:number){
    this.set04Cmd[7]= wmode; //4 MGC
    this.set04Cmd[8] = inumber; //MGC Value 2Bytes
    this.set04Cmd[9] = jnumber; //MGC Value
    this.set04Cmd[10] = this.basicCableLengthID; //TGC Cable length
    this.set04Cmd[11] = this.basicCPID; //AGC Channel 1Byte
    this.set04Cmd[12] = this.basicCPModeID; //AGC channel Mode 1 Byte
    this.set04Cmd[13] = this.basicIntervalID; //Log Minutes 1Byte
    this.set04Cmd[14] = 0x03; //AGC Channel 2 1Byte
    this.set04Cmd[15] = 0x02; //AGC Channel 2 Mode 1Byte
    this.CRC16Calc(this.set04Cmd,19);
    this.commandIndex = 204;
    this.BleSet();
  }//set04Command01

  set04CL(wmode:number,inumber:number){
    this.set04Cmd[7]= this.basicModeID; //3 TGC
    this.set04Cmd[8] = this.currentAttenuator/256; //MGC Value 2Bytes
    this.set04Cmd[9] = this.currentAttenuator%256; //MGC Value
    this.set04Cmd[10] = inumber; //TGC Cable length
    this.set04Cmd[11] = this.basicCPID; //AGC Channel 1Byte
    this.set04Cmd[12] = this.basicCPModeID; //AGC channel Mode 1 Byte
    this.set04Cmd[13] = this.basicIntervalID; //Log Minutes 1Byte
    this.set04Cmd[14] = 0x03; //AGC Channel 2 1Byte
    this.set04Cmd[15] = 0x02; //AGC Channel 2 Mode 1Byte
    this.CRC16Calc(this.set04Cmd,19);
    this.commandIndex = 205;
    this.BleSet();
  }//set04CL

 // direct cut
 BleConnect(device) {
  console.log("2_1_1 BleConnect",device);
  this.ble.connect(device.id).subscribe(
      peripheral => this.onConnected(peripheral), 
      peripheral => this.onDeviceDisconnected(peripheral)

  );
}


BleDisconnect() {
  this.ble.disconnect(this.peripheral.id).then(
      () => console.log('Disconnected ' + JSON.stringify(this.peripheral)),
      () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral)));
} //BleDisconnect not used

handleBleRead(buffer: ArrayBuffer){
  switch(this.commandIndex) { 
    case 0: 
    { 
      this.buffer17length+=buffer.byteLength;
      console.log('buffer17length=0,',this.buffer17length);
      if(this.buffer17length==17)
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
        console.log('buffer=0,',this.ds17);
        this.basicPart="";
        for (var i = 0; i < 12; i++) 
          this.basicPart += String.fromCharCode(this.ds17[i+3]);
        console.log('buffer=0,', this.basicPart);
        this.ds17=[]; //clear
        this.buffer17length=0;
        this.commandIndex++;
        this.BleWrite(); 
      }
      else
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
      }
      break; 
    } // case 0
    case 1: 
    { 
      this.buffer17length+=buffer.byteLength;
      console.log('buffer17length=1,',this.buffer17length);
      if(this.buffer17length==17)
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
        console.log('buffer=1,',this.ds17);
        this.basicType="DSIM";
        for (var i = 0; i < 12; i++) 
          this.basicType += String.fromCharCode(this.ds17[i+3]);
        console.log('buffer=1,', this.basicType);
        if(this.basicType.indexOf("DSIM-CG")>=0)
        {
          this.bDuel=true; //duel sim
          console.log('Duel Device');
        }
        else
        {
          this.bDuel=false; //non duel sim
          console.log('Non Duel Device');
        }
        this.ds17=[]; //clear
        this.buffer17length=0;      
        this.commandIndex++;
        this.BleWrite();
      }
      else
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
      }
      break; 
    } // case 1
    case 2: 
    { 
      this.buffer17length+=buffer.byteLength;
      console.log('buffer17length=2,',this.buffer17length);
      if(this.buffer17length==17)
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
        console.log('buffer=2,',this.ds17);
        this.sn="";
        for (var i = 0; i < 12; i++)
          this.sn += String.fromCharCode(this.ds17[i+3]);
        console.log('buffer=2,', this.sn);
        this.ds17=[]; //clear
        this.buffer17length=0;      
        this.commandIndex++;
        this.BleWrite();
      }
      else
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
      }
      break; 
    } // case 2
    case 3: 
    {
      this.buffer17length+=buffer.byteLength;
      console.log('buffer17length=3,',this.buffer17length);
      if(this.buffer17length==17)
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
        console.log('buffer=3,',this.ds17);
        this.nowTimeCount=this.ds17[11]*256+this.ds17[12]; //Now Time
        this.swversion="";
        for (var i = 0; i < 3; i++)
          this.swversion += String.fromCharCode(this.ds17[i+3]);
        console.log('buffer=3,', this.swversion);
        var num:number;
        num=this.ds17[10];
        this.alarmR= (num & 0x01) + (num & 0x02);
        this.alarmT= (num & 0x40) + (num & 0x80);
        this.alarmP= (num & 0x10) + (num & 0x20);
        console.log('buffer=3,', this.alarmR);
        console.log('buffer=3,', this.alarmT);
        console.log('buffer=3,', this.alarmP);
        num=this.ds17[13]; 
        this.basicIntervalID= num;//time interval
        this.basicInterval= this.ds17[13].toString();//time interval
        this.basicInterval+=" minutes";
        console.log('buffer=3,', this.basicInterval);
        this.ds17=[]; //clear
        this.buffer17length=0;      
        this.commandIndex++;
        this.BleWrite();
      }
      else
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
      }
      break; 
    } //case 3
    
    case 4: 
    { 
      console.log('buffer4,',buffer);
      this.buffer17length+=buffer.byteLength;
      if(this.buffer17length==17)
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
        console.log('buffer=4,',this.ds17);
        this.curSetMode=this.ds17[3];
        console.log('curSetMode=',this.curSetMode);
        this.currentAttenuator=this.ds17[4]*256+this.ds17[5]; //MGC Value 2Bytes
        this.basicCableLengthID=this.ds17[6]; //TGC Cable length 1Byte
        this.basicCableLength=this.ds17[6].toString(); //
        this.basicCP=this.ds17[7].toString(); //AGC Channel 1Byte
        this.basicCPID=this.ds17[7];  //AGC Channel 1Byte
        this.basicCPModeID=this.ds17[8]; //AGC Channel mode 1Byte
        console.log('AGC Channel mode 1Byte',this.basicCPModeID);
        this.ds17=[]; //clear
        this.buffer17length=0;      
        this.commandIndex++;
        this.BleWrite();
      }
      else
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
      }
      break; 
    } //case 4
    case 5:       
    { 
      this.buffer17length+=buffer.byteLength;
      console.log('buffer17length=5,',this.buffer17length);
      if(this.buffer17length==17)
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
        this.alignReadMode=this.ds17[3]; //always keep
        switch(this.ds17[3]) //working mode
        {
          case 1:{
            this.basicModeID=1;
            this.basicMode="Align";
            break;
          }
          case 2:{
            this.basicModeID=2;
            this.basicMode="AGC";
            break;
          }
          case 3:{
            this.basicModeID=3;
            this.basicMode="TGC";
            break;
          }
          case 4:{
            this.basicModeID=4;
            this.basicMode="MGC";
            break;
          }
        }//switch

        if(this.ds17[3]>2)
          this.alarmRColor='medium';
        else
          {
            if(this.alarmR>0)
              this.alarmRColor='danger';
            else
              this.alarmRColor='success';
          }
          if(this.ds17[3]==3)
          {
            if((this.curSetMode==1)||(this.curSetMode==2))
              this.alarmRColor='danger';
          }
        
        this.currentTemperature=(this.ds17[10]*256+this.ds17[11])/10; //Temperature
        this.current24V=(this.ds17[8]*256+this.ds17[9])/10; //24V
        this.ds17=[]; //clear
        this.buffer17length=0;  
        if(this.oneTimeAsk)
          {
            this.oneTimeAsk=false;
            console.log('inside onetimeask,alignReadMode=',this.alignReadMode);
            this.DisplayAlignResult();
          } 
        else
          {
            this.commandIndex++;
            this.BleWrite();
          } //this.oneTimeAsk  
      }
      else
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
      }
      break; 
    } //case 5 

    case 6: 
    { 
      this.buffer17length+=buffer.byteLength;
      console.log('buffer17length=6,',this.buffer17length);
      if(this.buffer17length==17)
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
        this.centerAttenuator = this.ds17[11]*256+this.ds17[12];
        this.current24VR=this.ds17[9]*256+this.ds17[10]; //24VR
        this.ds17=[]; //clear
        this.buffer17length=0;      
        this.commandIndex=9;
        this.BleWrite();
      }
      else
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
      }
      break;       
    } //case 6

    case 7: //not used
    { 
      this.buffer7 = buffer;
      break; 
    } // case 7

    case 8: //not used
    { 
      this.buffer8 = buffer;
      break; 
    } //case 8

    case 9: 
    { 
      this.buffer17length+=buffer.byteLength;
      console.log('buffer17length=9,',this.buffer17length);
      if(this.buffer17length==17)
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
        this.locationBuffer.length = 0;  
        for (var i = 0; i <12 ; i++) 
          this.locationBuffer.push(this.ds17[i+3]);
        console.log('buffer9 locationBuffer,',this.locationBuffer);
        console.log('buffer9 ,',buffer);
        this.ds17=[]; //clear
        this.buffer17length=0;      
        this.commandIndex++;
        this.BleWrite();
      }
      else
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
      }
      break;   
    } //case 9    

    case 10: 
    { 
      this.buffer17length+=buffer.byteLength;
      console.log('buffer17length=10,',this.buffer17length);
      if(this.buffer17length==17)
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
        for (var i = 0; i <12 ; i++) 
          this.locationBuffer.push(this.ds17[i+3]);
        console.log('buffer10 locationBuffer,',this.locationBuffer);
        console.log('buffer10 ,',buffer);
        this.ds17=[]; //clear
        this.buffer17length=0;      
        this.commandIndex++;
        this.BleWrite();
      }
      else
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
      }
      break;   
    } //case 10 

    case 11: 
    { 
      this.buffer17length+=buffer.byteLength;
      console.log('buffer17length=11,',this.buffer17length);
      if(this.buffer17length==17)
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
        for (var i = 0; i <12 ; i++) 
          this.locationBuffer.push(this.ds17[i+3]);
        console.log('buffer11 locationBuffer,',this.locationBuffer);
        console.log('buffer11 ,',buffer);
        this.ds17=[]; //clear
        this.buffer17length=0;      
        this.commandIndex++;
        this.BleWrite();
      }
      else
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
      }
      break;   
    } //case 11 
    case 12: 
    {
      this.buffer17length+=buffer.byteLength;
      console.log('buffer17length=12,',this.buffer17length);
      if(this.buffer17length==17)
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
        console.log("this.ds17", this.ds17);
        for (var i = 0; i <4 ; i++) 
          this.locationBuffer.push(this.ds17[i+3]);
        console.log("locationBuffer", this.locationBuffer);
        var tempNum = 40;
        for (var i = 0; i <40 ; i++) {
          if(this.locationBuffer[i]==0)
          {
            console.log("tempNum = i =>", i, " " + this.locationBuffer[i]);
            console.log("locationBuffer", this.locationBuffer);
            tempNum =i;
            break;
          }
        }
        console.log("tempNum:",tempNum);
        this.basicLocation="";
        for (var i = 0; i <tempNum ; i++) 
          this.basicLocation+=String.fromCharCode(this.locationBuffer[i]);
        console.log("basicLocation:",this.basicLocation);
        console.log("basicLocation length:",this.basicLocation.length);
        console.log('buffer12,',buffer);
        this.ds17=[]; //clear
        this.buffer17length=0;      
        this.commandIndex++;
        this.BleWrite();
      }
      else
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
      }
      break;   
    } //case 12

    case 13: //not used
    { 
      this.buffer13 = buffer;
      this.buffer17length+=buffer.byteLength;
      console.log('buffer13,',this.buffer13);
      if(this.buffer17length==17)
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
        this.firstRead=true;  //done with first read
        this.sLocation = this.basicLocation; //Reload
        console.log('buffer13 sLocation,',this.sLocation);
        this.sMode = this.basicMode;
        this.sPC = this.basicCP;
        if(this.basicCPModeID==1) 
          this.sPC+=' IRC';
        else
          this.sPC+=' DIG';
        //if(this.basicCPModeID==2) this.sPC+=' DIG';
        this.sLog = this.basicInterval;
      }
      else
      {
        for (var i = 0; i < buffer.byteLength; i++) 
          this.ds17.push(buffer[i]);
      }
      break;     
    } //case 13
    case 100: 
    case 101:
    case 102:
    case 103:
    case 104: 
    case 105:
    case 106:
    case 107:
    case 108: 
    case 109:
    case 110:
    case 111:
    case 112: 
    case 113:
    case 114:
    case 115:   
    { 
      for (var i = 0; i < buffer.byteLength; i++) 
      {
        if( ((this.dslen+i)>2) && ((this.dslen+i)<259) )
          this.dsOneTemp.push(buffer[i]);
      }
      console.log('buffer',buffer);
      this.dslen+=buffer.byteLength;
      this.dslenTotal+=buffer.byteLength;
      // console.log('buffer byteLength',num);
      console.log('dslen=',this.dslen);
 //console.log('commandIndex-bytelen-dslen-dslenTotal',this.commandIndex,
 //buffer.byteLength,this.dslen,this.dslenTotal);
      if( this.dslen==261 ) //# 一次收取20bytes，收到261bytes後結束
      {
        console.log(this.commandIndex,'read done check legit');
        //check if dsOnetemp legit
         
        var ttemp:number;
        var tatt:number;
        var t24:number;
        var t24vr:number;

        for (var i=0;i<16;i++)
        {
          ttemp=this.dsOneTemp[i*16+2]*256+this.dsOneTemp[i*16+3];
          tatt=this.dsOneTemp[i*16+4]*256+this.dsOneTemp[i*16+5];
          t24=this.dsOneTemp[i*16+8]*256+this.dsOneTemp[i*16+9];
          t24vr=this.dsOneTemp[i*16+10]*256+this.dsOneTemp[i*16+11];          
          
          if((ttemp>1000)||(tatt>3000)||(t24>300)||(t24vr>30))
          {
            //# Eric測試
            // if(ttemp>1000){
            //   console.log('temp error =',ttemp);
            // }else if(tatt>3000){
            //   console.log('tatt error =',ttemp);
            // }else if(t24>300){
            //   console.log('t24 error =',ttemp);
            // }else if(t24vr>30){
            //   console.log('t24vr error =',ttemp);
            // }  
            // console.log('error commandIndex=',this.commandIndex);

            console.log('legit fail temp=',ttemp);
            console.log('legit fail att=',tatt);
            console.log('legit fail t24=',t24);
            console.log('legit fail t24vr=',t24vr);

            //# 20210107 資料中有空資料(65535)或者異常資料會一直卡在這裡重複執行
            // this.dsOneTemp=[]; //clear
            // this.dslen=this.oldLen=0;
            // this.currentStage=this.commandIndex;
            // this.BleWrite();
            // return;
          } //not legit
        } //for
        
        for (var i=0; i<256; i++)
          this.dsOne.push(this.dsOneTemp[i]);
        this.dslen=this.oldLen=this.dslenTotal=0;
        this.dsOneTemp=[]; //clear
        this.dsOneTemp.length=0;
        
        if(this.commandIndex != 115)
        { 
          this.commandIndex++;
          this.currentStage=this.commandIndex;
          this.BleWrite();
        }
        else
        { 
          this.globalDownloaded=true;
//          console.log('Download completed');
          this.unPackLog();
//          this.showToastInfo('Download completed');
//          console.log('whole dsOne=',this.dsOne);
          // unpack the 4096 bytes log
        } //if else
      } //if else
      break; 
    } //case 100-115
    case 201: { 
      if((buffer[0]==0xB0)&&(buffer[1]==0x10)&&(buffer[2]==0x00)&&(buffer[3]==0x04)&&(buffer[4]==0x00)&&(buffer[5]==0x06))
        {
          this.basicModeID=this.gTempNumber;
          switch(this.basicModeID) 
          {
            case 2:{
              this.basicMode="AGC";
              break;
            }
            case 3:{
              this.basicMode="TGC";
              break;
            }
            case 4:{
              this.basicMode="MGC";
              break;
            }
          }//switch
          var s1:any;
          this.translateService.get('TOASTs1').subscribe(
            value =>{ s1=value;});
          var s2:any;
          this.translateService.get('TOASTs2').subscribe(
            value =>{ s2=value;});
          this.showToastInfo(s1+this.basicMode+s2);
          this.sMode = this.basicMode; //refresh
        }
      else
        {
          var mymsg:any;
          this.translateService.get('TOASTsf').subscribe(
            value =>{ mymsg=value;});
          this.showToastInfo(mymsg);
        }
      break; 
    } //case 201    
    case 202: { 
      if((buffer[0]==0xB0)&&(buffer[1]==0x10)&&(buffer[2]==0x00)&&(buffer[3]==0x04)&&(buffer[4]==0x00)&&(buffer[5]==0x06))
        {
          if(this.workon2channel)
          {
            this.sPC2 = this.gTempNumber2.toString(); //2nd channel
            console.log('inside ch2',this.sPC2);
            if(this.basicCPModeID2==1) 
                this.sPC2+=' IRC';
            else
                this.sPC2+=' DIG';
            //if(this.basicCPModeID2==2) this.sPC2+=' DIG';
            this.switchtoAGC();
            this.workon2channel=false;
          }
          else
          {
            this.basicCPID=this.gTempNumber;
            this.basicCP=this.gTempNumber.toString();
            this.sPC = this.basicCP; //refresh
            console.log('inside ch',this.sPC);
            if(this.basicCPModeID==1) 
              this.sPC+=' IRC';
            else
              this.sPC+=' DIG';
            //if(this.basicCPModeID==2) this.sPC+=' DIG';
            this.switchtoAGC();
          }
        }
      else
        {
          var mymsg:any;
          this.translateService.get('TOASTsf').subscribe(
            value =>{ mymsg=value;});
          this.showToastInfo(mymsg);
        }
      break; 
    } //case 202
    case 203: { 
      if((buffer[0]==0xB0)&&(buffer[1]==0x10)&&(buffer[2]==0x00)&&(buffer[3]==0x04)&&(buffer[4]==0x00)&&(buffer[5]==0x06))
        {
          this.basicIntervalID=this.gTempNumber;
          this.basicInterval= this.basicIntervalID.toString();
          this.basicInterval+=" minutes";
          this.sLog = this.basicInterval; //refresh
          var mymsg:any;
          this.translateService.get('TOASTls').subscribe(
            value =>{ mymsg=value;});
          this.showToastInfo(mymsg);
        }
      else
      {
        var mymsg:any;
        this.translateService.get('TOASTsf').subscribe(
          value =>{ mymsg=value;});
        this.showToastInfo(mymsg);
      }
      break; 
    } //case 203
    case 204: { 
      if((buffer[0]==0xB0)&&(buffer[1]==0x10)&&(buffer[2]==0x00)&&(buffer[3]==0x04)&&(buffer[4]==0x00)&&(buffer[5]==0x06))
        {
          this.currentAttenuator=this.gTempNumber; //refresh
          var mymsg:any;
          this.translateService.get('TOASTas').subscribe(
            value =>{ mymsg=value;});
          this.showToastInfo(mymsg);
          /*
          if(this.bNoshow)
          {
            console.log('inside noshow');
            this.bNoshow = false;
          }
          else
            this.showToastInfo(mymsg);        
          */
        } //if
        else
        {
          var mymsg:any;
          this.translateService.get('TOASTsf').subscribe(
            value =>{ mymsg=value;});
          this.showToastInfo(mymsg);
        } //else
      break; 
    } //case 204
    case 205: { 
      if((buffer[0]==0xB0)&&(buffer[1]==0x10)&&(buffer[2]==0x00)&&(buffer[3]==0x04)&&(buffer[4]==0x00)&&(buffer[5]==0x06))
        {
          this.basicCableLengthID=this.gTempNumber; //refresh
          var mymsg:any;
          this.translateService.get('TOASTtcs').subscribe(
            value =>{ mymsg=value;});
          this.showToastInfo(mymsg);
        }
      else
      {
        var mymsg:any;
        this.translateService.get('TOASTsf').subscribe(
          value =>{ mymsg=value;});
        this.showToastInfo(mymsg);
      }
      break; 
    } //case 205
    case 288: { 
      if((buffer[0]==0xB0)&&(buffer[1]==0x10)&&(buffer[2]==0x00)&&(buffer[3]==0x09)&&(buffer[4]==0x00)&&(buffer[5]==0x06))
        {
          console.log('Location cmd9 buffer',buffer);
          this.set0ALocation();
        }
      else
      {
        var mymsg:any;
        this.translateService.get('TOASTsf').subscribe(
          value =>{ mymsg=value;});
        this.showToastInfo(mymsg);
      }
      break; 
    } //case 288
    case 289: { 
      if((buffer[0]==0xB0)&&(buffer[1]==0x10)&&(buffer[2]==0x00)&&(buffer[3]==0x0A)&&(buffer[4]==0x00)&&(buffer[5]==0x06))
        {
          console.log('Location cmdA buffer',buffer);
          this.set0BLocation();
        }
      else
      {
        var mymsg:any;
        this.translateService.get('TOASTsf').subscribe(
          value =>{ mymsg=value;});
        this.showToastInfo(mymsg);
      }
      break; 
    } //case 289
    case 290: { 
      if((buffer[0]==0xB0)&&(buffer[1]==0x10)&&(buffer[2]==0x00)&&(buffer[3]==0x0B)&&(buffer[4]==0x00)&&(buffer[5]==0x06))
        {
          this.set0CLocation();
        }
      else
      {
        var mymsg:any;
        this.translateService.get('TOASTsf').subscribe(
          value =>{ mymsg=value;});
        this.showToastInfo(mymsg);
      }
      break; 
    } //case 290
    case 291: { 
      if((buffer[0]==0xB0)&&(buffer[1]==0x10)&&(buffer[2]==0x00)&&(buffer[3]==0x0C)&&(buffer[4]==0x00)&&(buffer[5]==0x06))
        {
          var mymsg:any;
          this.translateService.get('TOASTns').subscribe(
            value =>{ mymsg=value;});
          this.showToastInfo(mymsg);
          this.basicLocation=this.gTempString;
          this.sLocation = this.basicLocation; //refresh 
          console.log('buffer291 refresh,',this.sLocation);
        }
      else
      {
        var mymsg:any;
        this.translateService.get('TOASTsf').subscribe(
          value =>{ mymsg=value;});
        this.showToastInfo(mymsg);
      }
      break; 
    } //case 291
    case 300: 
    case 301:
    case 302:
    case 303:
    case 304:
    case 305:
    case 306:
    case 307:
    { 
      for (var i = 0; i < buffer.byteLength; i++) 
      {
        if( ((this.dslen+i)>2) && ((this.dslen+i)<259) )
          this.dsOneTemp.push(buffer[i]);
      }
      this.dslen+=buffer.byteLength;
      this.dslenTotal+=buffer.byteLength;
 //console.log('commandIndex-bytelen-dslen-dslenTotal',this.commandIndex,
 //buffer.byteLength,this.dslen,this.dslenTotal);
      if( this.dslen==261 )
      {
        console.log(this.commandIndex,'read done');
        this.dslen=this.oldLen=0;
        for (var i=0; i<256; i++)
          this.dsTwo.push(this.dsOneTemp[i]);
        this.dsOneTemp=[]; //clear
        if(this.commandIndex != 307)
        { 
          this.commandIndex++;
          this.currentStage=this.commandIndex;
          this.BleWrite();
        }
        else
        { 
          this.eventDownloaded=true;
          console.log('whole dsTwo=',this.dsTwo);
          // unpack the 2048 bytes event
          console.log('parseEvent finished');
          this.parseEvent();
          this.dslen=0;
          this.oldLen=1000;  //make sure not reading 307 again        
        } //if else
      } //if else
      break; 
    } //case 300-307
  } //switch
} //handleBleRead

ArrangeLocation(inBuf:ArrayBuffer)
{
  var tempStr:string;
  for (var i = 0; i < 12; i++) 
    tempStr += String.fromCharCode(inBuf[i+3]);
  var tempNum=tempStr.indexOf('  ',0);
  console.log('tempNum',tempNum);
  if(tempNum<0) tempNum=12;
  for (var i = 0; i <tempNum ; i++) {
    this.basicLocation += String.fromCharCode(inBuf[i+3]);
  }
}

unPackLog()
{
  var time,temp,atte,pilot,i24v,i24vr,i,j;
  this.logCount=0;
  for (j = 0; j < 16; j++)
  {
    for (i=0; i < 16; i++)
    {
      time= (this.dsOne[i*16+j*256+0]*256)+ this.dsOne[i*16+j*256+1];
      if(time<0xFFEF)
      {
            this.timeOne.push(time);
            temp= (this.dsOne[i*16+j*256+2]*256)+ this.dsOne[i*16+j*256+3];
            this.tempOne.push(temp/10);
            atte= (this.dsOne[i*16+j*256+4]*256)+ this.dsOne[i*16+j*256+5];
            this.atteOne.push(atte);
            pilot=(this.dsOne[i*16+j*256+6]*256)+ this.dsOne[i*16+j*256+7];
            this.pilotOne.push(pilot/10);
            i24v= (this.dsOne[i*16+j*256+8]*256)+ this.dsOne[i*16+j*256+9];
            this.i24vOne.push(i24v/10);
            i24vr=(this.dsOne[i*16+j*256+10]*256)+this.dsOne[i*16+j*256+11];
            this.i24vrOne.push(i24vr);
            this.logCount++;
      }
      else
      {
        console.log('attention: over the time limit,time=,i=,j=,count=',time,i,j,this.logCount);
      }
    }// for i
  } // for j
  console.log ('logCount=',this.logCount);
  j=this.nowTimeCount;
  var aCount:number;
  var bCount:number;
  for (i=0; i < this.logCount ;i++)
  { 
    aCount=this.timeOne[i];
    bCount=j-aCount;
 //   console.log('current deduct',bCount);
    if(bCount<0) bCount+=65520;
    this.timeOneString[i]=bCount.toString();
  }

  console.log('after timeOneString',this.timeOneString);
  console.log('temp',this.tempOne);
  console.log('atte',this.atteOne);
  console.log('pilot',this.pilotOne);
  console.log('i24v',this.i24vOne);
  console.log('i24vr',this.i24vrOne);
} //unPackLog

  BleSet(){
      var setdata = new Uint8Array(21);
      switch(this.commandIndex) { 
      case 201: //work mode
      case 202: //Pilot Channel
      case 203: //log interval
      case 204: //attenuator
      case 205: //cable length 
      {
        for(var i=0;i<21;i++)
          setdata[i] = this.set04Cmd[i];    
        break; 
        } //case 201-205
      case 288: //loc9
      {
        for(var i=0;i<21;i++)
          setdata[i] = this.setLoc9Cmd[i];    
        break; 
        } //case 288
      case 289: //locA
      {
        for(var i=0;i<21;i++)
          setdata[i] = this.setLocACmd[i];    
        break; 
        } //case 289
      case 290: //locB
      {
        for(var i=0;i<21;i++)
          setdata[i] = this.setLocBCmd[i];    
        break; 
        } //case 290
      case 291: //locC
      {
        for(var i=0;i<21;i++)
          setdata[i] = this.setLocCCmd[i];    
        break; 
        } //case 291
      } //switch
//      console.log('setData log',setdata.buffer);
      this.ble
      .write(
          this.peripheral.id,
          BLE_SERVICE,
          BLE_CHARACTERISTIC,
          setdata.buffer
      )
      .then(
          data => { 
              this.BleSubscribe();
          },
          err => {
              console.log(err);
          }
      );
  }//BleSet

BleWrite() { 
  console.log("2_1_1_1_1 BleWrite");
  var inputdata = new Uint8Array(8);
  switch(this.commandIndex) { 
    case 0: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.req00Cmd[i];    
      break; 
    } 
    case 1: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.req01Cmd[i];
      break; 
    } 
    case 2: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.req02Cmd[i]; 
      break; 
    } 
    case 3: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.req03Cmd[i];
      break; 
    }
    case 4: { 
        for(var i=0;i<8;i++)
          inputdata[i] = this.req04Cmd[i];
        break; 
    }
    case 5: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.req05Cmd[i]; 
      break; 
    }
    case 6: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.req06Cmd[i]; 
      break; 
    }
    case 7: { 
        for(var i=0;i<8;i++)
          inputdata[i] = this.req07Cmd[i];
        break; 
    }
    case 8: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.req08Cmd[i];
      break; 
    }

    case 9: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.location1[i];
      break; 
    }
    case 10: { 
        for(var i=0;i<8;i++)
          inputdata[i] = this.location2[i];
        break; 
    }
    case 11: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.location3[i];
      break; 
    }
    case 12: { 
    for(var i=0;i<8;i++)
      inputdata[i] = this.location4[i];
    break; 
    }
    case 13: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.req0DCmd[i];
      break; 
    }
    case 100: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataE8[i];
      //console.log('write 100',inputdata);
      break; 
    }
    case 101: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataE9[i];
      break; 
    }
    case 102: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataEA[i];
      break; 
    }
    case 103: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataEB[i];
      break; 
    }
    case 104: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataEC[i];
      break; 
    }
    case 105: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataED[i];
      break; 
    }
    case 106: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataEE[i];
      break; 
    }
    case 107: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataEF[i];
      break; 
    }
    case 108: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataF0[i];
      break; 
    }
    case 109: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataF1[i];
      break; 
    }
    case 110: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataF2[i];
      break; 
    }
    case 111: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataF3[i];
      break; 
    }
    case 112: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataF4[i];
      break; 
    }
    case 113: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataF5[i];
      break; 
    }
    case 114: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataF6[i];
      break; 
    }
    case 115: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataF7[i];
      break; 
    }
    case 300: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataF8[i];
      break; 
    } //300event
    case 301: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataF9[i];
      break; 
    }
    case 302: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataFA[i];
      break; 
    }
    case 303: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataFB[i];
      break; 
    }
    case 304: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataFC[i];
      break; 
    }
    case 305: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataFD[i];
      break; 
    }
    case 306: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataFE[i];
      break; 
    }
    case 307: { 
      for(var i=0;i<8;i++)
        inputdata[i] = this.ddataFF[i];
      break; 
    }
  } //switch

  console.log("2_1_1_1_1 peripheral.id,BLE_SERVICE,BLE_CHARACTERISTIC,inputdata",this.peripheral.id,BLE_SERVICE,BLE_CHARACTERISTIC,inputdata);
  this.ble
        .write(
//      .writeWithoutResponse(
          this.peripheral.id,
          BLE_SERVICE,
          BLE_CHARACTERISTIC,
          inputdata.buffer
        )
      .then(
          data => { 
              this.BleSubscribe();
          },
          err => {
              console.log(err);
          }
      );
} //BleWrite

BleSubscribe() {
  this.ble
      .startNotification(this.peripheral.id, BLE_SERVICE, BLE_CHARACTERISTIC)
      .subscribe(
          data => {
              this.onValueChange(data);
//              console.log('data onValueChange',data)
          },
          () =>
              this.showAlert(
                  "Unexpected Error",
                  "Failed to subscribe for changes, please try to reconnect."
              )
      );
}

onValueChange(buffer: ArrayBuffer) {
//  console.log('entry exchange',buffer);
  this.ngZone.run(() => {
      try {
          if (this.dataFromDevice == undefined) this.dataFromDevice = this.bytesToString(buffer).replace(/\s+/g, " ");
          else this.dataFromDevice += '<br />' + this.bytesToString(buffer).replace(/\s+/g, " ");
          var outputdata = new Uint8Array(buffer[0]);
 //         console.log('outputdata',outputdata);
          this.handleBleRead(outputdata);

      } catch (e) {
          console.log(e);
      }
  });
}

bytesToString(buffer) {
  return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

onConnected(peripheral) {
  console.log("2_1_1_1 BleConnect");
  console.log("onConnected peripheral:",peripheral);
  this.ngZone.run(() => {
    //Call BLE Connect - Connect to BLE Device
    this.peripheral = peripheral;
    this.BleWrite();
  });
}

async onDeviceDisconnected(peripheral) {
  var tabd:any;
  this.translateService.get('MESSAGEtabd').subscribe(
    value =>{ tabd=value;});
  var rcbd:any;
  this.translateService.get('MESSAGErcbd').subscribe(
    value =>{ rcbd=value;});
  var rct:any;
  this.translateService.get('MESSAGErct').subscribe(
    value =>{ rct=value;});
  var exit:any;
  this.translateService.get('MESSAGEexit').subscribe(
    value =>{ exit=value;});
  this.alertMessageExitReconnect(tabd,rcbd,exit,rct);
} //onDeviceDisconnected

ReconnectBle(){
  console.log('Serial Test 5');
  console.log('ReconnectBle');
  if (this.tabNow!=1) this.router.navigateByUrl('/tabs/tab1');
  this.startScanBle();
} //ReconnectBle


// Disconnect peripheral when leaving the page
ionViewWillLeave() {
  console.log('ACI disconnecting Bluetooth');
//this.BleDisconnect();
}

async showAlert(title, message) {
  let alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ["OK"]
  });
  alert.present();
}

async showToastInfo(msg) {
  const toast = await this.toastCtrl.create({
    message: msg,
    duration: 2500,
    position: 'middle'
    });
    toast.present();
}

CRCAll01()
{
  this.CRC16Calc(this.req00Cmd,6);
  this.CRC16Calc(this.req01Cmd,6);
  this.CRC16Calc(this.req02Cmd,6);
  this.CRC16Calc(this.req03Cmd,6);
  this.CRC16Calc(this.req04Cmd,6);
  this.CRC16Calc(this.req05Cmd,6);
  this.CRC16Calc(this.req06Cmd,6);
  this.CRC16Calc(this.req07Cmd,6);
  this.CRC16Calc(this.req08Cmd,6);
  this.CRC16Calc(this.location1,6);
  this.CRC16Calc(this.location2,6);
  this.CRC16Calc(this.location3,6);
  this.CRC16Calc(this.location4,6); 
  this.CRC16Calc(this.req0DCmd,6);
}

CRCAll02()
{
  this.CRC16Calc(this.ddataE8,6);
  this.CRC16Calc(this.ddataE9,6);
  this.CRC16Calc(this.ddataEA,6);
  this.CRC16Calc(this.ddataEB,6);
  this.CRC16Calc(this.ddataEC,6);
  this.CRC16Calc(this.ddataED,6);
  this.CRC16Calc(this.ddataEE,6);
  this.CRC16Calc(this.ddataEF,6);
  this.CRC16Calc(this.ddataF0,6);
  this.CRC16Calc(this.ddataF1,6);
  this.CRC16Calc(this.ddataF2,6);
  this.CRC16Calc(this.ddataF3,6); 
  this.CRC16Calc(this.ddataF4,6);
  this.CRC16Calc(this.ddataF5,6);
  this.CRC16Calc(this.ddataF6,6);
  this.CRC16Calc(this.ddataF7,6); 
  this.CRC16Calc(this.ddataF8,6);
  this.CRC16Calc(this.ddataF9,6);
  this.CRC16Calc(this.ddataFA,6);
  this.CRC16Calc(this.ddataFB,6); 
  this.CRC16Calc(this.ddataFC,6);
  this.CRC16Calc(this.ddataFD,6);
  this.CRC16Calc(this.ddataFE,6);
  this.CRC16Calc(this.ddataFF,6); 
}
/* Msg:*message to calculate CRC upon
usDatalen: number of bytes in message*/
CRC16Calc(Msg,usDatalen:number)
{
var auchCRCHi=[
0x00,0xc1,0x81,0x40,0x01,0xc0,0x80,0x41,0x01,0xc0,
0x80,0x41,0x00,0xc1,0x81,0x40,0x01,0xc0,0x80,0x41,
0x00,0xc1,0x81,0x40,0x00,0xc1,0x81,0x40,0x01,0xc0,
0x80,0x41,0x01,0xc0,0x80,0x41,0x00,0xc1,0x81,0x40,
0x00,0xc1,0x81,0x40,0x01,0xc0,0x80,0x41,0x00,0xc1,
0x81,0x40,0x01,0xc0,0x80,0x41,0x01,0xc0,0x80,0x41,
0x00,0xc1,0x81,0x40,0x01,0xc0,0x80,0x41,0x00,0xc1,
0x81,0x40,0x00,0xc1,0x81,0x40,0x01,0xc0,0x80,0x41,
0x00,0xc1,0x81,0x40,0x01,0xc0,0x80,0x41,0x01,0xc0,
0x80,0x41,0x00,0xc1,0x81,0x40,0x00,0xc1,0x81,0x40,
0x01,0xc0,0x80,0x41,0x01,0xc0,0x80,0x41,0x00,0xc1,
0x81,0x40,0x01,0xc0,0x80,0x41,0x00,0xc1,0x81,0x40,
0x00,0xc1,0x81,0x40,0x01,0xc0,0x80,0x41,0x01,0xc0,
0x80,0x41,0x00,0xc1,0x81,0x40,0x00,0xc1,0x81,0x40,
0x01,0xc0,0x80,0x41,0x00,0xc1,0x81,0x40,0x01,0xc0,
0x80,0x41,0x01,0xc0,0x80,0x41,0x00,0xc1,0x81,0x40,
0x00,0xc1,0x81,0x40,0x01,0xc0,0x80,0x41,0x01,0xc0,
0x80,0x41,0x00,0xc1,0x81,0x40,0x01,0xc0,0x80,0x41,
0x00,0xc1,0x81,0x40,0x00,0xc1,0x81,0x40,0x01,0xc0,
0x80,0x41,0x00,0xc1,0x81,0x40,0x01,0xc0,0x80,0x41,
0x01,0xc0,0x80,0x41,0x00,0xc1,0x81,0x40,0x01,0xc0,
0x80,0x41,0x00,0xc1,0x81,0x40,0x00,0xc1,0x81,0x40,
0x01,0xc0,0x80,0x41,0x01,0xc0,0x80,0x41,0x00,0xc1,
0x81,0x40,0x00,0xc1,0x81,0x40,0x01,0xc0,0x80,0x41,
0x00,0xc1,0x81,0x40,0x01,0xc0,0x80,0x41,0x01,0xc0,
0x80,0x41,0x00,0xc1,0x81,0x40];

//var auchCRCLo[ ]= new Uint8Array(256);
var auchCRCLo=[
  0x00,0xc0,0xc1,0x01,0xc3,0x03,0x02,0xc2,0xc6,0x06,
  0x07,0xc7,0x05,0xc5,0xc4,0x04,0xcc,0x0c,0x0d,0xcd,
  0x0f,0xcf,0xce,0x0e,0x0a,0xca,0xcb,0x0b,0xc9,0x09,
  0x08,0xc8,0xd8,0x18,0x19,0xd9,0x1b,0xdb,0xda,0x1a,
  0x1e,0xde,0xdf,0x1f,0xdd,0x1d,0x1c,0xdc,0x14,0xd4,
  0xd5,0x15,0xd7,0x17,0x16,0xd6,0xd2,0x12,0x13,0xd3,
  0x11,0xd1,0xd0,0x10,0xf0,0x30,0x31,0xf1,0x33,0xf3,
  0xf2,0x32,0x36,0xf6,0xf7,0x37,0xf5,0x35,0x34,0xf4,
  0x3c,0xfc,0xfd,0x3d,0xff,0x3f,0x3e,0xfe,0xfa,0x3a,
  0x3b,0xfb,0x39,0xf9,0xf8,0x38,0x28,0xe8,0xe9,0x29,
  0xeb,0x2b,0x2a,0xea,0xee,0x2e,0x2f,0xef,0x2d,0xed,
  0xec,0x2c,0xe4,0x24,0x25,0xe5,0x27,0xe7,0xe6,0x26,
  0x22,0xe2,0xe3,0x23,0xe1,0x21,0x20,0xe0,0xa0,0x60,
  0x61,0xa1,0x63,0xa3,0xa2,0x62,0x66,0xa6,0xa7,0x67,
  0xa5,0x65,0x64,0xa4,0x6c,0xac,0xad,0x6d,0xaf,0x6f,
  0x6e,0xae,0xaa,0x6a,0x6b,0xab,0x69,0xa9,0xa8,0x68,
  0x78,0xb8,0xb9,0x79,0xbb,0x7b,0x7a,0xba,0xbe,0x7e,
  0x7f,0xbf,0x7d,0xbd,0xbc,0x7c,0xb4,0x74,0x75,0xb5,
  0x77,0xb7,0xb6,0x76,0x72,0xb2,0xb3,0x73,0xb1,0x71,
  0x70,0xb0,0x50,0x90,0x91,0x51,0x93,0x53,0x52,0x92,
  0x96,0x56,0x57,0x97,0x55,0x95,0x94,0x54,0x9c,0x5c,
  0x5d,0x9d,0x5f,0x9f,0x9e,0x5e,0x5a,0x9a,0x9b,0x5b,
  0x99,0x59,0x58,0x98,0x88,0x48,0x49,0x89,0x4b,0x8b,
  0x8a,0x4a,0x4e,0x8e,0x8f,0x4f,0x8d,0x4d,0x4c,0x8c,
  0x44,0x84,0x85,0x45,0x87,0x47,0x46,0x86,0x82,0x42,
  0x43,0x83,0x41,0x81,0x80,0x40];

  var uchCRCHi=0xFF ; /*CRC high byte*/
  var uchCRCLo=0xFF ; /*CRC low byte*/
  var uIndex;
  var msgIndex=0;
  var total=usDatalen;

    while(usDatalen--) /*pass through message buffer*/
    {
      uIndex=uchCRCHi^Msg[msgIndex]; /*calculate the CRC*/
      msgIndex++;
      uchCRCHi=uchCRCLo^auchCRCHi[uIndex];
      uchCRCLo=auchCRCLo[uIndex];
    }

  Msg[total]=uchCRCHi; //write back
  Msg[total+1]=uchCRCLo;
} //CRC16Calc

  async startDownload() {
    this.loadingTimeout=0;
    var mymsg:any;
    this.translateService.get('MESSAGEdl').subscribe(
      value =>{ mymsg=value;});
    const loading = await this.loadingCtrl.create({  
      message: mymsg   
      });  
      loading.present(); 
    const interval = setInterval(() => {
      this.loadingTimeout++;
      if((this.currentStage == this.oldStage) && (this.dslen==this.oldLen))
      {
        //rewrite Ble with old Stage
        if(!this.globalDownloaded)
        {
          console.log('T2 dslen=',this.dslen);
          this.dslen=this.oldLen=0;
          this.oldStage =this.currentStage=this.commandIndex;
          this.dsOneTemp=[]; //clear
          this.dsOneTemp.length=0; //clear
          this.BleWrite();
          console.log('startDownload rewrite stage',this.currentStage);
        }
      }
      else
      { 
        //update stage
        this.oldStage =this.currentStage=this.commandIndex;
        this.oldLen = this.dslen;
        console.log('startDownload updata stage',this.currentStage);
      }
      if (this.globalDownloaded) {
        clearInterval(interval);
        loading.dismiss();
        var mymsg:any;
        this.translateService.get('TOASTdc').subscribe(
          value =>{ mymsg=value;});
        this.showToastInfo(mymsg);
      }
      if (this.loadingTimeout>15) {
        clearInterval(interval);
        loading.dismiss();
        var sr:any;
        this.translateService.get('MESSAGEdl').subscribe(
          value =>{sr=value;});
        var nabdf:any;
        this.translateService.get('MESSAGEdct').subscribe(
          value =>{ nabdf=value;});
        this.showAlert(sr,nabdf);
      }
    }, 2000);
  } // startDownload

  async BleGetMainInfo() {
    console.log('2_1_2 BleGetMainInfo');
    this.globalDownloaded = false;
    this.sorted = false;
    this.buffer17length=0; //17bytes
    this.ds17=[]; //clear

    this.firstRead=false; //not finish
    this.loadingTimeout=0; // 30 seconds timeout
    var cdsim:any;
    this.translateService.get('MESSAGEcdsim').subscribe(
      value =>{ cdsim=value;});
    const loading = await this.loadingCtrl.create({  
      message: cdsim  
      });  
      loading.present();
    const interval2 = setInterval(() => {
      this.loadingTimeout++;
      console.log('loadingTimeout',this.loadingTimeout);
      if((this.loadingTimeout>=12) || (!this.connectionBluetooth))
      {
        clearInterval(interval2); 
        loading.dismiss();
        var dct:any;
        this.translateService.get('MESSAGEdct').subscribe(
          value =>{ dct=value;});
        var rcta:any;
        this.translateService.get('MESSAGErcta').subscribe(
          value =>{ rcta=value;});
        var rct:any;
        this.translateService.get('MESSAGErct').subscribe(
          value =>{ rct=value;});
        var exit:any;
        this.translateService.get('MESSAGEexit').subscribe(
          value =>{ exit=value;});
        this.alertMessageExitReconnect(dct,rcta,exit,rct);
      }
      if (this.firstRead && this.connectionBluetooth ) 
      {
        clearInterval(interval2); 
        loading.dismiss();
        var mymsg:any;
        this.translateService.get('TOASTdc').subscribe(
          value =>{ mymsg=value;});
        this.showToastInfo(mymsg);
      }
    }, 2000);
  } // BleGetMainInfo

    onDeviceReady() {
      navigator['app'].exitApp();
  }//onDeviceReady

  async startScan(){
    console.log('1. startScan');
    var mymsg:any;
    this.translateService.get('SCAN').subscribe(
      value =>{ mymsg=value;})

    const loading = await this.loadingCtrl.create({  
      message: mymsg   
      });  
      loading.present(); 
      this.connectionBluetooth=false; //no ble
      this.scan();  
      setTimeout(() => {
        loading.dismiss();
      }, 5000);
  }//startScan

  //# 等待五秒鐘，再判斷是否有連線完成(setStatus)
  startScanBle(){
    console.log('2. startScanBle');
    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  }//startScanBle

  scanMain(){
    console.log('Serial Test 2');
    this.buffer17length=0; //17bytes
    this.ds17=[]; //clear
    this.commandIndex=0; //initial write 0
    this.firstRead=false; //not finish
    this.loadingTimeout=0; // 12 seconds timeout
    this.BleWrite();
    this.BleGetMainInfo();
  } //scanMain

  setStatus(message) {
    console.log('2_1 setStatus');
    this.bBLEOn= this.connectionBluetooth;
    if(this.connectionBluetooth)
    {
      this.eventDownloaded=false;
      this.globalDownloaded = false;
      this.sorted = false;
      this.buffer17length=0; //17bytes
      this.ds17=[]; //clear
      this.commandIndex=0; //initial write 0
      this.BleConnect(this.bleDevice);
      this.firstRead=false; //not finish
      this.loadingTimeout=0; // 15 seconds timeout
      this.BleGetMainInfo();
    }
    else
    {
      var sr:any;
      this.translateService.get('SR').subscribe(
        value =>{ sr=value;});
      var nabdf:any;
      this.translateService.get('NABDF').subscribe(
        value =>{ nabdf=value;});
      this.showAlert(sr,nabdf);
    }

    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }//setStatus
  
  scan() {
    console.log('1_1 scan');
    this.devices = [];  // clear list
    this.ble.scan([],5).subscribe( // scanning for  seconds on one tap
      device => this.onDeviceDiscovered(device)
    );
  } //scan

  onDeviceDiscovered(device) {
    console.log('1_2 onDeviceDiscovered');
    var str: string; 
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      str= JSON.parse(JSON.stringify(device, null, 2)).name;
      this.devices.push(device); // filling the list with discovered list
      if(str)
      {
        this.bleNames.push(str);
        if(str.indexOf("ACI")>=0)
        {
          this.connectionBluetooth=true; //only here
          this.bleDevice=device;  
          this.dongleName=str;
          console.log('Found ACI Bluetooth dongle Device',this.bleDevice);
        }
      }
    });
  } //onDeviceDiscovered

  parseEvent()
  {
    console.log('inside parseEvent');
    var time,ecode,eparam,i,j;
    var aCount:number;
    var bCount:number;
    //2048
    for (j = 0; j < 8; j++)
    {
      for (i=0; i < 16; i++)
      {
        time= (this.dsTwo[i*16+j*256+0]*256)+ this.dsTwo[i*16+j*256+1];
        this.timeTwo.push(time);
        ecode= (this.dsTwo[i*16+j*256+2]*256)+ this.dsTwo[i*16+j*256+3];
        this.eCodeTwo.push(ecode);
        eparam= (this.dsTwo[i*16+j*256+4]*256)+ this.dsTwo[i*16+j*256+5];
        this.eParamTwo.push(eparam);
      }// for i
    } // for j
  
    j=this.nowTimeCount;
    console.log('nowTimeCount=',j);

    for (i=0; i < 128;i++)
    { 
      aCount=this.timeTwo[i];
      bCount=j-aCount;
      if(bCount<0) bCount+=65520;
      this.timeTwo[i]=bCount;
    }

    console.log('timeTwo',this.timeTwo);
    console.log('eCodeTwo',this.eCodeTwo);
    console.log('eParamTwo',this.eParamTwo);

             

//sorting time
    var numa:number,numb:number;
    var a:number,b:number;
    let tArray:any;
    for(a=0;a<128;a++)
    { 
      for(b=(a+1);b<128;b++)
      {
        numa = this.timeTwo[a];
        numb = this.timeTwo[b];
        if(numa < numb)
        { 
          tArray=this.timeTwo[a];
          this.timeTwo[a]=this.timeTwo[b];
          this.timeTwo[b]=tArray; 
          
          tArray=this.eCodeTwo[a];
          this.eCodeTwo[a]=this.eCodeTwo[b];
          this.eCodeTwo[b]=tArray;

          tArray=this.eParamTwo[a];
          this.eParamTwo[a]=this.eParamTwo[b];
          this.eParamTwo[b]=tArray;
        }
      }
    } //for
    console.log('after timesort',this.timeTwo);
  }//parseEvent

  async switchtoAGC(){
    var g0:any;
    this.translateService.get('TOASTg0').subscribe(
      value =>{ g0=value;});
    var g1:any;
    this.translateService.get('TOASTg1').subscribe(
      value =>{ g1=value;});        
   // this.showAlert(g0,g1+this.sPC2+g2);

    var mymsg:any;
    if(this.workon2channel)
      mymsg = g0+this.sPC2+g1;
    else
      mymsg = g0+this.sPC+g1;

    const loading = await this.loadingCtrl.create({  
      message: mymsg   
      });  
      loading.present(); 

      setTimeout(() => {
        this.oneTimeAsk=true;
        this.ds17=[]; //clear
        this.buffer17length=0;
        this.commandIndex=5;
        this.BleWrite();
        loading.dismiss();
      }, 30000);      
  }//switchtoAGC

  DisplayAlignResult()
  {
    this.chosenWork=this.basicModeID=this.alignReadMode;
    console.log('switch to AGC result=',this.alignReadMode);
    switch(this.chosenWork) 
    {
      case 2:{
        this.chosenWorkString="AGC";
        break;
      }
      case 3:{
        this.chosenWorkString="TGC";
        break;
      }
      case 4:{
        this.chosenWorkString="MGC";
        break;
      }
    }//switch
    if(this.alignReadMode==2)
    { //switchtoagc failed
      var g0:any;
      this.translateService.get('TOASTg0').subscribe(
        value =>{ g0=value;});
      var g2:any;
      this.translateService.get('TOASTg2').subscribe(
        value =>{ g2=value;});
      this.showAlert(g0,g2);
    }
    else
    { //switchtoagc failed
      var g4:any;
      this.translateService.get('TOASTg4').subscribe(
        value =>{ g4=value;});
      var g3:any;
      this.translateService.get('TOASTg3').subscribe(
        value =>{ g3=value;});
      this.showAlert(g4,g3);
    }
  }//DisplayAlignResult

} //ts
