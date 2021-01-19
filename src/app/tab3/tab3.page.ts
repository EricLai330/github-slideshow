import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../global.service";
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

const CP_KEY = 'PILOT_CHANNEL';
const CP_KEY2 = 'PILOT_CHANNEL2';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})


export class Tab3Page implements OnInit {
  interval = {"list":"",id:0};
  intervals= [];
  defaultCode2:string;
  newcode:string; //index code
  newcode2:string; //index code
  chosenlocation: string;
  chosenCode: string;
  chosenCode2: string;
  chosenCodeFull: string;
  chosenCodeFull2: string;
  chosenLog: number;
  chosenLogString: string;
  chosenAtt: number;
  chosenCable: number;

  channelCode =
  [
    "2","A<@","A<A",
    "3","B<@","B<A",
    "4","C<@","C<A",
    "5","D<@","D<A",
    "6","E<@","E<A",
    "7","F<@","F<A",
    "8","G<@","G<A",
    "9","H<@","H<A",
    "10","@?<@","@?<A",
    "11","@@<@","@@<A",
    "12","@A<@","@A<A",
    "13","@B<@","@B<A",
    "14","@C<@","@C<A",
    "15","@D<@","@D<A",
    "16","@E<@","@E<A",
    "17","@F<@","@F<A",
    "18","@G<@","@G<A",
    "19","@H<@","@H<A",
    "20","A?<@","A?<A",
    "21","A@<@","A@<A",
    "22","AA<@","AA<A",
    "23","AB<@","AB<A",
    "24","AC<@","AC<A",
    "25","AD<@","AD<A",
    "26","AE<@","AE<A",
    "27","AF<@","AF<A",
    "28","AG<@","AG<A",
    "29","AH<@","AH<A",
    "30","B?<@","B?<A",
    "31","B@<@","B@<A",
    "32","BA<@","BA<A",
    "33","BB<@","BB<A",
    "34","BC<@","BC<A",
    "35","BD<@","BD<A",
    "36","BE<@","BE<A",
    "37","BF<@","BF<A",
    "38","BG<@","BG<A",
    "39","BH<@","BH<A",
    "40","C?<@","C?<A",
    "41","C@<@","C@<A",
    "42","CA<@","CA<A",
    "43","CB<@","CB<A",
    "44","CC<@","CC<A",
    "45","CD<@","CD<A",
    "46","CE<@","CE<A",
    "47","CF<@","CF<A",
    "48","CG<@","CG<A",
    "49","CH<@","CH<A",
    "50","D?<@","D?<A",
    "51","D@<@","D@<A",
    "52","DA<@","DA<A",
    "53","DB<@","DB<A",
    "54","DC<@","DC<A",
    "55","DD<@","DD<A",
    "56","DE<@","DE<A",
    "57","DF<@","DF<A",
    "58","DG<@","DG<A",
    "59","DH<@","DH<A",
    "60","E?<@","E?<A",
    "61","E@<@","E@<A",
    "62","EA<@","EA<A",
    "63","EB<@","EB<A",
    "64","EC<@","EC<A",
    "65","ED<@","ED<A",
    "66","EE<@","EE<A",
    "67","EF<@","EF<A",
    "68","EG<@","EG<A",
    "69","EH<@","EH<A",
    "70","F?<@","F?<A",
    "71","F@<@","F@<A",
    "72","FA<@","FA<A",
    "73","FB<@","FB<A",
    "74","FC<@","FC<A",
    "75","FD<@","FD<A",
    "76","FE<@","FE<A",
    "77","FF<@","FF<A",
    "78","FG<@","FG<A",
    "79","FH<@","FH<A",
    "80","G?<@","G?<A",
    "81","G@<@","G@<A",
    "82","GA<@","GA<A",
    "83","GB<@","GB<A",
    "84","GC<@","GC<A",
    "85","GD<@","GD<A",
    "86","GE<@","GE<A",
    "87","GF<@","GF<A",
    "88","GG<@","GG<A",
    "89","GH<@","GH<A",
    "90","H?<@","H?<A",
    "91","H@<@","H@<A",
    "92","HA<@","HA<A",
    "93","HB<@","HB<A",
    "94","HC<@","HC<A",
    "95","HD<@","HD<A",
    "96","HE<@","HE<A",
    "97","HF<@","HF<A",
    "98","HG<@","HG<A",
    "99","HH<@","HH<A",
    "100","@??<@","@??<A",
    "101","@?@<@","@?@<A",
    "102","@?A<@","@?A<A",
    "103","@?B<@","@?B<A",
    "104","@?C<@","@?C<A",
    "105","@?D<@","@?D<A",
    "106","@?E<@","@?E<A",
    "107","@?F<@","@?F<A",
    "108","@?G<@","@?G<A",
    "109","@?H<@","@?H<A",
    "110","@@?<@","@@?<A",
    "111","@@@<@","@@@<A",
    "112","@@A<@","@@A<A",
    "113","@@B<@","@@B<A",
    "114","@@C<@","@@C<A",
    "115","@@D<@","@@D<A",
    "116","@@E<@","@@E<A",
    "117","@@F<@","@@F<A",
    "118","@@G<@","@@G<A",
    "119","@@H<@","@@H<A",
    "120","@A?<@","@A?<A",
    "121","@A@<@","@A@<A",
    "122","@AA<@","@AA<A",
    "123","@AB<@","@AB<A",
    "124","@AC<@","@AC<A",
    "125","@AD<@","@AD<A",
    "126","@AE<@","@AE<A",
    "127","@AF<@","@AF<A",
    "128","@AG<@","@AG<A",
    "129","@AH<@","@AH<A",
    "130","@B?<@","@B?<A",
    "131","@B@<@","@B@<A",
    "132","@BA<@","@BA<A",
    "133","@BB<@","@BB<A",
    "134","@BC<@","@BC<A",
    "135","@BD<@","@BD<A",
    "136","@BE<@","@BE<A",
    "137","@BF<@","@BF<A",
    "138","@BG<@","@BG<A",
    "139","@BH<@","@BH<A",
    "140","@C?<@","@C?<A",
    "141","@C@<@","@C@<A",
    "142","@CA<@","@CA<A",
    "143","@CB<@","@CB<A",
    "144","@CC<@","@CC<A",
    "145","@CC<@","@CD<A",
    "146","@CE<@","@CE<A",
    "147","@CF<@","@CF<A",
    "148","@CG<@","@CG<A", 
    "148","@CH<@","@CH<A",     
    "150","@D?<@","@D?<A",
    "151","@D@<@","@D@<A",
    "152","@DA<@","@DA<A",
    "153","@DB<@","@DB<A",
    "154","@DC<@","@DC<A",
    "155","@DD<@","@DD<A",
    "156","@DE<@","@DE<A",
    "157","@DF<@","@DF<A",
    "158","@DG<@","@DG<A"   
  ];       


