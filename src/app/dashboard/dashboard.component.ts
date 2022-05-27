import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as cases  from  'src/assets/pic.json';
import * as productsjson  from  'src/assets/product.json';
import * as portjson  from  'src/assets/ports.json';

import * as moment from 'moment'
// import { debug } from 'console';
declare var $: any;
declare var jQuery: any;



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  width = '100%';
  height = '310';
  type = "scrollcolumn2d";
  dataFormat = "json";
  dataSource = data;
  dataSource1= data1;
  dataSource3= data3;
  dataSource2= data2;

  portarray=["Beijio",
  "Busan",
  "Hai Phong",
  "Ho Chi Minh",
  "Jiangmen ( LCL )",
  "Klang",
  "Kobe/Yokohama",
  "KWANGYANG",
  "Laem Chabang",
  "Ningbo",
  "Port Klang",
  "Qingdao",
  "Shanghai",
  "Singapore",
  "TANJUNG  PRIOK",
  "Xiamen",
  "Xingang"];

   products=["Air Conditioner parts",
   "Aluminum",
   "Aluminum-Wire",
   "Bellow",
   "Belt",
   "C-Block and C-Shaft",
   "C5",
   "Capillary",
   "CFF",
   "CKD",
   "CKD Part",
   "CKD Parts",
   "Clutch",
   "Comp Oil",
   "Comp Parts",
   "Compressor",
   "Control Box",
   "Controller  Assy",
   "Controller Assembly",
   "Copper",
   "Copper Tube",
   "Drain Motor",
   "Evaporator Assy",
   "Gear Case",
   "Glass",
   "Hub Nut",
   "HVT",
   "Inlet Valve",
   "Lamp",
   "Magnet Ferrite",
   "Motor",
   "Noise Filter",
   "Nut",
   "OLP/PTC",
   "OT Hose",
   "PCB",
   "PCB , LED",
   "PCB Parts",
   "PCB Parts/Glass",
   "Pipe Set",
   "Polyol",
   "PP Strap",
   "Pump",
   "Recator",
   "Ref Parts",
   "Remote",
   "RESIN  ABS/GPPS",
   "Resin",
   "Resin ABS",
   "RESIN EPS   (Open Top)",
   "RESIN HIPS",
   "Resin PP",
   "Resin,ABS",
   "Service Valve",
   "Socket",
   "Solder",
   "Stator & Rotor",
   "Steel",
   "Steel Sheet",
   "Steel,Coil",
   "Step Motor",
   "STS Sheet",
   "Thermostat",
   "Timer",
   "WM parts"];

   obu=[
    "C&M",
    "MWO",
    "RAC",
    "REF",
    "WM",
    "WP"
   ]
    
    producsts=["Sandeep Dixit",
    "Ajay Pathania",
    "Anshul Sharma",
    "Arun kumar Rai",
    "Ashish Bhatnagar",
    "Avnit Matharu",
    "Charchil Gupta",
    "Harish",
   "Himanshu Gupta",
    "Prateek garg",
    "Rajat Garg",
    "Rajinder Kumar",
    "Sachin Mathur",

    "Sumit Tandon",
    "Vinit Kumar",
    "Vinod Siwach",
    "Yogesh Shrivastav",
    "young chul kim"];

  containerdata=[];


  width1 = '100%';
  height1 = '310';
  type1 = "msspline";
  dataFormat1 = "json";
  dataSource4 = data4;
  datasdf:any
  portdata:any;
  productdata:any;

  constructor(private Http: GlobalServiceService, private router: Router,
    private activeRoute: ActivatedRoute) { }

 
  
  ngOnInit(): void {
    //
    debugger
    console.log(cases)
    this.datasdf=cases
    this.portdata=portjson
    this.producsts= this.datasdf.default.pic
    this.portarray=this.portdata.default.ports
    this.productdata=productsjson
    this.obu=this.productdata.default.products
    $(document).ready(function() {
      // //;
    

   let toggling = $("#toggling").val();
   document.getElementById("toggling").setAttribute('value','showed');


   $(".page-wrapper").addClass("toggled");
   $(".layoutset").removeClass("layoutsetPREM");

   console.log(toggling);

    });
    this.getratiochart();
    this.getcontainerdata();
    this.getL1L2chart();
    this.getRatioChart();
    this.todatechange('2022-03-30');

  }
  display = "none";



  chartObj
  getdata(value){
    // //;
    this.chartObj = value.chart;

  }
  chartObj2
  getdata2(value){
    // //;
    this.chartObj2 = value.chart;

  }
  chartObj4
  getdata4(value){
    // //;
    this.chartObj4 = value.chart;

  }
  chartObj3;
  getdata3(value){
    // //;
    this.chartObj3 = value.chart;

  }
  startDate:any='2022-03-01';
  EndDate:any='2022-03-30';
  productname:any=''
  pic:any=''
  port:any='';
  data:any;
  preloader:any;
  ratiocategories=[];
  weekdate
  fromweek
  toweek
  fromdatechange(e){
    // //;
    this.fromweek=e.target.value;
    this.weekdate=e.target.valueAsDate;
    this.startDate=  moment(this.weekdate).format("y-M-D")
    // this.startDate=e;

  }
  weekdate1
  todatechange(e)
  {
    // //;
    this.toweek=e.target.value;
    this.weekdate1=e.target.valueAsDate;
    this.EndDate=  moment(this.weekdate1).format("y-M-D")
    this.EndDate=e.target.valueAsDate ?this.EndDate : '2022-03-30' ;
    this.getratiochart();
    this.getcontainerdata();
    this.getL1L2chart();
    this.getRatioChart();
    $(document).ready(function() {
      setTimeout(() => {
        $(".layoutset").addClass("layoutsetPREMx");
      }, 1000);

    });

    // //;
  }

  changedropdown(e,type)
  {
    //  //;
    if(type=='port'){
      this.port=e;
    }
    if(type=='pic'){
      this.pic=e;
    }
    if(type=='productname'){
      this.productname=e;
    }
    // this.EndDate=e ?e : '2022-03-30' ;
    this.getratiochart();
    this.getcontainerdata();
    this.getL1L2chart();
    this.getRatioChart();
    $(document).ready(function() {
      setTimeout(() => {
        $(".layoutset").addClass("layoutsetPREMx");
      }, 1000);

    });

    // //;
  }
  totalgbnongb:any;
  totalgbnongbtotal:any;
  getratiochart(){
    // //;
    this.preloader=true;
    try {
    // //;
      this.Http.getPremiumRatioChart(this.startDate, this.EndDate,this.productname,this.pic, this.port).subscribe(arg => {
        //;
        this.preloader=true;

        this.data = arg.data.table
        this.ratiocategories=[];
        this.totalgbnongb=0
        this.data.forEach(element => {
         let label= element.weekNo
          this.ratiocategories.push({label})

        });
        // //;

        data3.dataset=[];
        let seriesname=[{'seriesname':'GB Non-Gb',
        data:[]
      },
      {'seriesname':'Premium',
      data:[]
    }];
    this.totalgbnongbtotal=0
        this.data.forEach(element => {
          //
          seriesname
          // if(ele)
         
          let value=element.gbnongb;
          this.totalgbnongb=this.totalgbnongb+value;
          let value1=element.premium;
          this.totalgbnongbtotal=this.totalgbnongbtotal+value1;

          let considredname=1;
          if(value==0){
            considredname=1;
          }else{
            considredname=value
          }
          let percentage= Math.round(value1/considredname*100)+'%';



          seriesname[0].data.push({'value':value,'tooltext':percentage})
          seriesname[1].data.push({'value':value1,'tooltext':percentage})


        });
        // //;
        data3.dataset=seriesname;
        data3.chart.caption='GB/Non-GB : '+this.totalgbnongb+' • Premium : '+this.totalgbnongbtotal
        setTimeout(() => {
          this.chartObj3.setChartData(data3)
        }, 500);
        console.log(seriesname);


// //


        data3.categories[0].category=this.ratiocategories;

       setTimeout(() => {
        this.preloader = false
       }, 1000);
      });
    } catch (error) {
      this.preloader = false
    }
  }

  confirmedtotal=0;
  plantotal=0;
  getcontainerdata(){

    try {
      //;

      this.Http.GetContainerBookingChart(this.startDate, this.EndDate,this.productname,this.pic,this.port).subscribe(arg => {

        //;
this.containerdata=arg.data.table;

let weeksforcontainerbooking=[];
// this.containerdata.forEach
let seriesname=[{'seriesname':'Planned',
        data:[]
      },
      {'seriesname':'Actual',
      data:[]
    }];


   
this.plantotal=0;
this.confirmedtotal=0;
this.containerdata.forEach(element => {
  element
  //;
  this.confirmedtotal=this.confirmedtotal+element.confFourty+element.confTwenty;
  this.plantotal=this.plantotal+element.week20Feet+element.week40feeet;


  let value=element.week40feeet + element.week20Feet;
  let value1=element.confFourty + element.confTwenty;
  let percnetage=Math.round(value1/value*100)+'% ';

  seriesname[0].data.push({'value':value, 'tooltext':percnetage})
  seriesname[1].data.push({'value':value1, 'tooltext':percnetage})


let lable={'label':element.weekno};
  weeksforcontainerbooking.push(lable);

});

console.log(this.chartObj);

// //;
data.chart.caption='Planned : <strong>'+this.plantotal+'<strong> • Actual : '+this.confirmedtotal+'';
data.dataset=seriesname;
setTimeout(() => {
  this.chartObj.setChartData(data)
}, 500);



// console.log(weeksforcontainerbooking);
data.categories[0].category=weeksforcontainerbooking;
console.log(data);


      })

    } catch (error) {

    }
  }
l1l2data=[];
l1l2total:any;
totalcounttotal:any;
  getL1L2chart(){
    try {
// //;
      this.Http.GetL1L2RatioChart(this.startDate, this.EndDate,this.productname,this.pic,this.port).subscribe(arg => {
        this.l1l2data= arg.data.table;
this.l1l2total=0;
this.totalcounttotal=0
        // //;
let lables=[];
// this.containerdata.forEach
let seriesname=[{'seriesname':'L1/L2 Count',
        data:[]
      },
      {'seriesname':'Total Count',
      data:[]
    }];
this.l1l2data.forEach(element => {
  // element
  // //;
  let value=element.l1Count;
  this.l1l2total=this.l1l2total+value;
  let value1=element.l2Count;
  this.totalcounttotal=this.totalcounttotal+value1;
  let considredname=1;
  if(value==0){
    considredname=1;
  }else{
    considredname=value
  }
  let percentage= Math.round(considredname/value1*100)+'%';
  seriesname[0].data.push({'value':value,'tooltext':percentage})
  seriesname[1].data.push({'value':value1,'tooltext':percentage})


  let lable={'label':element.weekNo};
  lables.push(lable);

});
data2.chart.caption='L1/L2 : '+this.l1l2total+' • Total Count : '+this.totalcounttotal;
data2.dataset=seriesname;
setTimeout(() => {
  this.chartObj2.setChartData(data2)
}, 500);
data2.categories[0].category=lables;

console.log(lables);

      })


    } catch (error) {
      this.preloader=false;

    }
  }