  constructor( public global: GlobalService,private storage: Storage,
    private translateService: TranslateService
  ) { 
    this.intervals = [
      {list:"1 min.- 4 hours",id:1},
      {list:"2 min.- 8 hours",id:2},
      {list:"3 min.- 12 hours",id:3},
      {list:"5 min.- 21 hours",id:5},
      {list:"10 min.- 1 day",id:10},
      {list:"15 min.- 2 days",id:15},
      {list:"30 min.- 5 days",id:30},
      {list:"1 hr.- 10 days",id:60},
      {list:"2 hrs.- 20 days",id:120},
      {list:"3 hrs.- 30 days",id:180},
      {list:"4 hrs.- 40 days",id:240}
    ];
    // dubugging
    this.setInitialValues();
    this.getIntervalString(); //for log interval from id
  }

  ngOnInit() {
  } //ngOnInit

  ionViewDidEnter() {
    console.log('Enter Tab3 BLE view');
    this.global.tabNow=3;
//    this.setInitialValues();
  } //ionViewDidEnter

  setInitialValues()
  {
    this.chosenlocation=this.global.basicLocation;// = '23307-66th Avenue South';
    this.global.chosenWork=this.global.basicModeID;//=4;
    switch(this.global.chosenWork) 
    {
      case 2:{
        this.global.chosenWorkString="AGC";
        break;
      }
      case 3:{
        this.global.chosenWorkString="TGC";
        break;
      }
      case 4:{
        this.global.chosenWorkString="MGC";
        break;
      }
    }//switch

//getNewcode
    this.storage.get(CP_KEY).then(val => {
      if (val) {
        this.newcode = val;
      }
    }); 
 
    this.global.workon2channel=false;
    this.defaultCode2='';
    this.chosenCodeFull='';
    this.chosenCode='';
    this.chosenCodeFull2='';
    this.chosenCode2='';
    this.chosenLog = this.global.basicIntervalID; // = 1 ;
    this.chosenAtt = this.global.currentAttenuator;  // = 2596;
    this.chosenCable = this.global.basicCableLengthID;  // = 27;
    this.newcode2 = this.defaultCode2;
    this.storage.get(CP_KEY2).then(val => {
      if (val) {
        this.newcode2 = val;
      }
    }); 
  } //setInitialValues