ratiodata=[];
total40feet:any;
total20feet:any;

visibilityclick(){
    //;
    let data= {'startdate': this.startDate, 
    'enddate': this.EndDate ,
    'productname': this.productname ,
    'portname': this.port,
    'plc':  this.pic,
  'fromweek':this.fromweek ? this.fromweek:'2022-W09',
'toweek':this.toweek ?this.toweek:'2022-W14',
'isparamrequest':1}

    this.router.navigate(['Visibilty'], { queryParams: data});
    console.log(data);
}

premiumratioclick(){
  //;
  let data= {'startdate': this.startDate, 
  'enddate': this.EndDate ,
  'productname': this.productname ,
  'portname': this.port,
  'plc':  this.pic,
'fromweek':this.fromweek ? this.fromweek:'2022-W09',
'toweek':this.toweek ?this.toweek:'2022-W14',
'isparamrequest':1}

  this.router.navigate(['premiumcontainer'], { queryParams: data});
  console.log(data);


}

l1l2click(){

  let data= {'startdate': this.startDate, 
  'enddate': this.EndDate ,
  'productname': this.productname ,
  'portname': this.port,
  'plc':  this.pic,
'fromweek':this.fromweek ? this.fromweek:'2022-W09',
'toweek':this.toweek ?this.toweek:'2022-W14',
'isparamrequest':1}

  this.router.navigate(['L1-L2RatioReport'], { queryParams: data});
  console.log(data);
}

twentyfourtyratioclick(){

  
  let data= {'startdate': this.startDate, 
  'enddate': this.EndDate ,
  'productname': this.productname ,
  'portname': this.port,
  'plc':  this.pic,
'fromweek':this.fromweek ? this.fromweek:'2022-W09',
'toweek':this.toweek ?this.toweek:'2022-W14',
'isparamrequest':1}

  this.router.navigate(['RatioReport'], { queryParams: data});
  console.log(data);
}



  getRatioChart(){
try {
  this.Http.getRatioChart(this.startDate, this.EndDate,this.productname,this.pic,this.port).subscribe(arg => {

  this.ratiodata=  arg.data.table


  let lables=[];
  // this.containerdata.forEach
  let seriesname=[{'seriesname':'40 Feet',
          data:[]
        },
        {'seriesname':'20 Feet',
        data:[]
      }];
      this.total20feet=0;
      this.total40feet=0
  this.ratiodata.forEach(element => {

    let value=element.fourtyCount;
    this.total20feet=this.total20feet+value;

  let value1=element.twentyCount;
  this.total40feet=this.total40feet+value1;
  let considredname=1;
  if(value==0){
    considredname=1;
  }else{
    considredname=value
  }
  let percentage= Math.round(value1/considredname*100)+'%';
  seriesname[0].data.push({'value':value,'tooltext':percentage})
  seriesname[1].data.push({'value':value1,'tooltext':percentage})

  let lable={'label':element.weekNo};
  lables.push(lable);


  });
  // //

  setTimeout(() => {
    this.chartObj4.setChartData(data)
  }, 500);

  data4.dataset=seriesname;
  data4.chart.caption='20 Feet: '+this.total20feet+' • 40 Feet:'+ this.total40feet
  setTimeout(() => {
    this.chartObj4.setChartData(data4)
  }, 500);
data4.categories[0].category=lables;

  })
} catch (error) {

}

  }

}