  getIntervalString()
  {
    switch(this.chosenLog)
    {
      case 1: {
        this.chosenLogString="1 min.- 4 hours";
        break;
      }
      case 2:{
        this.chosenLogString="2 min.- 8 hours";
        break;
      }
      case 3:{
        this.chosenLogString="3 min.- 12 hours";
        break;
      }
      case 5:{
        this.chosenLogString="5 min.- 21 hours";
        break;
      }
      case 10:{
        this.chosenLogString="10 min.- 1 day";
        break;
      }
      case 15:{
        this.chosenLogString="15 min.- 2 days";
        break;
      }
      case 30:{
        this.chosenLogString="30 min.- 5 days";
        break;
      }
      case 60:{
        this.chosenLogString="1 hr.- 10 days";
        break;
      }
      case 120:{
        this.chosenLogString="2 hrs.- 20 days";
        break;
      }
      case 180:{
        this.chosenLogString="3 hrs.- 30 days";
        break;
      }
      case 240:{
        this.chosenLogString="4 hrs.- 40 days";
        break;
      }
    } //swith
  } //getIntervalString

  intervalChange() {
    console.log('ion select item',this.chosenLogString);
    switch(this.chosenLogString)
    {
      case "1 min.- 4 hours":{
        this.chosenLog=1;
        break;
      }
      case "2 min.- 8 hours":{
        this.chosenLog=2;
        break;
      }
      case "3 min.- 12 hours":{
        this.chosenLog=3;
        break;
      }
      case "5 min.- 21 hours":{
        this.chosenLog=5;
        break;
      }
      case "10 min.- 1 day":{
        this.chosenLog=10;
        break;
      }
      case "15 min.- 2 days":{
        this.chosenLog=15;
        break;
      }
      case "30 min.- 5 days":{
        this.chosenLog=30;
        break;
      }
      case "1 hr.- 10 days":{
        this.chosenLog=60;
        break;
      }
      case "2 hrs.- 20 days":{
        this.chosenLog=120;
        break;
      }
      case "3 hrs.- 30 days":{
        this.chosenLog=180;
        break;
      }
      case "4 hrs.- 40 days":{
        this.chosenLog=240;
        break;
      }
    } //swith
  }//intervalChange
  
  onSubmit(){
    console.log("on sumbit button");
  } //onSubmit
  
  setLocation(){
    console.log('chosenlocation:',this.chosenlocation);
    console.log('chosenlocation size:',this.chosenlocation.length);
    this.global.gTempString=this.chosenlocation;
    this.global.setNewLocation(this.chosenlocation);
    this.global.set09Location();
  } //setLocation cmd 9,A,B,C

  //fill whole packet number
  setWorkMode(){
    switch(this.global.chosenWork) 
    {
      case 2:{
        //this.chosenWorkString="AGC";
        this.global.gTempNumber=2;
        this.global.set04Work1(); //AGC->Align
        this.global.switchtoAGC();
        break;
      }
      case 3:{
        //this.chosenWorkString="TGC";
        this.global.gTempNumber=3;
        this.global.set04Work(3);
        break;
      }
      case 4:{
        //this.chosenWorkString="MGC"; set to the center
        this.global.gTempNumber=4;
        this.chosenAtt=this.global.currentAttenuator=this.global.centerAttenuator;
        this.global.chosenWork=this.global.basicModeID=4;
        this.global.set04Work4();
        break;
      }
    }//switch
  } //setWorkMode waiting this.global.chosenWork(2,3,4)

  changeWorkMode(value:number){
    this.global.chosenWork=value;
    switch(value) 
    {
      case 2:{
        this.global.chosenWorkString="AGC";
        break;
      }
      case 3:{
        this.global.chosenWorkString="TGC";
        break;
      }
      case 4:{
        this.global.chosenWorkString="MGC";
        break;
      }
    }//switch
  } //setWorkMode 

  setNewCode(){  
    this.global.gTempNumber=parseInt(this.chosenCode,10);
    this.global.set04CP(0x01,this.global.gTempNumber);
  } //setNewCode 