let data = {
  chart: {
    caption: "",
    subcaption: "",
    "placeValuesInside": "1",
    yaxisname: "",
    numvisibleplot: "8",
    labeldisplay: "auto",
    theme: "fusion",
    showValues: "1",
    "bgColor": "#eeeff0",

  },
  categories: [
    {
      category: [
        {
          label: "WK1"
        },
        {
          label: "WK2"
        },
        {
          label: "WK3"
        }
        ,
        {
          label: "WK4"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "2017",
      data: [
        {
          value: "121"
        },
        {
          value: "70"
        },
        {
          value: "67"
        },
        {
          value: "55"
        },
        {
          value: "42"
        },
        {
          value: "42"
        },
        {
          value: "41"
        },
        {
          value: "29"
        },
        {
          value: "28"
        },
        {
          value: "22"
        },
        {
          value: "21"
        },
        {
          value: "19"
        },
        {
          value: "19"
        },
        {
          value: "18"
        },
        {
          value: "17"
        },
        {
          value: "15"
        },
        {
          value: "13"
        },
        {
          value: "11"
        },
        {
          value: "11"
        },
        {
          value: "10"
        }
      ]
    },
    {
      seriesname: "2016",
      data: [
        {
          value: "123"
        },
        {
          value: "71"
        },
        {
          value: "59"
        },
        {
          value: "52"
        },
        {
          value: "34"
        },
        {
          value: "32"
        },
        {
          value: "29"
        },
        {
          value: "32"
        },
        {
          value: "25"
        },
        {
          value: "21"
        },
        {
          value: "24"
        },
        {
          value: "17"
        },
        {
          value: "20"
        },
        {
          value: "14"
        },
        {
          value: "13"
        },
        {
          value: "16"
        },
        {
          value: "14"
        },
        {
          value: "12"
        },
        {
          value: "11"
        },
        {
          value: "9"
        }
      ]
    },
  ]
};




const data1 = {
  chart: {
    caption: "",
    subcaption: "",
    yaxisname: "",
    "placeValuesInside": "1",
    showValues: "1",
    numvisibleplot: "8",
    labeldisplay: "auto",
    theme: "fusion",
    "bgColor": "#eeeff0",
    "palettecolors": "#dd2e72,#68bd64"
  },
  categories: [
    {
      category: [
        {
          label: "WK1"
        },
        {
          label: "WK2"
        },
        {
          label: "WK3"
        }
        ,
        {
          label: "WK4"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "2017",
      data: [
        {
          value: "121"
        },
        {
          value: "70"
        },
        {
          value: "67"
        },
        {
          value: "55"
        },
        {
          value: "42"
        },
        {
          value: "42"
        },
        {
          value: "41"
        },
        {
          value: "29"
        },
        {
          value: "28"
        },
        {
          value: "22"
        },
        {
          value: "21"
        },
        {
          value: "19"
        },
        {
          value: "19"
        },
        {
          value: "18"
        },
        {
          value: "17"
        },
        {
          value: "15"
        },
        {
          value: "13"
        },
        {
          value: "11"
        },
        {
          value: "11"
        },
        {
          value: "10"
        }
      ]
    },
    {
      seriesname: "2016",
      data: [
        {
          value: "123"
        },
        {
          value: "71"
        },
        {
          value: "59"
        },
        {
          value: "52"
        },
        {
          value: "34"
        },
        {
          value: "32"
        },
        {
          value: "29"
        },
        {
          value: "32"
        },
        {
          value: "25"
        },
        {
          value: "21"
        },
        {
          value: "24"
        },
        {
          value: "17"
        },
        {
          value: "20"
        },
        {
          value: "14"
        },
        {
          value: "13"
        },
        {
          value: "16"
        },
        {
          value: "14"
        },
        {
          value: "12"
        },
        {
          value: "11"
        },
        {
          value: "9"
        }
      ]
    }
  ]
};



let data2 = {
  chart: {
    caption: "",
    subcaption: "",
    yaxisname: "",
    numvisibleplot: "8",
    valuePosition:'inside',
    "valueFontColor": "#000",
    "placeValuesInside": "1",
    labeldisplay: "auto",
    showValues: "1",
    theme: "fusion",
    "bgColor": "#eeeff0",
    "palettecolors": "#f9bb4a,#e75a69"
  },
  categories: [
    {
      category: [
        {
          label: "WK1"
        },
        {
          label: "WK2"
        },
        {
          label: "WK3"
        }
        ,
        {
          label: "WK4"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "2017",
      data: [
        {
          value: "121"
        },
        {
          value: "70"
        },
        {
          value: "67"
        },
        {
          value: "55"
        },
        {
          value: "42"
        },
        {
          value: "42"
        },
        {
          value: "41"
        },
        {
          value: "29"
        },
        {
          value: "28"
        },
        {
          value: "22"
        },
        {
          value: "21"
        },
        {
          value: "19"
        },
        {
          value: "19"
        },
        {
          value: "18"
        },
        {
          value: "17"
        },
        {
          value: "15"
        },
        {
          value: "13"
        },
        {
          value: "11"
        },
        {
          value: "11"
        },
        {
          value: "10"
        }
      ]
    },
    {
      seriesname: "2016",
      data: [
        {
          value: "123"
        },
        {
          value: "71"
        },
        {
          value: "59"
        },
        {
          value: "52"
        },
        {
          value: "34"
        },
        {
          value: "32"
        },
        {
          value: "29"
        },
        {
          value: "32"
        },
        {
          value: "25"
        },
        {
          value: "21"
        },
        {
          value: "24"
        },
        {
          value: "17"
        },
        {
          value: "20"
        },
        {
          value: "14"
        },
        {
          value: "13"
        },
        {
          value: "16"
        },
        {
          value: "14"
        },
        {
          value: "12"
        },
        {
          value: "11"
        },
        {
          value: "9"
        }
      ]
    }
  ]
};


let data3 = {
  chart: {
    caption: "",
    subcaption: "",

    yaxisname: "",
    valuePosition:'0',
    numvisibleplot: "8",
    "placeValuesInside": "1",
    labeldisplay: "auto",
    showValues: "1",
    theme: "fusion",
    "bgColor": "#eeeff0",
    "palettecolors": "#f9bb4a,#e75a69"
  },
  categories: [
    {
      category: [
        {
          label: "WK1"
        },
        {
          label: "WK2"
        },
        {
          label: "WK3"
        }
        ,
        {
          label: "WK4"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "2017",
      data: [
        {
          value: "121"
        },
        {
          value: "70"
        },
        {
          value: "67"
        },
        {
          value: "55"
        },
        {
          value: "42"
        },
        {
          value: "42"
        },
        {
          value: "41"
        },
        {
          value: "29"
        },
        {
          value: "28"
        },
        {
          value: "22"
        },
        {
          value: "21"
        },
        {
          value: "19"
        },
        {
          value: "19"
        },
        {
          value: "18"
        },
        {
          value: "17"
        },
        {
          value: "15"
        },
        {
          value: "13"
        },
        {
          value: "11"
        },
        {
          value: "11"
        },
        {
          value: "10"
        }
      ]
    },
    {
      seriesname: "2016",
      data: [
        {
          value: "123"
        },
        {
          value: "71"
        },
        {
          value: "59"
        },
        {
          value: "52"
        },
        {
          value: "34"
        },
        {
          value: "32"
        },
        {
          value: "29"
        },
        {
          value: "32"
        },
        {
          value: "25"
        },
        {
          value: "21"
        },
        {
          value: "24"
        },
        {
          value: "17"
        },
        {
          value: "20"
        },
        {
          value: "14"
        },
        {
          value: "13"
        },
        {
          value: "16"
        },
        {
          value: "14"
        },
        {
          value: "12"
        },
        {
          value: "11"
        },
        {
          value: "9"
        }
      ]
    }
  ]
};
















let data4 = {
  chart: {
    caption: "",
    yaxisname: "",

    "pYAxisMinValue": "0",
    'yAxisMinValue':-1,
    "sYAxisMinValue": "0",


    setAdaptiveYMin:0,
    subcaption: "",
    numdivlines: "3",
    showvalues: "0",
    fill: "#fff",
    "showToolTip": "0",
    valuePosition:'inside',
    "valueFontColor": "#000000",
    showValues: "1",
    legenditemfontsize: "15",
    legenditemfontbold: "1",
    "legendIconBorderThickness": "3",
    plottooltext: "<b>$dataValue</b> Tickets $seriesname on $label",
    theme: "fusion",
    "bgColor": "#eeeff0",
    "legendItemFontColor": "#666666",
   
    
    "palettecolors": "#68bd64,#f9bb4a"
  },
  categories: [
    {
      category: [
        {
          label: "Jan 1"
        },
        {
          label: "Jan 2"
        },
        {
          label: "Jan 3"
        },
        {
          label: "Jan 4"
        },
        {
          label: "Jan 5"
        },
        {
          label: "Jan 6"
        },
        {
          label: "Jan 7"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "20F",
      data: [
        {
          value: "55"
        },
        {
          value: "45"
        },
        {
          value: "52"
        },
        {
          value: "29"
        },
        {
          value: "48"
        },
        {
          value: "28"
        },
        {
          value: "32"
        }
      ]
    },
    {
      seriesname: "40F",
      data: [
        {
          value: "50"
        },
        {
          value: "30"
        },
        {
          value: "49"
        },
        {
          value: "22"
        },
        {
          value: "43"
        },
        {
          value: "14"
        },
        {
          value: "31"
        }
      ]
    }
  ]
  
};