  setNewCode2(){  
    //this.changeWorkMode(2);
    //this.global.basicModeID=2; 
    this.global.gTempNumber2=parseInt(this.chosenCode2,10);
    this.global.set04CP2(0x01,this.global.gTempNumber2);
  } //setNewCode2

  searchCode(){ 
    var reI: number;
    for(var i=0; i<this.channelCode.length; i++)
    {
      if(this.channelCode[i]==this.newcode)
      { 
        this.global.basicCPModeID=reI=(i%3);
        i=i-reI;
        this.chosenCode=this.channelCode[i];
        if(this.global.basicCPModeID==1)
          this.chosenCodeFull=this.chosenCode+' IRC';
        else
          this.chosenCodeFull=this.chosenCode+' DIG';
          //if(this.global.basicCPModeID==2)
          //this.chosenCodeFull=this.chosenCode+' DIG';        
        console.log('chosenCode=',this.chosenCode);
        this.setNewCodePH(this.newcode);
        //this.changeWorkMode(4);
        return;
      }
    }
    //pilot not found
    var mymsg:any;
    this.translateService.get('TOASTpn').subscribe(
      value =>{ mymsg=value;});
    this.global.showToastInfo(mymsg);
    this.chosenCode='';
  } //searchCode

  searchCode2(){ 
    var reI: number;
    for(var i=0; i<this.channelCode.length; i++)
    {
      if(this.channelCode[i]==this.newcode2)
      { 
        this.global.basicCPModeID2=reI=(i%3);
        i=i-reI;
        this.chosenCode2=this.channelCode[i];
        if(this.global.basicCPModeID2==1)
          this.chosenCodeFull2=this.chosenCode2+' IRC';
        else
          this.chosenCodeFull2=this.chosenCode2+' DIG'; 
        //if(this.global.basicCPModeID2==2)
          //this.chosenCodeFull2=this.chosenCode2+' DIG';        
        console.log('chosenCode2=',this.chosenCode2);
        this.setNewCodePH2(this.newcode2);
        //this.changeWorkMode(4);
        return;
      }
    }
    //pilot not found
    var mymsg:any;
    this.translateService.get('TOASTpn').subscribe(
      value =>{ mymsg=value;});
    this.global.showToastInfo(mymsg);
    this.chosenCode2='';
  } //searchCode

  setLogInterval(){
    this.global.gTempNumber=this.chosenLog;
    this.global.set04Interval(0x08,this.chosenLog);
  } //setLogInterval cmd-04 mode-08 log time-[6]

  setCL(){
    this.global.gTempNumber=this.chosenCable;
    this.global.set04CL(0x03,this.chosenCable);
  } //setCL waiting this.chosenCable(9,18,27)

  changeCL(value:number){
    this.chosenCable=value;
  } //setCL 

  //fill whole packet
  setAtt(){
    this.global.gTempNumber=this.chosenAtt;
    this.global.set04Att(0x04,this.chosenAtt/256,this.chosenAtt%256);
  } //setAtt cmd-04 mode-07 centerAtt-[1][2]
  plusAtt(){
    if(this.chosenAtt<=2950)
      this.chosenAtt+=50;
    this.setAtt();
    this.global.chosenWork=this.global.basicModeID=4;
    this.changeWorkMode(4);
  } //plusAtt 
  centerAtt(){
    this.chosenAtt=this.global.centerAttenuator;
    this.setAtt();
    this.global.chosenWork=this.global.basicModeID=4;
    this.changeWorkMode(4);
  } //centerAtt 
  minusAtt(){
    if(this.chosenAtt>=50)
      this.chosenAtt-=50;
    this.setAtt();
    this.global.chosenWork=this.global.basicModeID=4;
    this.changeWorkMode(4);
  } //minusAtt
  maxAtt(){
      this.chosenAtt=3000;
      this.setAtt();
      this.global.chosenWork=this.global.basicModeID=4;
      this.changeWorkMode(4);
  } //maxAtt 
  minAtt(){
      this.chosenAtt=0;
      this.setAtt();
      this.global.chosenWork=this.global.basicModeID=4;
      this.changeWorkMode(4);
  } //minAtt 

  setNewCodePH(lng) {
    this.storage.set(CP_KEY, lng);
  } //setNewCodePH

  setNewCodePH2(lng) {
    this.storage.set(CP_KEY2, lng);
  } //setNewCodePH

} //ts

