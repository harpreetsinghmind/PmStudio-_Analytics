import {  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExcelExportProperties,SaveEventArgs, GridComponent } from '@syncfusion/ej2-angular-grids';
import { AnimationModel, FontModel } from '@syncfusion/ej2-angular-progressbar';
import { dataBinding, GroupModel, TimelineMonthService } from '@syncfusion/ej2-angular-schedule';
import { ToasterService } from '../toaster/toaster.service';
import { GlobalServiceService } from '../global-service.service';
import { AuthServiceService } from '../auth-service.service';
import { CalendarComponent } from "@syncfusion/ej2-angular-calendars";
import * as CryptoJS from 'crypto-js'

import { min } from 'moment';
import { DatePipe } from '@angular/common'
import { threadId } from 'worker_threads';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Tooltip } from '@syncfusion/ej2-popups';
import { environment } from 'src/environments/environment';

import { debug } from 'console';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

type AOA = any[][];

@Component({
  selector: 'app-power-bireport',
  templateUrl: './power-bireport.component.html',
  styleUrls: ['./power-bireport.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PowerBIReportComponent implements OnInit {
  public selectedDate: Date = new Date(2021, 3, 4);

  @ViewChild('overviewgrid')
  public grids: GridComponent;
  @ViewChild('overviewgridInsightmom')
  public gridsInsight: GridComponent;
  @ViewChild('overviewgridInsightroad')
  public gridsInsightRoad: GridComponent;
  @ViewChild('overviewgridInsightover')
  public gridsInsightOver: GridComponent;
  @ViewChild('overviewgridcheck')
  public gridcheck: GridComponent;
  @ViewChild('overviewgridset')
  public gridset: GridComponent;
  @ViewChild("calendarObj")
  public calendarobj: CalendarComponent;
  public pageSettings = { pageCount: 3 };
  @ViewChild('getid')
  public gridsFor: GridComponent;
  public workDays: number[] = [0, 1, 2, 3, 4, 5];
  public group: GroupModel = {
    resources: ['Projects', 'Categories']
  };
  public projectDataSource: Record<string, any>[] = [
    { text: 'PROJECT 1', id: 1, color: '#cb6bb2' },
    { text: 'PROJECT 2', id: 2, color: '#56ca85' },
    { text: 'PROJECT 3', id: 3, color: '#df5286' }
  ];
  public categoryDataSource: Record<string, any>[] = [
    { text: 'Nancy', id: 1, groupId: 1, color: '#df5286' },
    { text: 'Steven', id: 2, groupId: 1, color: '#7fa900' },
    { text: 'Robert', id: 3, groupId: 2, color: '#ea7a57' },
    { text: 'Smith', id: 4, groupId: 2, color: '#5978ee' },
    { text: 'Michael', id: 5, groupId: 3, color: '#df5286' },
    { text: 'Root', id: 6, groupId: 3, color: '#00bdae' }
  ];

  public TenureWiseEmployeeData 
  categories
  dataVales
  onPeopleClick(){
    this.categories = []
    this.dataVales = []
    this.tentureDetails.categories[0].category.forEach((element,index) => {
      this.categories.push({"label": this.tentureDetails.categories[0].category[index].Label})
      this.dataVales.push(
      {min:this.tentureDetails.dataset[1].data[index].value,max:this.tentureDetails.dataset[2].data[index].value,
      q1:this.tentureDetails.dataset[1].data[index].value,q3:this.tentureDetails.dataset[2].data[index].value,
      median:this.tentureDetails.dataset[0].data[index].value,mean:this.tentureDetails.dataset[0].data[index].value,
      tooltext: "Above Average: "+this.tentureDetails.dataset[2].data[index].value+" {Br} Average: "+this.tentureDetails.dataset[0].data[index].value+" {Br} Below Average: "+this.tentureDetails.dataset[1].data[index].value
                            })
    });
   this.TenureWiseEmployeeData =  {
      "chart": {
          "theme": "fusion",
          "caption": "Avg. Tenure Wise Employee Details",
          "subcaption": "By Employees",
          "xAxisName": "Months",
          "captionAlignment":"left",
          "YAxisName": "Employees &nbsp; Count",
          "numberPrefix": " ",
          "showmean": "1",
          "showValue":1,
          "legendBorderAlpha": "0",
          "drawmeanconnector": "1",
          "legendShadow": "0",
          "legendPosition": "right",
          "outlierIconColor": "#fff00f",
          "showalloutliers": "1",
          "showToolTip": "1",
          "outliericonsides": "20",
          "outliericonalpha": "40",
          "outliericonshape": "triangle",
          "outliericonradius": "4",
          "showValues": "1",
       
      },
    
      "categories": [
          {
              "category":  this.categories
          }
      ],
      "dataset": [
          {
              "seriesname": "Employees",
              "lowerBoxColor": "#0075c2",
              "upperBoxColor": "#1aaf5d",
              "data": this.dataVales
          }
          
      ]
  }

  }
  public allowMultiple = true;
  display = "none";
  openModal() {
    this.display = "block";
  }
  displayFilter = "none";
  openModalFilter() {
    this.displayFilter = "block";
  }


  timeSheetValue:any
  checkInValue:any
  filterValue()
  {
this.pbiActionableCheckInCheckOutList()
  }
  timeSheetCondition:any
  checkInCondition:any
  checkInChangeValue(e)
{
  this.checkInCondition=e.target.value

}
timeSheetChangeValue(e)
{
  this.timeSheetCondition=e.target.value

}

  onCloseHandled() {
    this.display = "none";
    this.displayFilter = "none";
  }
  newdata = [
    {
      Id: 61,
      Subject: 'Decoding',
      StartTime: new Date(2021, 3, 4, 9, 30),
      EndTime: new Date(2021, 3, 4, 10, 30),
      IsAllDay: false,
      ProjectId: 2,
      TaskId: 2
    }, {
      Id: 62,
      Subject: 'Bug Automation',
      StartTime: new Date(2021, 3, 4, 16, 0),
      EndTime: new Date(2021, 3, 4, 20, 0),
      IsAllDay: false,
      ProjectId: 2,
      TaskId: 1
    }, {
      Id: 63,
      Subject: 'Functionality testing',
      StartTime: new Date(2021, 3, 4, 9),
      EndTime: new Date(2021, 3, 4, 10, 30),
      IsAllDay: false,
      ProjectId: 1,
      TaskId: 1
    }, {
      Id: 64,
      Subject: 'Resolution-based testing',
      StartTime: new Date(2021, 3, 4, 12),
      EndTime: new Date(2021, 3, 4, 15, 0),
      IsAllDay: false,
      ProjectId: 2,
      TaskId: 4
    }, {
      Id: 65,
      Subject: 'Test report validation',
      StartTime: new Date(2021, 3, 4, 15),
      EndTime: new Date(2021, 3, 4, 18),
      IsAllDay: false,
      ProjectId: 1,
      TaskId: 1
    }, {
      Id: 66,
      Subject: 'Test case correction',
      StartTime: new Date(2021, 3, 4, 14),
      EndTime: new Date(2021, 3, 4, 16),
      IsAllDay: false,
      ProjectId: 3,
      TaskId: 6
    }, {
      Id: 67,
      Subject: 'Bug fixing',
      StartTime: new Date(2021, 3, 4, 14, 30),
      EndTime: new Date(2021, 3, 4, 18, 30),
      IsAllDay: false,
      ProjectId: 3,
      TaskId: 5
    }, {
      Id: 68,
      Subject: 'Run test cases',
      StartTime: new Date(2021, 3, 4, 17, 30),
      EndTime: new Date(2021, 3, 4, 19, 30),
      IsAllDay: false,
      ProjectId: 2,
      TaskId: 4
    }, {
      Id: 70,
      Subject: 'Bug Automation',
      StartTime: new Date(2021, 3, 4, 16, 0),
      EndTime: new Date(2021, 3, 4, 20, 0),
      IsAllDay: false,
      ProjectId: 2,
      TaskId: 3
    }
  ];


  ExpenseReportList: any = [];
  UsersList: any = [];
  customerList: any = [];
  reportList: any = [];
  public labelStyle1: FontModel = { textAlignment: 'Center', text: '40%', color: '#ffffff' };
  public animation: AnimationModel = { enable: true, duration: 2000, delay: 0 };
  public TotalSum = 0;
  public value: any;
  Decimalformat: any;
  userId: any;

  week1: any = [1, 2, 3, 4, 5];
  week2
  week3
  week4
  week5

  Planwk1
  Planwk2
  Planwk3
  Planwk4
  Planwk5

  actwk1
  actwk2
  actwk3
  actwk4
  actwk5
  

  decimalFormat(datas) {
    return this.authServiceService.DecimalFormat(datas);
  }

  datades = {
    chart: {
      "numberPrefix": "",
      "bgColor": "#ffffff",
      "startingAngle": "100",
      "showLegend": "1",
      "defaultCenterLabel": "Total revenue: $64.08K",
      "centerLabel": "$label: $value",
      "centerLabelBold": "1",
      "showTooltip": "0",
      "decimals": "0",
      "theme": "fusion"
    },
    "data": [{
        "label": "Food",
        "value": "28504"
      },
      {
        "label": "Apparels",
        "value": "14633"
      },
      {
        "label": "Electronics",
        "value": "10507"
      },
      {
        "label": "Household",
        "value": "4910"
      }
    ]
  };


  dataProjectValue = {
    chart: {
      'paletteColors' :'7cb5ec, ed8f1d',
      numberprefix: "$",
      drawcrossline: "1",
      theme: "fusion",
      showvalues: "0"
    },
    categories: [
      {
        category: [
          {
            label: "Oliver"
          },
          {
            label: "Andy"
          },
          {
            label: "Peter"
          },
          {
            label: "Natasha"
          },
          {
            label: "Robert"
          },
          {
            label: "Bruce"
          },
          {
            label: "Wanda"
          }
        ]
      }
    ],
    dataset: [
      {
        seriesname: "Target",
        data: [
          {
            value: "250000"
          },
          {
            value: "200000"
          },
          {
            value: "300000"
          },
          {
            value: "200000"
          },
          {
            value: "270000"
          },
          {
            value: "350000"
          },
          {
            value: "200000"
          }
        ]
      },
      {
        seriesname: "Achieved",
        data: [
          {
            value: "260000"
          },
          {
            value: "180000"
          },
          {
            value: "290000"
          },
          {
            value: "195000"
          },
          {
            value: "300000"
          },
          {
            value: "380000"
          },
          {
            value: "210000"
          }
        ]
      }
    ]
  };


   data111 = {
    chart: {

      'paletteColors' :'7cb5ec, ed8f1d',
      numvisibleplot: "12",
      labeldisplay: "auto",
      theme: "fusion"
    },
    categories: [
      {
        category: [
          {
            label: "USA"
          },
          {
            label: "GB"
          },
          {
            label: "China"
          },
          {
            label: "Russia"
          },
          {
            label: "Germany"
          },
          {
            label: "France"
          },
          {
            label: "Japan"
          },
          {
            label: "Australia"
          },
          {
            label: "Italy"
          },
          {
            label: "Canada"
          },
          {
            label: "South Korea"
          },
          {
            label: "Netherlands"
          },
          {
            label: "Brazil"
          },
          {
            label: "NZ"
          },
          {
            label: "Spain"
          },
          {
            label: "Hungary"
          },
          {
            label: "Kenya"
          },
          {
            label: "Jamaica"
          },
          {
            label: "Cuba"
          },
          {
            label: "Croatia"
          }
        ]
      }
    ],
    dataset: [
      {
        seriesname: "Deployed",
        data: [
          {
            value: "80"
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
        seriesname: "On bench",
        data: [
          {
            value: "80"
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



  dataprogresscost = {
    "chart": {
      "caption": "Progress & Cost %",
      'paletteColors' :'7cb5ec',
      "showHoverEffect": "1",
      "theme": "fusion"
  },
  "data": [{
      "label": "May",
      "value": "2000"
  }, {
      "label": "Apr",
      "value": "1800"
  }, {
      "label": "March",
      "value": "1600"
  }, {
      "label": "Feb",
      "value": "1400"
  }, {
      "label": "Jan",
      "value": "1200"
  }, {
      "label": "Dec",
      "value": "1000"
  }]
  };



  datades23 = {
    "chart": {
      "theme": "fusion",
      "subCaption": "Last month",
      "xAxisName": "Reported Cause",
      "pYAxisName": "No. of Occurrence",
      "sYAxisname": "Cumulative Percentage",
      "showValues": "0",
      "showXAxisLine": "1",
      'paletteColors' :'7bb7ed',
      "showLineValues": "1"
    },
    "data": [{
        "label": "May",
        "value": "5680"
      },
      {
        "label": "Apr",
        "value": "1036"
      },
      {
        "label": "Mar",
        "value": "950"
      },
      {
        "label": "Feb",
        "value": "500"
      },
      {
        "label": "Jan",
        "value": "140"
      },
      {
        "label": "Dec",
        "value": "68"
      }
    ]
  };


   data12 = {
    chart: {
      caption: "",
      subcaption: "",
      showpercentvalues: "1",
      defaultcenterlabel: "",
      aligncaptionwithcanvas: "0",
      captionpadding: "0",
      decimals: "1",
      'paletteColors' :'12239e, e66c37, 118dff',
      plottooltext:
        "<b>$percentValue</b> of our Android users are on <b>$label</b>",
      centerlabel: "# Users: $value",
      theme: "fusion"
    },
    data: [
      {
        label: "YTD",
        value: "1000"
      },
      {
        label: "QTD",
        value: "5300"
      },
      {
        label: "MTD",
        value: "10500"
      }
    ]
  };


  data13 = {
    chart: {
      caption: "",
      subcaption: "",
      showpercentvalues: "1",
      defaultcenterlabel: "",
      aligncaptionwithcanvas: "0",
      captionpadding: "0",
      decimals: "1",
      'paletteColors' :'12239e, e66c37, 118dff',
      plottooltext:
        "<b>$percentValue</b> of our Android users are on <b>$label</b>",
      centerlabel: "# Users: $value",
      theme: "fusion"
    },
    data: [
      {
        label: "G1",
        value: "1000"
      },
      {
        label: "G2",
        value: "5300"
      },
      {
        label: "G3",
        value: "10500"
      }
    ]
  };



  datatre = {
    data: [
      {
        label: "Top Selling Brands",
        value: "5800",
        data: [
          {
            label: "Samsung",
            value: "2217",
            data: [
              {
                label: "Galaxy Note 4",
                value: "519",
                svalue: "1.09"
              },
              {
                label: "Galaxy S6 Edge",
                value: "448",
                svalue: "1.48"
              },
              {
                label: "Galaxy S6",
                value: "416",
                svalue: "1.13"
              },
              {
                label: "Galaxy J1",
                value: "304",
                svalue: "1.18"
              },
              {
                label: "Galaxy J7",
                value: "159",
                svalue: "1.36"
              },
              {
                label: "Galaxy Note5",
                value: "191",
                svalue: "1.48"
              },
              {
                label: "galaxy A8",
                value: "180",
                svalue: "1.19"
              }
            ]
          },
          {
            label: "Apple",
            value: "1283",
            data: [
              {
                label: "iPhone 6",
                value: "340",
                svalue: "1.08"
              },
              {
                label: "iPhone 6s plus",
                value: "296",
                svalue: "1.14"
              },
              {
                label: "iPhone 6s",
                value: "227",
                svalue: "1.12"
              },
              {
                label: "iPhone 5s",
                value: "174",
                svalue: "1.18"
              },
              {
                label: "iPhone 5c",
                value: "96",
                svalue: "1.18"
              },
              {
                label: "iPhone 4s",
                value: "150",
                svalue: "1.11"
              }
            ]
          },
          {
            label: "Nokia",
            value: "759",
            data: [
              {
                label: "Lumia 630",
                value: "101",
                svalue: "1.13"
              },
              {
                label: "lumia 810",
                value: "98",
                svalue: "0.85"
              },
              {
                label: "lumia 930",
                value: "105",
                svalue: "0.56"
              },
              {
                label: "lumia 950 XL dual sim",
                value: "85",
                svalue: "0.75"
              },
              {
                label: "lumia 735",
                value: "64",
                svalue: "0.78"
              },
              {
                label: "lumia 830",
                value: "66",
                svalue: "0.83"
              },
              {
                label: "lumia 1320 LTE",
                value: "133",
                svalue: "0.29"
              },
              {
                label: "lumia 1320",
                value: "107",
                svalue: "0.29"
              }
            ]
          },
          {
            label: "LG",
            value: "441",
            data: [
              {
                label: "G4",
                value: "189",
                svalue: "0.51"
              },
              {
                label: "L70 Dual",
                value: "122",
                svalue: "0.52"
              },
              {
                label: "G FLEX 2",
                value: "77",
                svalue: "0.64"
              },
              {
                label: "G3 S",
                value: "53",
                svalue: "0.64"
              }
            ]
          },
          {
            label: "Huawei",
            value: "411",
            data: [
              {
                label: "Y3 U03",
                value: "136",
                svalue: "1.40"
              },
              {
                label: "G8",
                value: "78",
                svalue: "0.87"
              },
              {
                label: "Y520",
                value: "67",
                svalue: "1.35"
              },
              {
                label: "ascend p7",
                value: "48",
                svalue: "0.97"
              },
              {
                label: "G7 plus",
                value: "27",
                svalue: "0.87"
              },
              {
                label: "P8",
                value: "55",
                svalue: "1.23"
              }
            ]
          },
          {
            label: "Lenovo",
            value: "489",
            data: [
              {
                label: "A5000",
                value: "47",
                svalue: "0.69"
              },
              {
                label: "vibe P780",
                value: "37",
                svalue: "0.69"
              },
              {
                label: "K4 Note",
                value: "156",
                svalue: "0.69"
              },
              {
                label: "A7010",
                value: "89",
                svalue: "0.71"
              },
              {
                label: "Vibe P1 Mini",
                value: "110",
                svalue: "0.67"
              },
              {
                label: "Vibe x3 Lite",
                value: "50",
                svalue: "0.77"
              }
            ]
          },
          {
            label: "Sony",
            value: "200",
            data: [
              {
                label: "Xperia Z3",
                value: "38",
                svalue: "1.5"
              },
              {
                label: "Xperia Z3+",
                value: "25",
                svalue: "1.38"
              },
              {
                label: "Xperia Z5",
                value: "67",
                svalue: "0.64"
              },
              {
                label: "Xperia X3 Dual",
                value: "46",
                svalue: "0.73"
              },
              {
                label: "Xperia E4",
                value: "24",
                svalue: "0.77"
              }
            ]
          }
        ]
      }
    ],
    colorrange: {
      mapbypercent: "0",
      gradient: "1",
      minvalue: "0",
      code: "#62B58F",
      startlabel: "Ideal",
      endlabel: "Threshold",
      color: [
        {
          code: "#FFC533",
          maxvalue: "0.8"
        },
        {
          code: "#F2726F",
          maxvalue: "1.6",
          label: "Threshold"
        }
      ]
    },
    chart: {
      algorithm: "squarified",
      caption: "Mobile Sales Analysis for Last Quarter",
      subcaption: "Brand Smart<br>Based on SAR values",
      theme: "fusion",
      legendcaption: "Specific Absorption Rate (SAR) in W/kg",
      plottooltext:
        "<b>$label</b><br>SAR (Body): <b>$sValue W/kg</b><br>Units Sold: <b>$dataValue</b>"
    }
  };




  dataProject = {
    chart: {
      caption: "",
      xaxisname: "Project Name",
      yaxisname: "Schedule",
      aligncaptionwithcanvas: "0",
      plottooltext: "<b>$dataValue</b> leads received",
      theme: "fusion",
      'paletteColors' :'118dff'
    },
    data: [



      {
        label: "",
        value: "7"
      },
      {
        label: "",
        value: "7"
      },
      {
        label: "",
        value: "7"
      },
      {
        label: "",
        value: "7"
      },
      {
        label: "",
        value: "7"
      },
      {
        label: "",
        value: "7"
      }
    ]
  };



  dataExpense = {
    chart: {
      caption: "",
      xaxisname: "",
      yaxisname: "",
      aligncaptionwithcanvas: "0",
      plottooltext: "<b>$dataValue</b> leads received",
      theme: "fusion",
      'paletteColors' :'7bb7ed'
    },
    data: [

      {
        label: "Services",
        value: "8"
      },
      {
        label: "Sales",
        value: "5"
      },
      {
        label: "Accounts",
        value: "4"
      },
      {
        label: "Atlassian",
        value: "3"
      },
      {
        label: "Marketing",
        value: "2"
      }
    ]
  };



  dataBudget = {
    chart: {
      caption: "",
      subcaption: "",
      xaxisname: "BudgetPercent",
      yaxisname: "Project Name",
      numberprefix: "$",
      theme: "fusion",
      'paletteColors' :'118dff',
      plottooltext: "$name : Share of total conversion: $zvalue%"
    },
    categories: [
      {
        verticallinealpha: "20",
        category: [
          {
            label: "0",
            x: "0"
          },
          {
            label: "1500",
            x: "1500",
            showverticalline: "1"
          },
          {
            label: "3000",
            x: "3000",
            showverticalline: "1"
          },
          {
            label: "4500",
            x: "4500",
            showverticalline: "1"
          },
          {
            label: "6000",
            x: "6000",
            showverticalline: "1"
          }
        ]
      }
    ],
    dataset: [
      {
        data: [
          {
            x: "5540",
            y: "16.09",
            z: "30.63",
            name: "Campaign 1"
          },
          {
            x: "4406",
            y: "12.74",
            z: "24.36",
            name: "Campaign 2"
          },
          {
            x: "1079",
            y: "15.79",
            z: "5.97",
            name: "Campaign 3"
          },
          {
            x: "1700",
            y: "8.27",
            z: "9.4",
            name: "Campaign 4"
          },
          {
            x: "853",
            y: "15.89",
            z: "4.71",
            name: "Campaign 5"
          },
          {
            x: "1202",
            y: "10.74",
            z: "6.65",
            name: "Campaign 6"
          },
          {
            x: "2018",
            y: "6.14",
            z: "11.16",
            name: "Campaign 7"
          },
          {
            x: "413",
            y: "19.83",
            z: "2.28",
            name: "Campaign 8"
          },
          {
            x: "586",
            y: "13.96",
            z: "3.24",
            name: "Campaign 9"
          },
          {
            x: "184",
            y: "15.82",
            z: "1.02",
            name: "Campaign 10"
          },
          {
            x: "311",
            y: "5.83",
            z: "1.72",
            name: "Campaign 11"
          },
          {
            x: "35",
            y: "10.76",
            z: "0.19",
            name: "Campaign 12"
          },
          {
            x: "55",
            y: "2.73",
            z: "0.3",
            name: "Campaign 13"
          },
          {
            x: "6",
            y: "21.22",
            z: "0.03",
            name: "Campaign 14"
          }
        ]
      }
    ]
  };


  dataRoadblock = {
    chart: {
      caption: "",
      subcaption: "",
      showpercentvalues: "1",
      defaultcenterlabel: "",
      aligncaptionwithcanvas: "0",
      captionpadding: "0",
      decimals: "1",
      'paletteColors' :'12239e, 118dff',
      plottooltext:
        "<b>$percentValue</b> of our Android users are on <b>$label</b>",
      centerlabel: "# Users: $value",
      theme: "fusion"
    },
    data: [
      {
        label: "Closed",
        value: "1000"
      },
      {
        label: "Open",
        value: "5300"
      }
    ]
  };


  dataMeeting = {
    chart: {
      caption: "",
      subcaption: "",
      showpercentvalues: "1",
      defaultcenterlabel: "",
      aligncaptionwithcanvas: "0",
      captionpadding: "0",
      decimals: "1",
      'paletteColors' :'12239e, 118dff, e66c37',
      plottooltext:
        "<b>$percentValue</b> of our Android users are on <b>$label</b>",
      centerlabel: "# Users: $value",
      theme: "fusion"
    },
    data: [
      {
        label: "Closed",
        value: "1000"
      },
      {
        label: "Open",
        value: "5300"
      },
      {
        label: "Actionable",
        value: "5300"
      }
    ]
  };


  dataResource = {
    chart: {
      caption: "",
      subcaption: "",
      showpercentvalues: "1",
      defaultcenterlabel: "",
      aligncaptionwithcanvas: "0",
      captionpadding: "0",
      decimals: "1",
      'paletteColors' :'118dff, 12239e, e66c37, 6b007b, e044a7, 744ec2, d9b300',
      plottooltext:
        "<b>$percentValue</b> of our Android users are on <b>$label</b>",
      centerlabel: "# Users: $value",
      theme: "fusion"
    },
    data: [
      {
        label: "ON Bench",
        value: "1000"
      },
      {
        label: "IDFC Tablaeu SSIS",
        value: "5300"
      },
      {
        label: "Reliance Tableau",
        value: "5300"
      },
      {
        label: "Gurukul 4",
        value: "1000"
      },
      {
        label: "Support Activities",
        value: "5300"
      },
      {
        label: "IDFC Data Engine...",
        value: "5300"
      },
      {
        label: "Sterlite Technolo…",
        value: "5300"
      }
    ]
  };



  dataExcat2 = {
    colorrange: {
      gradient: "1",
      minvalue: "0",
      startlabel: "Poor",
      palettecolors: "#002d57, #59748f",
      'paletteColors' :'002d57, 59748f',
      endlabel: "Outstanding"
    },
    dataset: [
      {
        data: [
          {
            rowid: "JA",
            columnid: "EN",
            value: "3.7"
          },
          {
            rowid: "JA",
            columnid: "PY",
            value: "4.3"
          },
          {
            rowid: "JA",
            columnid: "MT",
            value: "4.0"
          },
          {
            rowid: "JA",
            columnid: "HS",
            value: "3.3"
          },
          {
            rowid: "JA",
            columnid: "EC",
            value: "3.1"
          },
          {
            rowid: "EM",
            columnid: "EN",
            value: "3.6"
          },
          {
            rowid: "EM",
            columnid: "PY",
            value: "4.0"
          },
          {
            rowid: "EM",
            columnid: "MT",
            value: "3.2"
          },
          {
            rowid: "EM",
            columnid: "HS",
            value: "2.6"
          },
          {
            rowid: "EM",
            columnid: "EC",
            value: "3.2"
          },
          {
            rowid: "JY",
            columnid: "EN",
            value: "3.8"
          },
          {
            rowid: "JY",
            columnid: "PY",
            value: "4.1"
          },
          {
            rowid: "JY",
            columnid: "MT",
            value: "3.9"
          },
          {
            rowid: "JY",
            columnid: "HS",
            value: "2.6"
          },
          {
            rowid: "JY",
            columnid: "EC",
            value: "2"
          },
          {
            rowid: "WL",
            columnid: "EN",
            value: "3.4"
          },
          {
            rowid: "WL",
            columnid: "PY",
            value: "3.2"
          },
          {
            rowid: "WL",
            columnid: "MT",
            value: "4"
          },
          {
            rowid: "WL",
            columnid: "HS",
            value: "2.5"
          },
          {
            rowid: "WL",
            columnid: "EC",
            value: "3.1"
          }
        ]
      }
    ],
    columns: {
      column: [
        {
          id: "EN",
          label: "English"
        },
        {
          id: "MT",
          label: "Maths"
        },
        {
          id: "PY",
          label: "Physics"
        },
        {
          id: "HS",
          label: "History"
        },
        {
          id: "EC",
          label: "Economics"
        }
      ]
    },
    rows: {
      row: [
        {
          id: "JA",
          label: ""
        },
        {
          id: "EM",
          label: ""
        },
        {
          id: "JY",
          label: ""
        },
        {
          id: "WL",
          label: ""
        }
      ]
    },
    chart: {
      theme: "fusion",
      caption: "",
      subcaption: "",
      xaxisname: "",
      yaxisname: "",
      showvalues: "1",
      valuefontcolor: "#ffffff",
      plottooltext: "$rowlabel's $columnlabel grading score: <b>$value</b>"
    }
  };


  dataExcat = {
    chart: {
      theme: "fusion",
      caption: "",
      subcaption: "",
      showvalues: "1",

      plottooltext:
        "<div><b>$rowLabel</b><br/>$columnLabel Rating: <b>$datavalue</b>/10</div>"
    },
    rows: {
      row: [
        {
          id: "",
          label: ""
        },
        {
          id: "",
          label: ""
        },
        {
          id: "",
          label: ""
        },
        {
          id: "",
          label: ""
        }
      ]
    },
    columns: {
      column: [
        {
          id: "processor",
          label: "Processor"
        },
        {
          id: "screen",
          label: "Screen Size"
        },
        {
          id: "price",
          label: "Price"
        },
        {
          id: "backup",
          label: "Battery Capacity"
        },
        {
          id: "cam",
          label: "Camera"
        }
      ]
    },
    dataset: [
      {
        data: [
          {
            rowid: "SGS9",
            columnid: "processor",
            value: "8.7",
            tllabel: "Octa Core 2.8GHz"
          },
          {
            rowid: "SGS9",
            columnid: "screen",
            value: "8.5",
            bllabel: "5.8 inch"
          },
          {
            rowid: "SGS9",
            columnid: "price",
            value: "9.3",
            tllabel: "$720"
          },
          {
            rowid: "SGS9",
            columnid: "backup",
            value: "9.7",
            brlabel: "3000 MAH"
          },
          {
            rowid: "SGS9",
            columnid: "cam",
            value: "8",
            trlabel: "8 MP"
          },
          {
            rowid: "iphonex",
            columnid: "processor",
            value: "9.2",
            tllabel: "A11 Bionic Chip "
          },
          {
            rowid: "iphonex",
            columnid: "screen",
            value: "8.3",
            bllabel: "5.8 inch"
          },
          {
            rowid: "iphonex",
            columnid: "price",
            value: "7.3",
            tllabel: "$999"
          },
          {
            rowid: "iphonex",
            columnid: "backup",
            value: "8.8",
            brlabel: "2716 MAH"
          },
          {
            rowid: "iphonex",
            columnid: "cam",
            value: "8.7",
            trlabel: "12 MP"
          },
          {
            rowid: "op6",
            columnid: "processor",
            value: "9.1",
            tllabel: "Octa Core 2.8GHz"
          },
          {
            rowid: "op6",
            columnid: "screen",
            value: "8.6",
            bllabel: "6.28 inch"
          },
          {
            rowid: "op6",
            columnid: "price",
            value: "7.2",
            tllabel: "$529"
          },
          {
            rowid: "op6",
            columnid: "backup",
            value: "8.4",
            brlabel: "3300 MAH"
          },
          {
            rowid: "op6",
            columnid: "cam",
            value: "9.5",
            trlabel: "16 MP"
          },
          {
            rowid: "motoz2",
            columnid: "processor",
            value: "8.8",
            tllabel: "Quad Core 2.35GHz"
          },
          {
            rowid: "motoz2",
            columnid: "screen",
            value: "8.1",
            bllabel: "5.5 inch"
          },
          {
            rowid: "motoz2",
            columnid: "price",
            value: "9.7",
            tllabel: "$370"
          },
          {
            rowid: "motoz2",
            columnid: "backup",
            value: "9.2",
            brlabel: "2730 MAH"
          },
          {
            rowid: "motoz2",
            columnid: "cam",
            value: "7.1",
            trlabel: "24 MP"
          }
        ]
      }
    ],
    colorrange: {
      gradient: "1",
      minvalue: "5",
      maxvalue: "10",
      mapbypercent: "0",
      code: "#67CDF2",
      startlabel: "Poor",
      endlabel: "Outstanding"
    }
  };



  dataSpendCustomer = {
    chart: {
      caption: "",
      subcaption: "",
      yaxisname: "",
      palettecolors: "#7cb5ec, #ed8f1d",
      plotgradientcolor: " ",
      theme: "fusion",
      yaxismaxvalue: "30",
      numdivlines: "2",
      showlegend: "1",
      interactivelegend: "0",
      showvalues: "0",
      'paletteColors' :'7cb5ec,ed8f1d',
      showsum: "0"
    },
    categories: [
      {
        category: [
          {
            label: "Project 1"
          },
          {
            label: "Project 2"
          },
          {
            label: "Project 3"
          },
          {
            label: "Project 4"
          },
          {
            label: "Project 5"
          }

        ]
      }
    ],
    dataset: [
      {
        seriesname: "2016",
        data: [
          {
            value: "25"
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
            value: "16"
          }

        ]
      },
      {
        seriesname: "2017",
        data: [
          {
            value: "5"
          },
          {
            value: "8"
          },
          {
            value: "6"
          },
          {
            value: "3"
          },
          {
            value: "2"
          }
        ]
      }
    ],
    annotations: {
      groups: [
        {
          id: "infobar",
          items: [
            {
              id: "1",
              type: "line",
              x: "$dataset.1.set.1.endx+10",
              y: "$dataset.1.set.1.y",
              tox: "$dataset.1.set.1.endx+50",
              toy: "$dataset.1.set.1.y",
              color: "#1b3c6a",
              dashed: "0",
              thickness: "1"
            },
            {
              id: "2",
              type: "line",
              x: "$dataset.1.set.1.endx+50",
              y: "$dataset.1.set.1.y",
              tox: "$dataset.1.set.1.endx+50",
              toy: "$dataset.0.set.1.y+50",
              color: "#1b3c6a",
              dashed: "0",
              thickness: "1"
            },
            {
              id: "3",
              type: "line",
              x: "$dataset.1.set.17.endx+5",
              y: "$dataset.1.set.17.y",
              tox: "$dataset.1.set.17.endx+200",
              toy: "$dataset.0.set.17.y",
              color: "#1b3c6a",
              dashed: "0",
              thickness: "1"
            },
            {
              id: "4",
              type: "line",
              x: "$dataset.1.set.17.endx+200",
              y: "$dataset.0.set.17.y",
              tox: "$dataset.1.set.17.endx+200",
              toy: "$dataset.0.set.17.y-40",
              color: "#1b3c6a",
              dashed: "0",
              thickness: "1"
            },
            {
              id: "shape",
              type: "polygon",
              startangle: "180",
              sides: "3",
              radius: "6",
              color: "#1b3c6a",
              x: "$dataset.1.set.17.endx+10",
              y: "$dataset.1.set.17.y"
            },
            {
              id: "shape",
              type: "polygon",
              startangle: "180",
              sides: "3",
              radius: "6",
              color: "1b3c6a",
              x: "$dataset.1.set.1.endx+10",
              y: "$dataset.1.set.1.y"
            },
            {
              id: "label1",
              align: "RiGHT",
              type: "text",
              text: "",
              fillcolor: "#1b3c6a",
              rotate: "90",
              x: "$dataset.1.set.1.endx+65",
              y: "$dataset.0.set.5.y"
            },
            {
              id: "label2",
              align: "CENTER",
              type: "text",
              text:
                "",
              fillcolor: "#1b3c6a",
              rotate: "90",
              x: "$dataset.1.set.17.endx+200",
              y: "$dataset.0.set.13.y"
            }
          ]
        }
      ]
    }
  };








  



  datatotalProject = {
    data: [
      {
        label: "Top Selling Brands",
        value: "5800",
        data: [
          {
            label: "Samsung",
            value: "2217",
            data: [
              {
                label: "Galaxy Note 4",
                value: "519",
                svalue: "1.09"
              },
              {
                label: "Galaxy S6 Edge",
                value: "448",
                svalue: "1.48"
              },
              {
                label: "Galaxy S6",
                value: "416",
                svalue: "1.13"
              },
              {
                label: "Galaxy J1",
                value: "304",
                svalue: "1.18"
              },
              {
                label: "Galaxy J7",
                value: "159",
                svalue: "1.36"
              },
              {
                label: "Galaxy Note5",
                value: "191",
                svalue: "1.48"
              },
              {
                label: "galaxy A8",
                value: "180",
                svalue: "1.19"
              }
            ]
          },
          {
            label: "Apple",
            value: "1283",
            data: [
              {
                label: "iPhone 6",
                value: "340",
                svalue: "1.08"
              },
              {
                label: "iPhone 6s plus",
                value: "296",
                svalue: "1.14"
              },
              {
                label: "iPhone 6s",
                value: "227",
                svalue: "1.12"
              },
              {
                label: "iPhone 5s",
                value: "174",
                svalue: "1.18"
              },
              {
                label: "iPhone 5c",
                value: "96",
                svalue: "1.18"
              },
              {
                label: "iPhone 4s",
                value: "150",
                svalue: "1.11"
              }
            ]
          },
          {
            label: "Nokia",
            value: "759",
            data: [
              {
                label: "Lumia 630",
                value: "101",
                svalue: "1.13"
              },
              {
                label: "lumia 810",
                value: "98",
                svalue: "0.85"
              },
              {
                label: "lumia 930",
                value: "105",
                svalue: "0.56"
              },
              {
                label: "lumia 950 XL dual sim",
                value: "85",
                svalue: "0.75"
              },
              {
                label: "lumia 735",
                value: "64",
                svalue: "0.78"
              },
              {
                label: "lumia 830",
                value: "66",
                svalue: "0.83"
              },
              {
                label: "lumia 1320 LTE",
                value: "133",
                svalue: "0.29"
              },
              {
                label: "lumia 1320",
                value: "107",
                svalue: "0.29"
              }
            ]
          },
          {
            label: "LG",
            value: "441",
            data: [
              {
                label: "G4",
                value: "189",
                svalue: "0.51"
              },
              {
                label: "L70 Dual",
                value: "122",
                svalue: "0.52"
              },
              {
                label: "G FLEX 2",
                value: "77",
                svalue: "0.64"
              },
              {
                label: "G3 S",
                value: "53",
                svalue: "0.64"
              }
            ]
          },
          {
            label: "Huawei",
            value: "411",
            data: [
              {
                label: "Y3 U03",
                value: "136",
                svalue: "1.40"
              },
              {
                label: "G8",
                value: "78",
                svalue: "0.87"
              },
              {
                label: "Y520",
                value: "67",
                svalue: "1.35"
              },
              {
                label: "ascend p7",
                value: "48",
                svalue: "0.97"
              },
              {
                label: "G7 plus",
                value: "27",
                svalue: "0.87"
              },
              {
                label: "P8",
                value: "55",
                svalue: "1.23"
              }
            ]
          },
          {
            label: "Lenovo",
            value: "489",
            data: [
              {
                label: "A5000",
                value: "47",
                svalue: "0.69"
              },
              {
                label: "vibe P780",
                value: "37",
                svalue: "0.69"
              },
              {
                label: "K4 Note",
                value: "156",
                svalue: "0.69"
              },
              {
                label: "A7010",
                value: "89",
                svalue: "0.71"
              },
              {
                label: "Vibe P1 Mini",
                value: "110",
                svalue: "0.67"
              },
              {
                label: "Vibe x3 Lite",
                value: "50",
                svalue: "0.77"
              }
            ]
          },
          {
            label: "Sony",
            value: "200",
            data: [
              {
                label: "Xperia Z3",
                value: "38",
                svalue: "1.5"
              },
              {
                label: "Xperia Z3+",
                value: "25",
                svalue: "1.38"
              },
              {
                label: "Xperia Z5",
                value: "67",
                svalue: "0.64"
              },
              {
                label: "Xperia X3 Dual",
                value: "46",
                svalue: "0.73"
              },
              {
                label: "Xperia E4",
                value: "24",
                svalue: "0.77"
              }
            ]
          }
        ]
      }
    ],
    colorrange: {
      mapbypercent: "0",
      gradient: "1",
      minvalue: "0",
      code: "#62B58F",
      startlabel: "Ideal",
      endlabel: "Threshold",
      color: [
        {
          code: "#FFC533",
          maxvalue: "0.8"
        },
        {
          code: "#F2726F",
          maxvalue: "1.6",
          label: "Threshold"
        }
      ]
    },
    chart: {
      algorithm: "sliceanddice",
      slicingmode: "horizontal",
      caption: "",
      subcaption: "",
      theme: "fusion",
      legendcaption: "Specific Absorption Rate (SAR) in W/kg",
      plottooltext:
        "<b>$label</b><br>SAR (Body): <b>$sValue W/kg</b><br>Units Sold: <b>$dataValue</b>"
    }
  };



  fromdateFirst: any;
  fromdateLast: any;
  CmpCode: any =  undefined;
  public filter: Object;
  public filterSettings: Object;
  public selectionSettings: Object;
  //public height: string = '240px';
  public fields: Object = { text: 'text', value: 'value' };
  public item: number[] = [1, 2, 3, 4, 5];
  roleIds: any;
  UserType: any
  Token:any;



  constructor(
   private  HTTP: GlobalServiceService,
   private datepipe:DatePipe,
   private route: ActivatedRoute,
   private authServiceService:AuthServiceService,
   private change:ChangeDetectorRef

  ) {
    this.route.queryParams.subscribe(params => {
      this.Token = params['token'];
      debugger
      let val = params['UserId']
      // let data  = CryptoJS.AES.decrypt(val, environment.AnalyticKey);
      // let UserId = data.toString(CryptoJS.enc.Utf8);
      this.userId= val;
    
  });


   }
  setDepartment:any
  departmentList:any=[]
  onChange(e){

    this.departmentId=e.target.value
    this.getpbiExpenseProjectCategory()
    this.getpbiExpenseDeployee()
    this.getpbiExpenseBreackUp()
    this.getPbiBuisinessRevenueList()
    this.getPbiBuisinessAvgRevenueList()
    this.getPbiBuisinessExpenseAndHeadCountAndProjectList()
    this.getpbiExpenseDepartment()
    this.getpbiExpense()
    this.onCloseHandled()
    this.getpbiPeopleDetailList()
    this.getpbiPeopleDesignation()
   
    this.getpbiSpenderWise()
    this.getpbiCustomerWise()
    this.getpbiPeopleDepartment()
    this.getpbiPeopleLocation()
    this.getpbiPeopleAge()
    this.getpbiPeopleJoband()
    this.getpbiPeopleGender()
    this.getpbiPeopleEmployeeVsVendor()
    this.getpbiPeopleEmployeeAddition()
    this.getpbiPeopleEmployeeAttrition()
    this.getpbiPeopleEmployeePerformance()
    this.getpbiPeopleTenureWiseEmployee()
    this.getpbiProjectDetailList()
    this.getpbiPeopleResources()
    this.getpbiProjectEmployeeVsVendor()
    this.getpbiProjecDeployeeVsBench()
    this.getpbiProjecDeployeeVsBenchBill()
    this.getpbiExpenseReportList()
    this.getpbiProjecDeployeeVsBenchBillEmployeeCountVsExpense()
    this.getpbiProjecDeployeeVsBenchBillProjectCountVsExpense()
    this.getpbiProjecDeployeeVsBenchBillCustomerVsService()

    this.getProjectPortFoliyo()
    //this.getProjectProjectDetailRevnueAndCost()
    //this.getPbiProjectDetailProgressAndCost()
    //this.getpbiProjectDetailRoadblock()
    //this.getpbiProjectDevaition()
    //this.getpbiProjectDevaitionAllTask()
    this.getProjectProjectDetailPAndLGridList()
    this.getpbiProjectDetailPAndLList()
    this.getProjectExpenseDetailList()
    this.getProjectBuisinessProjectList()
    this.getProjectBuisinessPeopleList()
    this.getProjectBuisinessExpenseList()
    this.getPbiProjectInNumber()
    this.getPbiProjectInNumberInCost()
    this.getPbiProjectInNumberInCostLeave()
    this.getpbiExpenseProject()
   this.pbiActionableTimesheetList()
   this.pbiActionableCheckInCheckOutList()
   this.pbiActionableInsightList()
  }
  dateFormat
  currencyName 
  currencySymbols(datas: string) {
    return this.authServiceService.CurrencySymbols(datas);
  }
  ngOnInit(): void {
    debugger
    this.departmentId=0
    this.setDepartment=0
    this.currencyName = this.authServiceService.getCurrency()
    this.checkMom=true
    let latest_date =this. datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.setDate=latest_date
    let getdate = new Date(); 
    this.getDate=latest_date
    let shortMonth = getdate. toLocaleString('en-us', { month: 'short' }); /* Jun */
    this.monthName=shortMonth
    this.calendarName=this.monthName+''+getdate.getFullYear();
    this.selectionSettings = { persistSelection: true, type: "Multiple", checkboxOnly: true };
    this.filterSettings = { type: "Menu" };
    this.filter = { type: "CheckBox" };
  
    this.Planwk1 = [
      {
        field: 'openTask',
        headerText: 'Total',
        textAlign:"Center"
      },
      {
        field: 'pendingTask',
        headerText: 'In Progress',
        textAlign:"Center",




      },
      {
        field: 'closeTask',
        headerText: 'Closed',
        textAlign:"Center",




      },

    ]
    this.Planwk2 = [
      {
        field: 'openMom',
        headerText: 'Open',
        textAlign:"Center",



      },
      {
        field: 'wipMom',
        headerText: 'WIP',
        textAlign:"Center",


      },
      {
        field: 'closeMom',
        headerText: 'Close',
        textAlign:"Center",



      },
    ]
    this.Planwk3 = [
      {
        field: 'openRoadBlock',
        headerText: 'Open',

        textAlign:"Center",


      },
      {
        field: 'closeRoadBlock',
        headerText: 'Close',
        textAlign:"Center",


      },
    ]
    this.Planwk4 = [
      {
        field: 'approveExpense',
        headerText: 'Approved',
        textAlign:"Center",



      },
      {
        field: 'rejectExpense',
        headerText: 'Reject',
        textAlign:"Center",


      },
    ];
    this.HTTP.GetLoginusers(this.userId, null, this.Token).subscribe(res =>{
      this.CmpCode = res.data.table[0].companyCode;
      this.Decimalformat = res.data.table[0].dateFormat;
      this.dateFormat = res.data.table[0].dateFormat;
  
      this.getpbiExpenseProjectCategory()
      this.getpbiExpenseDeployee()
      this.getpbiExpenseBreackUp()
      this.getPbiBuisinessRevenueList()
      this.getPbiBuisinessAvgRevenueList()
      this.getPbiBuisinessExpenseAndHeadCountAndProjectList()
      this.getpbiExpenseDepartment()
      this.getpbiExpense()
      this.getpbiPeopleDetailList()
      this.getpbiPeopleDesignation()
      this.getpbiSpenderWise()
      this.getpbiCustomerWise()
      this.getpbiPeopleDepartment()
      this.getpbiPeopleLocation()
      this.getpbiPeopleAge()
      this.getpbiPeopleJoband()
      this.getpbiPeopleGender()
      this.getpbiPeopleEmployeeVsVendor()
      this.getpbiPeopleEmployeeAddition()
      this.getpbiPeopleEmployeeAttrition()
      this.getpbiPeopleEmployeePerformance()
      this.getpbiPeopleTenureWiseEmployee()
      this.getpbiProjectDetailList()
      this.getpbiPeopleResources()
      this.getpbiProjectEmployeeVsVendor()
      this.getpbiProjecDeployeeVsBench()
      this.getpbiProjecDeployeeVsBenchBill()
      this.getpbiExpenseReportList()
      this.getpbiProjecDeployeeVsBenchBillEmployeeCountVsExpense()
      this.getpbiProjecDeployeeVsBenchBillProjectCountVsExpense()
      this.getpbiProjecDeployeeVsBenchBillCustomerVsService()
  
      this.getProjectPortFoliyo()
      //this.getProjectProjectDetailRevnueAndCost()
      //this.getPbiProjectDetailProgressAndCost()
      //this.getpbiProjectDetailRoadblock()
      //this.getpbiProjectDevaition()
      //this.getpbiProjectDevaitionAllTask()
      this.getProjectProjectDetailPAndLGridList()
      this.getpbiProjectDetailPAndLList()
      this.getProjectExpenseDetailList()
      this.getProjectBuisinessProjectList()
      this.getProjectBuisinessPeopleList()
      this.getProjectBuisinessExpenseList()
      this.getPbiProjectInNumber()
      this.getPbiProjectInNumberInCost()
      this.getPbiProjectInNumberInCostLeave()
      this.getpbiExpenseProject()
      this.getDepartmentListDropdown()
      this.pbiActionableTimesheetList()
      this.pbiActionableCheckInCheckOutList()
      this.pbiActionableInsightList()
      this.authServiceService.setcompanyCode(res.data.table[0].companyCode); 
      this.authServiceService.setUserId(this.userId);
      this.authServiceService.setUsername(res.data.table[0].name)
      this.authServiceService.setUserImage(res.data.table[0].userImage)
      this.authServiceService.setCurrency(res.data.table[0].currency)
      this.authServiceService.setComponyImage(res.data.table[0].logo)
      this.authServiceService.setUserEmail(res.data.table[0].email)
      this.authServiceService.setdateFormat(res.data.table[0].dateFormat)
      this.authServiceService.setdecimalFormat(res.data.table[0].decimalFormat);
    })
 
   
    this.refreshEle = document.getElementsByClassName("myRefrehClass");
    setTimeout(() => {
      this.refreshEle[0].click()
      this.onPeopleClick();
    }, 2000);
  }
  refreshEle
  actionComplete(args: any) {
    if(this.actionGridRefresh==true)
    {
      if (args.name== "actionComplete") {
        
        var date = new Date(this.isDate)
        var aa = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var d = aa.getDate()
        var monthNumber = aa.getDate() + 1 //29
        var monthNumbers = aa.getDate() + 2 //30
        var monthNumbert = aa.getDate() + 3 //31
        this.gridset.getColumnByField('thirtyone').visible = true;
  
        this.gridset.getColumnByField('thirty').visible = true;
        this.gridset.getColumnByField('twentynine').visible = true;
        //var node=document.getElementById("overviewgrid")
        if (d == 28) {
           // node.getAttributeNames('')
          var number = monthNumber.toString()
          var number1 = monthNumbers.toString()
          var number2 = monthNumbert.toString()
          this.gridset.getColumnByField('thirtyone').visible = false;
  
          this.gridset.getColumnByField('thirty').visible = false;
          this.gridset.getColumnByField('twentynine').visible = false;
  
          this.actionGridRefresh=false
  
          //this.gridset.getColumnByField(number1).visible = false;
          //this.gridset.getColumnByField(number2).visible = false;
          //this.grids.hideColumns([number, number1,number2]); 
          //this.grids.folu

          this.gridset.refreshColumns();
          this.gridset.refresh()
  
        }
        if (d == 29) {
          var number = monthNumber.toString()
          var number1 = monthNumbers.toString()
          this.gridset.getColumnByField('thirty').visible = false;
  
          this.gridset.getColumnByField('thirtyone').visible = false;
  this.actionGridRefresh=false

          this.gridset.refreshColumns();
          this.gridset.refresh()
  
  
        }
        if (d == 30) {
          var number = monthNumber.toString()
          this.gridset.getColumnByField('thirtyone').visible = false;
          this.actionGridRefresh=false
  
          this.gridset.refreshColumns();
          this.gridset.refresh()
  
  
  
        }
        if(d==31)
        {
  this.actionGridRefresh=false

          this.gridset.refreshColumns();
          this.gridset.refresh()
  
        }
      }

    }
  


  }
  overdueGrid:boolean=false
  roadGrid:boolean=false
  actionCompleteCheck(args: any) {
    if(this.roadGrid==true)
    {
      if (args.name== "actionComplete") {
        var date = new Date(this.isDate)
        var aa = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var d = aa.getDate()
        var monthNumber = aa.getDate() + 1 //29
        var monthNumbers = aa.getDate() + 2 //30
        var monthNumbert = aa.getDate() + 3 //31
        if(this.checkMom==true)
        {
          this.gridsInsight.getColumnByField('twentynine').visible = true;
  
          this.gridsInsight.getColumnByField('thirty').visible = true;
          this.gridsInsight.getColumnByField('thirtyone').visible = true;
        }
        if(this.checkOverDue==true)
        {
          this.gridsInsightOver.getColumnByField('twentynine').visible = true;
  
          this.gridsInsightOver.getColumnByField('thirty').visible = true;
          this.gridsInsightOver.getColumnByField('thirtyone').visible = true;
        }
        if(this.checkRoadBlock==true)
        {
          this.gridsInsightRoad.getColumnByField('twentynine').visible = true;
          this.gridsInsightRoad.getColumnByField('thirty').visible = true;
          this.gridsInsightRoad.getColumnByField('thirtyone').visible = true;
        }
  
        //var node=document.getElementById("overviewgrid")
        if (d == 28) {
           // node.getAttributeNames('')
          var number = monthNumber.toString()
          var number1 = monthNumbers.toString()
          var number2 = monthNumbert.toString()
          if(this.checkMom==true)
          {
            this.gridsInsight.getColumnByField('twentynine').visible = false;
    
            this.gridsInsight.getColumnByField('thirty').visible = false;
            this.gridsInsight.getColumnByField('thirtyone').visible = false;
            this.gridsInsight.refreshColumns();
            this.gridsInsight.refresh()
          }
          if(this.checkOverDue==true)
          {
            this.gridsInsightOver.getColumnByField('twentynine').visible = false;
    
            this.gridsInsightOver.getColumnByField('thirty').visible = false;
            this.gridsInsightOver.getColumnByField('thirtyone').visible = false;
            this.gridsInsightOver.refreshColumns();
            this.gridsInsightOver.refresh()
          }
          if(this.checkRoadBlock==true)
          {
            this.gridsInsightRoad.getColumnByField('twentynine').visible = false;
    
            this.gridsInsightRoad.getColumnByField('thirty').visible = false;
            this.gridsInsightRoad.getColumnByField('thirtyone').visible = false;
            this.gridsInsightRoad.refreshColumns();
            this.gridsInsightRoad.refresh()
          }
    
  
  
          //this.gridset.getColumnByField(number1).visible = false;
  
          //this.gridset.getColumnByField(number2).visible = false;
        //  this.grids.hideColumns([number, number1,number2]); 
          //this.grids.folu
         
  
        }
        if (d == 29) {
          var number = monthNumber.toString()
          var number1 = monthNumbers.toString()
          if(this.checkMom==true)
          {
    
            this.gridsInsight.getColumnByField('thirty').visible = false;
            this.gridsInsight.getColumnByField('thirtyone').visible = false;
            this.gridsInsight.refreshColumns();
            this.gridsInsight.refresh()
          }
          if(this.checkOverDue==true)
          {
    
            this.gridsInsightOver.getColumnByField('thirty').visible = false;
            this.gridsInsightOver.getColumnByField('thirtyone').visible = false;
            this.gridsInsightOver.refreshColumns();
            this.gridsInsightOver.refresh()
          }
          if(this.checkRoadBlock==true)
          {
    
            this.gridsInsightRoad.getColumnByField('thirty').visible = false;
            this.gridsInsightRoad.getColumnByField('thirtyone').visible = false;
            this.gridsInsightRoad.refreshColumns();
            this.gridsInsightRoad.refresh()
          }
    
  
  
          
  
  
        }
        if (d == 30) {
          var number = monthNumber.toString()
          if(this.checkMom==true)
          {
    
            this.gridsInsight.getColumnByField('thirtyone').visible = false;
            this.gridsInsight.refreshColumns();
            this.gridsInsight.refresh()
          }
          if(this.checkOverDue==true)
          {
    
            this.gridsInsightOver.getColumnByField('thirtyone').visible = false;
            this.gridsInsightOver.refreshColumns();
            this.gridsInsightOver.refresh()
          }
          if(this.checkRoadBlock==true)
          {
    
            this.gridsInsightRoad.getColumnByField('thirtyone').visible = false;
            this.gridsInsightRoad.refreshColumns();
            this.gridsInsightRoad.refresh()
          }
    
  
  
          
  
  
  
  
        }
        if(d==31)
        {
  
          if(this.checkMom==true)
          {
    
            this.gridsInsight.refreshColumns();
            this.gridsInsight.refresh()
          }
          if(this.checkOverDue==true)
          {
    
            this.gridsInsightOver.refreshColumns();
            this.gridsInsightOver.refresh()
          }
          if(this.checkRoadBlock==true)
          {
    
            this.gridsInsightRoad.refreshColumns();
            this.gridsInsightRoad.refresh()
          }
    
  
  
          
  
  
  
        
  
        }
      }
    }
    if(this.overdueGrid==true)
    {
      if (args.name== "actionComplete") {
        var date = new Date(this.isDate)
        var aa = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var d = aa.getDate()
        var monthNumber = aa.getDate() + 1 //29
        var monthNumbers = aa.getDate() + 2 //30
        var monthNumbert = aa.getDate() + 3 //31
        if(this.checkMom==true)
        {
          this.gridsInsight.getColumnByField('twentynine').visible = true;
  
          this.gridsInsight.getColumnByField('thirty').visible = true;
          this.gridsInsight.getColumnByField('thirtyone').visible = true;
        }
        if(this.checkOverDue==true)
        {
          this.gridsInsightOver.getColumnByField('twentynine').visible = true;
  
          this.gridsInsightOver.getColumnByField('thirty').visible = true;
          this.gridsInsightOver.getColumnByField('thirtyone').visible = true;
        }
        if(this.checkRoadBlock==true)
        {
          this.gridsInsightRoad.getColumnByField('twentynine').visible = true;
          this.gridsInsightRoad.getColumnByField('thirty').visible = true;
          this.gridsInsightRoad.getColumnByField('thirtyone').visible = true;
        }
  
        //var node=document.getElementById("overviewgrid")
        if (d == 28) {
           // node.getAttributeNames('')
          var number = monthNumber.toString()
          var number1 = monthNumbers.toString()
          var number2 = monthNumbert.toString()
          if(this.checkMom==true)
          {
            this.gridsInsight.getColumnByField('twentynine').visible = false;
    
            this.gridsInsight.getColumnByField('thirty').visible = false;
            this.gridsInsight.getColumnByField('thirtyone').visible = false;
            this.gridsInsight.refreshColumns();
            this.gridsInsight.refresh()
          }
          if(this.checkOverDue==true)
          {
            this.gridsInsightOver.getColumnByField('twentynine').visible = false;
    
            this.gridsInsightOver.getColumnByField('thirty').visible = false;
            this.gridsInsightOver.getColumnByField('thirtyone').visible = false;
            this.gridsInsightOver.refreshColumns();
            this.gridsInsightOver.refresh()
          }
          if(this.checkRoadBlock==true)
          {
            this.gridsInsightRoad.getColumnByField('twentynine').visible = false;
    
            this.gridsInsightRoad.getColumnByField('thirty').visible = false;
            this.gridsInsightRoad.getColumnByField('thirtyone').visible = false;
            this.gridsInsightRoad.refreshColumns();
            this.gridsInsightRoad.refresh()
          }
    
  
  
          //this.gridset.getColumnByField(number1).visible = false;
  
          //this.gridset.getColumnByField(number2).visible = false;
        //  this.grids.hideColumns([number, number1,number2]); 
          //this.grids.folu
         
  
        }
        if (d == 29) {
          var number = monthNumber.toString()
          var number1 = monthNumbers.toString()
          if(this.checkMom==true)
          {
    
            this.gridsInsight.getColumnByField('thirty').visible = false;
            this.gridsInsight.getColumnByField('thirtyone').visible = false;
            this.gridsInsight.refreshColumns();
            this.gridsInsight.refresh()
          }
          if(this.checkOverDue==true)
          {
    
            this.gridsInsightOver.getColumnByField('thirty').visible = false;
            this.gridsInsightOver.getColumnByField('thirtyone').visible = false;
            this.gridsInsightOver.refreshColumns();
            this.gridsInsightOver.refresh()
          }
          if(this.checkRoadBlock==true)
          {
    
            this.gridsInsightRoad.getColumnByField('thirty').visible = false;
            this.gridsInsightRoad.getColumnByField('thirtyone').visible = false;
            this.gridsInsightRoad.refreshColumns();
            this.gridsInsightRoad.refresh()
          }
    
  
  
          
  
  
        }
        if (d == 30) {
          var number = monthNumber.toString()
          if(this.checkMom==true)
          {
    
            this.gridsInsight.getColumnByField('thirtyone').visible = false;
            this.gridsInsight.refreshColumns();
            this.gridsInsight.refresh()
          }
          if(this.checkOverDue==true)
          {
    
            this.gridsInsightOver.getColumnByField('thirtyone').visible = false;
            this.gridsInsightOver.refreshColumns();
            this.gridsInsightOver.refresh()
          }
          if(this.checkRoadBlock==true)
          {
    
            this.gridsInsightRoad.getColumnByField('thirtyone').visible = false;
            this.gridsInsightRoad.refreshColumns();
            this.gridsInsightRoad.refresh()
          }
    
  
  
          
  
  
  
  
        }
        if(d==31)
        {
  
          if(this.checkMom==true)
          {
    
            this.gridsInsight.refreshColumns();
            this.gridsInsight.refresh()
          }
          if(this.checkOverDue==true)
          {
    
            this.gridsInsightOver.refreshColumns();
            this.gridsInsightOver.refresh()
          }
          if(this.checkRoadBlock==true)
          {
    
            this.gridsInsightRoad.refreshColumns();
            this.gridsInsightRoad.refresh()
          }
    
  
  
          
  
  
  
        
  
        }
      }
    }
    if(this.momGrid==true)
    {
      if (args.name== "actionComplete") {
        var date = new Date(this.isDate)
        var aa = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var d = aa.getDate()
        var monthNumber = aa.getDate() + 1 //29
        var monthNumbers = aa.getDate() + 2 //30
        var monthNumbert = aa.getDate() + 3 //31
        if(this.checkMom==true)
        {
          this.gridsInsight.getColumnByField('twentynine').visible = true;
  
          this.gridsInsight.getColumnByField('thirty').visible = true;
          this.gridsInsight.getColumnByField('thirtyone').visible = true;
        }
        if(this.checkOverDue==true)
        {
          this.gridsInsightOver.getColumnByField('twentynine').visible = true;
  
          this.gridsInsightOver.getColumnByField('thirty').visible = true;
          this.gridsInsightOver.getColumnByField('thirtyone').visible = true;
        }
        if(this.checkRoadBlock==true)
        {
          this.gridsInsightRoad.getColumnByField('twentynine').visible = true;
          this.gridsInsightRoad.getColumnByField('thirty').visible = true;
          this.gridsInsightRoad.getColumnByField('thirtyone').visible = true;
        }
  
        //var node=document.getElementById("overviewgrid")
        if (d == 28) {
           // node.getAttributeNames('')
          var number = monthNumber.toString()
          var number1 = monthNumbers.toString()
          var number2 = monthNumbert.toString()
          if(this.checkMom==true)
          {
            this.gridsInsight.getColumnByField('twentynine').visible = false;
    
            this.gridsInsight.getColumnByField('thirty').visible = false;
            this.gridsInsight.getColumnByField('thirtyone').visible = false;
            this.gridsInsight.refreshColumns();
            this.gridsInsight.refresh()
          }
          if(this.checkOverDue==true)
          {
            this.gridsInsightOver.getColumnByField('twentynine').visible = false;
    
            this.gridsInsightOver.getColumnByField('thirty').visible = false;
            this.gridsInsightOver.getColumnByField('thirtyone').visible = false;
            this.gridsInsightOver.refreshColumns();
            this.gridsInsightOver.refresh()
          }
          if(this.checkRoadBlock==true)
          {
            this.gridsInsightRoad.getColumnByField('twentynine').visible = false;
    
            this.gridsInsightRoad.getColumnByField('thirty').visible = false;
            this.gridsInsightRoad.getColumnByField('thirtyone').visible = false;
            this.gridsInsightRoad.refreshColumns();
            this.gridsInsightRoad.refresh()
          }
    
  
  
          //this.gridset.getColumnByField(number1).visible = false;
  
          //this.gridset.getColumnByField(number2).visible = false;
        //  this.grids.hideColumns([number, number1,number2]); 
          //this.grids.folu
         
  
        }
        if (d == 29) {
          var number = monthNumber.toString()
          var number1 = monthNumbers.toString()
          if(this.checkMom==true)
          {
    
            this.gridsInsight.getColumnByField('thirty').visible = false;
            this.gridsInsight.getColumnByField('thirtyone').visible = false;
            this.gridsInsight.refreshColumns();
            this.gridsInsight.refresh()
          }
          if(this.checkOverDue==true)
          {
    
            this.gridsInsightOver.getColumnByField('thirty').visible = false;
            this.gridsInsightOver.getColumnByField('thirtyone').visible = false;
            this.gridsInsightOver.refreshColumns();
            this.gridsInsightOver.refresh()
          }
          if(this.checkRoadBlock==true)
          {
    
            this.gridsInsightRoad.getColumnByField('thirty').visible = false;
            this.gridsInsightRoad.getColumnByField('thirtyone').visible = false;
            this.gridsInsightRoad.refreshColumns();
            this.gridsInsightRoad.refresh()
          }
    
  
  
          
  
  
        }
        if (d == 30) {
          var number = monthNumber.toString()
          if(this.checkMom==true)
          {
    
            this.gridsInsight.getColumnByField('thirtyone').visible = false;
            this.gridsInsight.refreshColumns();
            this.gridsInsight.refresh()
          }
          if(this.checkOverDue==true)
          {
    
            this.gridsInsightOver.getColumnByField('thirtyone').visible = false;
            this.gridsInsightOver.refreshColumns();
            this.gridsInsightOver.refresh()
          }
          if(this.checkRoadBlock==true)
          {
    
            this.gridsInsightRoad.getColumnByField('thirtyone').visible = false;
            this.gridsInsightRoad.refreshColumns();
            this.gridsInsightRoad.refresh()
          }
    
  
  
          
  
  
  
  
        }
        if(d==31)
        {
  
          if(this.checkMom==true)
          {
    
            this.gridsInsight.refreshColumns();
            this.gridsInsight.refresh()
          }
          if(this.checkOverDue==true)
          {
    
            this.gridsInsightOver.refreshColumns();
            this.gridsInsightOver.refresh()
          }
          if(this.checkRoadBlock==true)
          {
    
            this.gridsInsightRoad.refreshColumns();
            this.gridsInsightRoad.refresh()
          }
    
  
  
          
  
  
  
        
  
        }
      }
    }
    this.momGrid=false
    this.roadGrid=false
    this.overdueGrid=false


  }
  onGridDataBound(args) {
    // alert(args);
  if(this.refreshGrid==true)
  {
    var date = new Date(this.isDate)
    var aa = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var d = aa.getDate()
    var monthNumber = aa.getDate() + 1 //29
    var monthNumbers = aa.getDate() + 2 //30
    var monthNumbert = aa.getDate() + 3 //31
    this.gridcheck.getColumnByField('29').visible = true;

    this.gridcheck.getColumnByField('30').visible = true;
    this.gridcheck.getColumnByField('31').visible = true;
    //var node=document.getElementById("overviewgrid")
    if (d == 28) {
       // node.getAttributeNames('')
       for (const col of this.gridcheck.columns) {
        switch((col as any).field) {
          case '29':
          case '30':
          case '31':
          // case 'porcentajeGastosApertura':
          // case 'gastosApertura':
          // case 'cuota':
          // case 'primeraCuota':
             (col as any).visible = false;
            break;
        }
      }
      // var number = monthNumber.toString()
      // var number1 = monthNumbers.toString()
      // var number2 = monthNumbert.toString()
      // this.gridcheck.getColumnByField('29').visible = false;

      // this.gridcheck.getColumnByField('30').visible = false;
      // this.gridcheck.getColumnByField('31').visible = false;



      //this.gridset.getColumnByField(number1).visible = false;

      //this.gridset.getColumnByField(number2).visible = false;
    //  this.grids.hideColumns([number, number1,number2]); 
      //this.grids.folu
      // this.gridcheck.refreshColumns();
      // this.gridcheck.refresh()

    }
    if (d == 29) {
      var number = monthNumber.toString()
      var number1 = monthNumbers.toString()
      for (const col of this.gridcheck.columns) {
        switch((col as any).field) {
          case '30':
          case '31':
          // case 'tae':
          // case 'porcentajeGastosApertura':
          // case 'gastosApertura':
          // case 'cuota':
          // case 'primeraCuota':
             (col as any).visible = false;
            break;
        }
      }
      // this.gridcheck.getColumnByField('30').visible = false;

      // this.gridcheck.getColumnByField('31').visible = false;
      // this.gridcheck.refreshColumns();
      // this.gridcheck.refresh()


    }
    if (d == 30) {
      
    for (const col of this.gridcheck.columns) {
      switch((col as any).field) {
        case '31':
        // case 'tin':
        // case 'tae':
        // case 'porcentajeGastosApertura':
        // case 'gastosApertura':
        // case 'cuota':
        // case 'primeraCuota':
           (col as any).visible = false;
          break;
      }

    }
      var number = monthNumber.toString()
     // this.gridcheck.getColumnByField('31').visible = false;

      // this.gridcheck.refreshColumns();
      // this.gridcheck.refresh()



    }
    if(d==31)
    {
      this.gridcheck.getColumnByField('29').visible = true;

      this.gridcheck.getColumnByField('30').visible = true;
      this.gridcheck.getColumnByField('31').visible = true;
      this.gridcheck.refreshColumns();

    }

this.refreshGrid=false

   this.gridcheck.refreshColumns();
   this.gridcheck.refresh()

  }
  else{
    
  }
  
  }
  checkinCheciOut(){
    debugger
    this.currentDate=this.setDate
    let shortMonth = new Date(this.currentDate). toLocaleString('en-us', { month: 'short' }); /* Jun */
    this.monthName=shortMonth
    this.fullYear=new Date(this.currentDate).getFullYear()
    this.calendarName=this.monthName+' '+this.fullYear
    this.checkDate=0
    this.pbiActionableCheckInCheckOutList()
  }

  inSight(){
    this.show=false
    this.checkDate=0
    this.currentDate=this.setDate
    let shortMonth = new Date(this.currentDate). toLocaleString('en-us', { month: 'short' }); /* Jun */
    this.monthName=shortMonth
    this.fullYear=new Date(this.currentDate).getFullYear()
    this.calendarName=this.monthName+' '+this.fullYear
    if(this.checkMom==true){
  this.pbiActionableInsightList()

}
if(this.checkRoadBlock==true)
{
  this.pbiActionableInsightRoadBlockList()
}
if(this.checkOverDue==true)
{
  this.pbiActionableInsightOverDueList()
}

  }


  timesheetOut()
  {
    this.show=false
    this.currentDate=this.setDate
    let shortMonth = new Date(this.currentDate). toLocaleString('en-us', { month: 'short' }); /* Jun */

    this.monthName=shortMonth
    
this.fullYear=new Date(this.currentDate).getFullYear()
this.calendarName=this.monthName+' '+this.fullYear

    this.checkDate=0
    this.pbiActionableTimesheetList()
  }
actionableTimeSheetList:any=[]
setActionableTimeSheetList:any=[]
actionGridRefresh:boolean=false
pbiActionableTimesheetList()
{
  this.Loader=true
  if(this.checkDate==0)
  {
  var date=this.setDate
  }
  else
  {
    date=this.isDate
  }
    this.setActionableTimeSheetList=[]
    this.actionableTimeSheetList=[]
      this.HTTP.getpbiActionableTimeSheetList(date,this.CmpCode,this.departmentId).subscribe(arg => {
    this.actionableTimeSheetList=  arg.data.table
     console.log('actionableTimeSheetList',arg.data.table)
    this.Loader=false
this.actionGridRefresh=true
    var newArr = [];
    for(var i = 0; i < this.actionableTimeSheetList.length; i++)
    {
      var obj = this.actionableTimeSheetList[i];
      obj['one'] = obj[1];
      obj['two'] = obj[2];
      obj['three'] = obj[3];
      obj['four'] = obj[4];
      obj['five'] = obj[5];
      obj['six'] = obj[6];
      obj['seven'] = obj[7];
      obj['eight'] = obj[8];
      obj['nine'] = obj[9];
      obj['ten'] = obj[10];
      obj['eleven'] = obj[11];
      obj['twelve'] = obj[12];
      obj['threeten'] = obj[13];
      obj['fourteen'] = obj[14];
      obj['fifteen'] = obj[15];

      obj['sixteen'] = obj[16];
      obj['seventeen'] = obj[17];

      obj['eighteen'] = obj[18];

      obj['nineteen'] = obj[19];
      obj['twenty'] = obj[20];

      obj['twentyone'] = obj[21];

      obj['twentytwo'] = obj[22];
      obj['twentythree'] = obj[23];


      obj['twentyfour'] = obj[24];

      obj['twentyfive'] = obj[25];
      obj['twentysix'] = obj[26];


      obj['twentyseven'] = obj[27];


      obj['twentyeight'] = obj[28];

      obj['twentynine'] = obj[29];
     
      obj['thirty'] = obj[30];
       obj['thirtyone'] = obj[31];




    
       delete(obj[1]);
       delete(obj[2]);
       delete(obj[3]);
       delete(obj[4]);
       delete(obj[5]);
       delete(obj[6]);
       delete(obj[7]);
       delete(obj[8]);
       delete(obj[9]);
       delete(obj[10]);
       delete(obj[11]);
       delete(obj[12]);
       delete(obj[13]);
       delete(obj[14]);
       delete(obj[15]);
       delete(obj[16]);
       delete(obj[17]);
       delete(obj[18]);
       delete(obj[19]);
      
       delete(obj[20]);
       delete(obj[21]);
       delete(obj[22]);
       delete(obj[23]);
       delete(obj[24]);
       delete(obj[25]);
       delete(obj[26]);
       delete(obj[27]);
       delete(obj[28]);
       delete(obj[29]);
       delete(obj[30]);
       delete(obj[31]);
            
      newArr.push(obj);
    }
   this.setActionableTimeSheetList=newArr
this.checkDate=0
this.gridset.dataSource=this.setActionableTimeSheetList
this.gridset.refresh()
this.gridset.refreshColumns()
this.change.detectChanges();
  })
}
changeStatus(e)
{
this.conditionStatus=e.target.value

}
refreshGrid:boolean=false
actionableCheckInCheckOutList:any=[]
conditionStatus:any
pbiActionableCheckInCheckOutList(){
  debugger
  this.Loader=true
  this.actionableCheckInCheckOutList=[]
  if(this.checkDate==0)
  {
  var date=this.setDate
  }
  else
  {
    date=this.isDate
  }
  if(this.checkInValue==undefined ||this.checkInValue==null||this.checkInValue=="")
  {
  var chValue='08.00'
  }
  else{
  chValue=this.checkInValue
  }
  if(this.timeSheetValue==undefined||this.timeSheetValue==null||this.timeSheetValue=="")
  {
  var tmValue='05.00'
  }
  else{
  tmValue=this.timeSheetValue
  }
  if(this.timeSheetCondition==undefined ||this.timeSheetCondition==null||this.timeSheetCondition==""||this.timeSheetCondition=="0"||this.timeSheetCondition==0)
  
  {
  var tmSheetCondition='<'
  }
  else{
     tmSheetCondition=this.timeSheetCondition

  }
  if(this.checkInCondition==undefined ||this.checkInCondition==null||this.checkInCondition==""||this.checkInCondition=="0"||this.checkInCondition==0)
  {
  var chInCondtion='>'
  }
  else
  {
    chInCondtion=this.checkInCondition

  }
  if(this.conditionStatus==undefined || this.conditionStatus||this.conditionStatus=="")
  {
    var type="and"

  }
  else{
    type=this.conditionStatus
  }
  this.HTTP.getpbiActionableCheckInCheckOutList(date,this.CmpCode,this.departmentId,chValue,chInCondtion,tmValue,tmSheetCondition,type).subscribe(arg => {
  this.Loader=false
  this.checkDate=0
  this.refreshGrid=true
  this.actionableCheckInCheckOutList=  arg.data.table
  console.log('actionableCheckInCheckOutList',arg.data.table)
  if(this.actionableCheckInCheckOutList.length>0){
    this.Loader=false
    this.gridcheck.refreshColumns()
    this.gridcheck.refresh()
    this.gridcheck.dataSource=this.actionableCheckInCheckOutList
  }
  this.change.detectChanges();
  })
  this.Loader=false
 
}
changeProjectStatus(e)
{
  this.projectStatus=e.target.value
  this.getProjectPortFoliyo()
}
selectInshightCheck(e){
if(e.target.value=="roadblock")
{
  this.checkMom=false
  this.checkRoadBlock=true
  this.checkOverDue=false
  this.pbiActionableInsightRoadBlockList()

}
else if (e.target.value=="overdue")
{
  this.checkMom=false
  this.checkRoadBlock=false
  this.checkOverDue=true
  this.pbiActionableInsightOverDueList()


}
else if(e.target.value=="mom")
{
  this.checkMom=true
  this.checkRoadBlock=false
  this.checkOverDue=false
  this.pbiActionableInsightList()
}
}
showMinValue:any
checkMinValue:boolean=false
onSearchChange(a) {
  this.checkMinValue=false
  var e=a.target.value
  if(e.length==1)
  {
  var aa=  0+e+'.00'
  var loggedTime=aa
  this.checkInValue=loggedTime

  }
  if(e.length==2)
  {
   var bb= e+'.00'
loggedTime=bb
this.checkInValue=loggedTime

  }
  var afterDot = e.substr(e.indexOf('.'))
  var Decimal=e.split('.')
  
     if(e.length>2)
     {
      var totalMinute=(Number(Decimal[0])*60+Number(Decimal[1]))

     }
     else{
      var totalMinute=(Number(Decimal[0])*60)

     }
  if(Decimal[0].length===1 && Decimal[1].length===1)
  {
  loggedTime=0+Decimal[0]+'.'+0+Decimal[1]
  }

  if(Decimal[0].length===1 && Decimal[1].length==2)
  {
    if(Number(Decimal[1])>59)
    {
      this.checkMinValue=true
this.showMinValue="Please enter value less than 59 after dot"
    }
    else{
      loggedTime=0+Decimal[0]+'.'+Decimal[1]

    }
  }
  if(Decimal[0].length==2 && Decimal[1].length===1)
  {
  loggedTime=Decimal[0]+'.'+0+Decimal[1]
  }
  if(Decimal[0].length==2 && Decimal[1].length==2)
  {
    loggedTime=Decimal[0]+'.'+Decimal[1]
  }
  this.checkInValue=loggedTime
}
showTimeValue:any
checkTimeValue:boolean=false
onSearchTime(a) {
  this.checkTimeValue=false
  var e=a.target.value
  if(e.length==1)
  {
  var aa=  0+e+'.00'
  var loggedTime=aa
  this.timeSheetValue=loggedTime

  }
  if(e.length==2)
  {
   var bb= e+'.00'
loggedTime=bb
this.timeSheetValue=loggedTime

  }
  var afterDot = e.substr(e.indexOf('.'))
  var Decimal=e.split('.')
  
     if(e.length>2)
     {
      var totalMinute=(Number(Decimal[0])*60+Number(Decimal[1]))

     }
     else{
      var totalMinute=(Number(Decimal[0])*60)

     }
  if(Decimal[0].length===1 && Decimal[1].length===1)
  {
  loggedTime=0+Decimal[0]+'.'+0+Decimal[1]
  }

  if(Decimal[0].length===1 && Decimal[1].length==2)
  {
    if(Number(Decimal[1])>59)
    {
      this.checkTimeValue=true
this.showTimeValue="Please enter value less than 59 after dot"
    }
    else{
      loggedTime=0+Decimal[0]+'.'+Decimal[1]

    }
  }
  if(Decimal[0].length==2 && Decimal[1].length===1)
  {
  loggedTime=Decimal[0]+'.'+0+Decimal[1]
  }
  if(Decimal[0].length==2 && Decimal[1].length==2)
  {
    loggedTime=Decimal[0]+'.'+Decimal[1]
  }
  this.timeSheetValue=loggedTime
  
}
setactionableInsightList:any=[]
setactionableInsightOverDueList:any=[]
actionableInsightOverDueList:any=[]
checkMom:boolean=false
checkRoadBlock:boolean=false
checkOverDue:boolean=false



pbiActionableInsightOverDueList()
{
  // this.Loader=true
  this.overdueGrid=true
  if(this.checkDate==0)
  {
  var date=this.setDate
  }
  else
  {
    date=this.isDate
  }
  if(this.actionableType==""||this.actionableType==undefined||this.actionableType==null)
  {
var type=null
  }
  else{
    var type=this.actionableType
  }
//   if(this.checkInValue==undefined ||this.checkInValue==null||this.checkInValue=="")
//   {
// var chValue=0
//   }
//   else{
// chValue=this.checkInValue
//   }
//   if(this.timeSheetValue==undefined||this.timeSheetValue==null||this.timeSheetValue=="")
//   {
// var tmValue=0
//   }
//   else{
// tmValue=this.timeSheetValue
//   }
//   if(this.timeSheetCondition==undefined ||this.timeSheetCondition==null||this.timeSheetCondition==""||this.timeSheetCondition=="0"||this.timeSheetCondition==0)
  
//   {
// var tmSheetCondition="null"
//   }
//   else{
//      tmSheetCondition=this.timeSheetCondition

//   }
//   if(this.checkInCondition==undefined ||this.checkInCondition==null||this.checkInCondition==""||this.checkInCondition=="0"||this.checkInCondition==0)
// {
// var chInCondtion="null"
// }
// else
// {
//    chInCondtion=this.checkInCondition

// }
this.setactionableInsightOverDueList=[]
this.actionableInsightOverDueList=[]
  this.HTTP.getpbiActionableInsightOverDueList(date,this.CmpCode,this.departmentId,type).subscribe(arg => {
this.Loader=false
//this.refreshGrid=true
    this.actionableInsightOverDueList=  arg.data.table
console.log('actionableInsightOverDueList',arg.data.table)
var newArr = [];
for(var i = 0; i < this.actionableInsightOverDueList.length; i++)
{
  var obj = this.actionableInsightOverDueList[i];
  obj['one'] = obj[1];
  obj['two'] = obj[2];
  obj['three'] = obj[3];
  obj['four'] = obj[4];
  obj['five'] = obj[5];
  obj['six'] = obj[6];
  obj['seven'] = obj[7];
  obj['eight'] = obj[8];
  obj['nine'] = obj[9];
  obj['ten'] = obj[10];
  obj['eleven'] = obj[11];
  obj['twelve'] = obj[12];
  obj['threeten'] = obj[13];
  obj['fourteen'] = obj[14];
  obj['fifteen'] = obj[15];

  obj['sixteen'] = obj[16];
  obj['seventeen'] = obj[17];

  obj['eighteen'] = obj[18];

  obj['nineteen'] = obj[19];
  obj['twenty'] = obj[20];

  obj['twentyone'] = obj[21];

  obj['twentytwo'] = obj[22];
  obj['twentythree'] = obj[23];


  obj['twentyfour'] = obj[24];

  obj['twentyfive'] = obj[25];
  obj['twentysix'] = obj[26];


  obj['twentyseven'] = obj[27];


  obj['twentyeight'] = obj[28];

  obj['twentynine'] = obj[29];
 
  obj['thirty'] = obj[30];
   obj['thirtyone'] = obj[31];





   delete(obj[1]);
   delete(obj[2]);
   delete(obj[3]);
   delete(obj[4]);
   delete(obj[5]);
   delete(obj[6]);
   delete(obj[7]);
   delete(obj[8]);
   delete(obj[9]);
   delete(obj[10]);
   delete(obj[11]);
   delete(obj[12]);
   delete(obj[13]);
   delete(obj[14]);
   delete(obj[15]);
   delete(obj[16]);
   delete(obj[17]);
   delete(obj[18]);
   delete(obj[19]);
  
   delete(obj[20]);
   delete(obj[21]);
   delete(obj[22]);
   delete(obj[23]);
   delete(obj[24]);
   delete(obj[25]);
   delete(obj[26]);
   delete(obj[27]);
   delete(obj[28]);
   delete(obj[29]);
   delete(obj[30]);
   delete(obj[31]);
        
  newArr.push(obj);
}
this.actionableInsightOverDueList=newArr

if(this.actionableInsightOverDueList.length>0)
{
  this.gridsInsightOver.refresh()
  this.gridsInsightOver.refreshColumns()
  this.gridsInsightOver.dataSource=this.actionableInsightOverDueList

}
  })
}
setactionableInsightRoadBlockList:any=[]
actionableInsightRoadBlockList:any=[]
pbiActionableInsightRoadBlockList()
{
  this.setactionableInsightRoadBlockList=[]
  // this.Loader=true
  this.actionableInsightRoadBlockList=[]
  if(this.checkDate==0)
  {
  var date=this.setDate
  }
  else
  {
    date=this.isDate
  }
  if(this.actionableType==""||this.actionableType==undefined||this.actionableType==null)
  {
var type=null
  }
  else{
    var type=this.actionableType
  }
  this.roadGrid=true
//   if(this.checkInValue==undefined ||this.checkInValue==null||this.checkInValue=="")
//   {
// var chValue=0
//   }
//   else{
// chValue=this.checkInValue
//   }
//   if(this.timeSheetValue==undefined||this.timeSheetValue==null||this.timeSheetValue=="")
//   {
// var tmValue=0
//   }
//   else{
// tmValue=this.timeSheetValue
//   }
//   if(this.timeSheetCondition==undefined ||this.timeSheetCondition==null||this.timeSheetCondition==""||this.timeSheetCondition=="0"||this.timeSheetCondition==0)
  
//   {
// var tmSheetCondition="null"
//   }
//   else{
//      tmSheetCondition=this.timeSheetCondition

//   }
//   if(this.checkInCondition==undefined ||this.checkInCondition==null||this.checkInCondition==""||this.checkInCondition=="0"||this.checkInCondition==0)
// {
// var chInCondtion="null"
// }
// else
// {
//    chInCondtion=this.checkInCondition

// }
  this.HTTP.getpbiActionableInsightRaodBlockList(date,this.CmpCode,this.departmentId,type).subscribe(arg => {
this.Loader=false
//this.refreshGrid=true
    this.actionableInsightRoadBlockList=  arg.data.table
console.log('actionableInsightRoadBlockList',arg.data.table)
var newArr = [];
for(var i = 0; i < this.actionableInsightRoadBlockList.length; i++)
{
  var obj = this.actionableInsightRoadBlockList[i];
  obj['one'] = obj[1];
  obj['two'] = obj[2];
  obj['three'] = obj[3];
  obj['four'] = obj[4];
  obj['five'] = obj[5];
  obj['six'] = obj[6];
  obj['seven'] = obj[7];
  obj['eight'] = obj[8];
  obj['nine'] = obj[9];
  obj['ten'] = obj[10];
  obj['eleven'] = obj[11];
  obj['twelve'] = obj[12];
  obj['threeten'] = obj[13];
  obj['fourteen'] = obj[14];
  obj['fifteen'] = obj[15];

  obj['sixteen'] = obj[16];
  obj['seventeen'] = obj[17];

  obj['eighteen'] = obj[18];

  obj['nineteen'] = obj[19];
  obj['twenty'] = obj[20];

  obj['twentyone'] = obj[21];

  obj['twentytwo'] = obj[22];
  obj['twentythree'] = obj[23];


  obj['twentyfour'] = obj[24];

  obj['twentyfive'] = obj[25];
  obj['twentysix'] = obj[26];


  obj['twentyseven'] = obj[27];


  obj['twentyeight'] = obj[28];

  obj['twentynine'] = obj[29];
 
  obj['thirty'] = obj[30];
   obj['thirtyone'] = obj[31];





   delete(obj[1]);
   delete(obj[2]);
   delete(obj[3]);
   delete(obj[4]);
   delete(obj[5]);
   delete(obj[6]);
   delete(obj[7]);
   delete(obj[8]);
   delete(obj[9]);
   delete(obj[10]);
   delete(obj[11]);
   delete(obj[12]);
   delete(obj[13]);
   delete(obj[14]);
   delete(obj[15]);
   delete(obj[16]);
   delete(obj[17]);
   delete(obj[18]);
   delete(obj[19]);
  
   delete(obj[20]);
   delete(obj[21]);
   delete(obj[22]);
   delete(obj[23]);
   delete(obj[24]);
   delete(obj[25]);
   delete(obj[26]);
   delete(obj[27]);
   delete(obj[28]);
   delete(obj[29]);
   delete(obj[30]);
   delete(obj[31]);
        
  newArr.push(obj);
}
this.actionableInsightRoadBlockList=[]
this.actionableInsightRoadBlockList=newArr
if(this.actionableInsightRoadBlockList.length>0)
{
this.gridsInsightRoad.refresh()
this.gridsInsightRoad.refreshColumns()
this.gridsInsightRoad.dataSource=this.actionableInsightRoadBlockList

}

  })
}
actionableInsightList:any=[]
actionableType:any
momGrid:boolean=false
pbiActionableInsightList()
{
  // this.Loader=true
  this.actionableInsightList=[]
  this.setactionableInsightList=[]
  if(this.checkDate==0)
  {
  var date=this.setDate
  }
  else
  {
    date=this.isDate
  }
  if(this.actionableType==""||this.actionableType==undefined||this.actionableType==null)
  {
var type=null
  }
  else{
    var type=this.actionableType
  }
  
//   if(this.checkInValue==undefined ||this.checkInValue==null||this.checkInValue=="")
//   {
// var chValue=0
//   }
//   else{
// chValue=this.checkInValue
//   }
//   if(this.timeSheetValue==undefined||this.timeSheetValue==null||this.timeSheetValue=="")
//   {
// var tmValue=0
//   }
//   else{
// tmValue=this.timeSheetValue
//   }
//   if(this.timeSheetCondition==undefined ||this.timeSheetCondition==null||this.timeSheetCondition==""||this.timeSheetCondition=="0"||this.timeSheetCondition==0)
  
//   {
// var tmSheetCondition="null"
//   }
//   else{
//      tmSheetCondition=this.timeSheetCondition

//   }
//   if(this.checkInCondition==undefined ||this.checkInCondition==null||this.checkInCondition==""||this.checkInCondition=="0"||this.checkInCondition==0)
// {
// var chInCondtion="null"
// }
// else
// {
//    chInCondtion=this.checkInCondition

// }
this.momGrid=true
  this.HTTP.getpbiActionableInsightList(date,this.CmpCode,this.departmentId,type).subscribe(arg => {
this.Loader=false
//this.refreshGrid=
    this.actionableInsightList=  arg.data.table
console.log('actionableInsightList',arg.data.table)

var newArr = [];
for(var i = 0; i < this.actionableInsightList.length; i++)
{
  var obj = this.actionableInsightList[i];
  obj['one'] = obj[1];
  obj['two'] = obj[2];
  obj['three'] = obj[3];
  obj['four'] = obj[4];
  obj['five'] = obj[5];
  obj['six'] = obj[6];
  obj['seven'] = obj[7];
  obj['eight'] = obj[8];
  obj['nine'] = obj[9];
  obj['ten'] = obj[10];
  obj['eleven'] = obj[11];
  obj['twelve'] = obj[12];
  obj['threeten'] = obj[13];
  obj['fourteen'] = obj[14];
  obj['fifteen'] = obj[15];

  obj['sixteen'] = obj[16];
  obj['seventeen'] = obj[17];

  obj['eighteen'] = obj[18];

  obj['nineteen'] = obj[19];
  obj['twenty'] = obj[20];

  obj['twentyone'] = obj[21];

  obj['twentytwo'] = obj[22];
  obj['twentythree'] = obj[23];


  obj['twentyfour'] = obj[24];

  obj['twentyfive'] = obj[25];
  obj['twentysix'] = obj[26];


  obj['twentyseven'] = obj[27];


  obj['twentyeight'] = obj[28];

  obj['twentynine'] = obj[29];
 
  obj['thirty'] = obj[30];
   obj['thirtyone'] = obj[31];

   delete(obj[1]);
   delete(obj[2]);
   delete(obj[3]);
   delete(obj[4]);
   delete(obj[5]);
   delete(obj[6]);
   delete(obj[7]);
   delete(obj[8]);
   delete(obj[9]);
   delete(obj[10]);
   delete(obj[11]);
   delete(obj[12]);
   delete(obj[13]);
   delete(obj[14]);
   delete(obj[15]);
   delete(obj[16]);
   delete(obj[17]);
   delete(obj[18]);
   delete(obj[19]);
  
   delete(obj[20]);
   delete(obj[21]);
   delete(obj[22]);
   delete(obj[23]);
   delete(obj[24]);
   delete(obj[25]);
   delete(obj[26]);
   delete(obj[27]);
   delete(obj[28]);
   delete(obj[29]);
   delete(obj[30]);
   delete(obj[31]);
        
  newArr.push(obj);
}

this.actionableInsightList=newArr
this.Loader=false
if(this.actionableInsightList.length>0)
{
  this.gridsInsight.refresh();
  this.gridsInsight.refreshColumns();
  this.gridsInsight.dataSource=this.actionableInsightList;

}
this.change.detectChanges();
})
this.Loader=false

}

  getDepartmentListDropdown(){
    this.Loader=true
    this.HTTP.getpbiDepartmentList(this.setDate,this.CmpCode).subscribe(arg => {
      this.departmentList=  arg.data.table
      console.log('departmentList',arg.data.table)
      this.Loader=false
    })
  }
  getListProjectInNumber:any=[]
  month:any=[]
  numberProject:any=[]
  venderNumber:any=[]
  projectDetailNumber:any
  setProjectNumberList:any=[]

  getPbiProjectInNumber(){
      let cmpcode=1
      let year='2022-02-20'
      this.getListProjectInNumber=[]
      this.month=[]
      this.numberProject=[]
      this.setProjectNumberList=[]
      this.venderNumber=[]
      this.Loader=true
      this.HTTP.getPbiProjectDetailInNumber(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
this.Loader=false
        this.getListProjectInNumber=  arg.data.table
  console.log('departmentList',arg.data.table)

      var getColor=[]

      for(var i=0;i<this.getListProjectInNumber.length;i++)
      {
        getColor.push(this.setColor[i])
      }
      for(var i=0;i<this.getListProjectInNumber.length;i++)
      {
this.month.push({"label":this.getListProjectInNumber[i].monthNames})
this.numberProject.push({"value":this.getListProjectInNumber[i].employee})
this.venderNumber.push({"value":this.getListProjectInNumber[i].vendor})
//this.venderNumber.push({"label":this.getListProgress[i].monthes,"value":this.getListProgress[i].cost})
    this.setProjectNumberList.push({"label":this.getListProjectInNumber[i].monthNames,"value":this.getListProjectInNumber[i].employee})
}
this.projectDetailNumber = {
  chart: {
    //caption: "Analysing Subsidies by Youth Population",
    //subcaption: "By province",
    yaxisname: "",
    syaxisname: "",
    labeldisplay: "rotate",
    snumbersuffix: "",
    scrollheight: "10",
    numvisibleplot: "10",
    drawcrossline: "1",
    theme: "fusion",
plottooltext:     " $label: <b>$dataValue</b>",
  },
  categories: [
    {
      category:this.month
    }
  ],
  dataset: [
    {
      seriesname: "Projects",
    //  plottooltext: "Employee: $dataValue",
      data:this.numberProject
    },

    // {
    //   seriesname: "Percentage",
    //   parentyaxis: "S",
    //   renderas: "line",
    //   data: this.numberProject
    // }
  ]
};


  // this.projectDetailNumber = {
  //   "chart": {
  //     "theme": "fusion",
  //     "subCaption": " ",
  //     "xAxisName": " ",
  //     "pYAxisName": "  ",
  //     "sYAxisname": " ",
  //     "showValues": "0",
  //     "showXAxisLine": "1",
  //     'paletteColors' :'7bb7ed',
  //     "showLineValues": "1"
  //   },
  //   "data": this.setProjectNumberList
  // };
  //  this.projectDetailNumber = {
  //   "chart": {
  //     "theme": "fusion",
  //     "subCaption": "Last month",
  //     "xAxisName": "Reported Cause",
  //     "pYAxisName": "No. of Occurrence",
  //     "sYAxisname": "Cumulative Percentage",
  //     "showValues": "0",
  //     "showXAxisLine": "1",
  //     'paletteColors' :'7bb7ed',
  //     "showLineValues": "1"
  //   },
  //   "data":this.setProjectNumberList.toString()
  // };

// this.projectDetailNumber = {
//   "chart": {
//     "caption": "Progress & Cost %",
//     'paletteColors' :'7cb5ec',
//     "showHoverEffect": "1",
//     "theme": "fusion"
// },
// "data":this.setList
// };




      })
  }
  getListBuisnessRevenue:any=[]
  monthRevenue:any=[]
  numberRevenue:any=[]
  buisnessRevenue:any
  numberproj:any=[]
  proposeRevenue:any=[]
  avgReveue:any=[]
  
    getPbiBuisinessRevenueList(){
        let cmpcode=1
        let year='2022-02-20'
        this.getListBuisnessRevenue=[]
        this.avgReveue=[]
        this.monthRevenue=[]
        this.proposeRevenue=[]
        this.numberRevenue=[]
        this.numberproj=[]
        this.Loader=true
        this.HTTP.getPbiBuisnessRevenueList(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
  this.Loader=false
          this.getListBuisnessRevenue=  arg.data.table
    console.log('getListBuisnessRevenue',arg.data.table)
  
        var getColor=[]
  
        for(var i=0;i<this.getListBuisnessRevenue.length;i++)
        {
          getColor.push(this.setColor[i])
        }
        for(var i=0;i<this.getListBuisnessRevenue.length;i++)
        {
  this.monthRevenue.push({"label":this.getListBuisnessRevenue[i].monthNames})
  this.numberRevenue.push({"value":this.getListBuisnessRevenue[i].revenue})
  this.proposeRevenue.push({"value":this.getListBuisnessRevenue[i].proposeByRevenue})
  this.avgReveue.push({"value":this.getListBuisnessRevenue[i].avgRevenueByProject})


  this.numberproj.push({"value":this.getListBuisnessRevenue[i].project})
 // this.venderNumber.push({"value":this.getListBuisnessRevenue[i].vendor})
  //this.venderNumber.push({"label":this.getListProgress[i].monthes,"value":this.getListProgress[i].cost})
      //this.setProjectNumberList.push({"label":this.getListBuisnessRevenue[i].monthNames,"value":this.getListProjectInNumber[i].employee})
  }
  this.buisnessRevenue = {
    chart: {
      //caption: "Analysing Subsidies by Youth Population",
      //subcaption: "By province",
      yaxisname: "",
      syaxisname: "",
      labeldisplay: "rotate",
      snumbersuffix: "",
      scrollheight: "10",
      numvisibleplot: "10",
      drawcrossline: "1",
      theme: "fusion",
  plottooltext:     " $label: <b>$dataValue</b>",
    },
    categories: [
      {
        category:this.monthRevenue
      }
    ],
    dataset: [
      // {
      //   seriesname: "Avg Revenue /Projects",
      // //  plottooltext: "Employee: $dataValue",
      //   data:this.avgReveue
      // },
      {
        seriesname: "Proposed Revenue",
        parentyaxis: "S",
        renderas: "line",
      //  plottooltext: "Employee: $dataValue",
        data:this.proposeRevenue
      },
      {
        seriesname: "Projects",
      //  plottooltext: "Employee: $dataValue",
        data:this.numberproj
      },
      
      {
        seriesname: "Revenue",
        parentyaxis: "S",
        renderas: "line",
       // plottooltext: "$dataValue subsidies received",
        //showvalues: "0",
        data: this.numberRevenue
      }
    ]
  };
  
  
    // this.projectDetailNumber = {
    //   "chart": {
    //     "theme": "fusion",
    //     "subCaption": " ",
    //     "xAxisName": " ",
    //     "pYAxisName": "  ",
    //     "sYAxisname": " ",
    //     "showValues": "0",
    //     "showXAxisLine": "1",
    //     'paletteColors' :'7bb7ed',
    //     "showLineValues": "1"
    //   },
    //   "data": this.setProjectNumberList
    // };
    //  this.projectDetailNumber = {
    //   "chart": {
    //     "theme": "fusion",
    //     "subCaption": "Last month",
    //     "xAxisName": "Reported Cause",
    //     "pYAxisName": "No. of Occurrence",
    //     "sYAxisname": "Cumulative Percentage",
    //     "showValues": "0",
    //     "showXAxisLine": "1",
    //     'paletteColors' :'7bb7ed',
    //     "showLineValues": "1"
    //   },
    //   "data":this.setProjectNumberList.toString()
    // };
  
  // this.projectDetailNumber = {
  //   "chart": {
  //     "caption": "Progress & Cost %",
  //     'paletteColors' :'7cb5ec',
  //     "showHoverEffect": "1",
  //     "theme": "fusion"
  // },
  // "data":this.setList
  // };
  
  
  
  
        })
    }
    getListBuisnessAvgRevenue:any=[]
    setBuisinessAvgRevenue:any=[]
    dataspline:any
    getPbiBuisinessAvgRevenueList(){
      let cmpcode=1
      let year='2022-02-20'
      this.getListBuisnessAvgRevenue=[]
      this.setBuisinessAvgRevenue=[]
      this.Loader=true
      this.HTTP.getPbiBuisnessAvgRevenueList(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
this.Loader=false
        this.getListBuisnessAvgRevenue=  arg.data.table
  console.log('getListBuisnessAvgRevenue',arg.data.table)

      var getColor=[]

      for(var i=0;i<this.getListBuisnessAvgRevenue.length;i++)
      {
        getColor.push(this.setColor[i])
      }
      for(var i=0;i<this.getListBuisnessAvgRevenue.length;i++)
      {
//this.monthRevenue.push({"label":this.getListBuisnessRevenue[i].monthNames})
//this.numberRevenue.push({"value":this.getListBuisnessRevenue[i].revenue})
    this.setBuisinessAvgRevenue.push({"label":this.getListBuisnessAvgRevenue[i].monthNames,"value":this.getListBuisnessAvgRevenue[i].avgRevenue})
}
this.dataspline = {
  chart: {
    caption: "",
    yaxisname: "",
    anchorradius: "5",
    plottooltext: "$label is <b>$dataValue</b>",
    showhovereffect: "1",
    showvalues: "0",
    numbersuffix: "",
    theme: "fusion",
    anchorbgcolor: "#72D7B2",
    palettecolors: "#72D7B2"
  },
  data:this.setBuisinessAvgRevenue
};


      })
  }

  getListBuisnessExepnseAndHeadCountAndProject:any=[]
    setBuisinessExpense:any=[]
    setBuisinessHeadCount:any=[]
    setBuisinessProject:any=[]
    monthExpense:any=[]
    dataBuisnessExpenseAndHeadCountAndProject:any
    getPbiBuisinessExpenseAndHeadCountAndProjectList(){
      let cmpcode=1
      let year='2022-02-20'
      this.getListBuisnessExepnseAndHeadCountAndProject=[]
      this.setBuisinessExpense=[]
      this.setBuisinessProject=[]
      this.setBuisinessHeadCount=[]
      this.monthExpense=[]
      this.Loader=true
      this.HTTP.getPbiBuisnessExpenseAndHeadCountAndProjectList(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
this.Loader=false
        this.getListBuisnessExepnseAndHeadCountAndProject=  arg.data.table
  console.log('getListBuisnessExepnseAndHeadCountAndProject',arg.data.table)

      var getColor=[]

      for(var i=0;i<this.getListBuisnessExepnseAndHeadCountAndProject.length;i++)
      {
        getColor.push(this.setColor[i])
      }
      for(var i=0;i<this.getListBuisnessExepnseAndHeadCountAndProject.length;i++)
      {
this.monthExpense.push({"label":this.getListBuisnessExepnseAndHeadCountAndProject[i].monthNames})
this.setBuisinessHeadCount.push({"value":this.getListBuisnessExepnseAndHeadCountAndProject[i].heacCount})
this.setBuisinessProject.push({"value":this.getListBuisnessExepnseAndHeadCountAndProject[i].project})
this.setBuisinessExpense.push({"value":this.getListBuisnessExepnseAndHeadCountAndProject[i].expense})

 

// this.setBuisinessAvgRevenue.push({"label":this.getListBuisnessExepnseAndHeadCountAndProject[i].monthNames,"value":this.getListBuisnessExepnseAndHeadCountAndProject[i].avgRevenue})
}


this.dataBuisnessExpenseAndHeadCountAndProject = {
  chart: {
    caption: "",
    subcaption: "",
    yaxisname: "",
    syaxisname: "",
    labeldisplay: "rotate",
    snumbersuffix: "",
    scrollheight: "10",
    numvisibleplot: "10",
    drawcrossline: "1",
    theme: "fusion"
  },
  categories: [
    {
      category: this.monthExpense
    }
  ],
  dataset: [
   
    {
      seriesname: "Head Count",     
      plottooltext: "Head Count: $dataValue",
      data: this.setBuisinessHeadCount
    },
    {
      seriesname: "Expense",
      renderas: "area",
      parentyaxis: "S",
      showanchors: "0",
      plottooltext: "Expense: $dataValue",
      data: this.setBuisinessExpense
    },
    {
      seriesname: "Project",
     // parentyaxis: "S",
      renderas: "line",
      plottooltext: "Project: $dataValue",
      showvalues: "0",
      data: this.setBuisinessProject
}
  ]
};

      })
  }
  getListProjectInNumberInCost:any=[]
  monthInCost:any=[]
  numberProjectInCost:any=[]
  venderNumberInCost:any=[]
  setProjectNumberListInCost:any=[]
  projectDetailNumberInCost:any
  getPbiProjectInNumberInCost(){
    let cmpcode=1
    let year='2022-02-20'
    this.getListProjectInNumberInCost=[]
    this.monthInCost=[]
    this.numberProjectInCost=[]
    this.venderNumberInCost=[]
    this.Loader=true
    this.HTTP.getPbiProjectDetailInNumberInCost(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
this.Loader=false
      this.getListProjectInNumberInCost=  arg.data.table
  console.log('getListProjectInNumberInCost',arg.data.table)

    var getColor=[]

    for(var i=0;i<this.getListProjectInNumberInCost.length;i++)
    {
      getColor.push(this.setColor[i])
    }
    for(var i=0;i<this.getListProjectInNumberInCost.length;i++)
    {
this.monthInCost.push({"label":this.getListProjectInNumberInCost[i].monthNames})
this.numberProjectInCost.push({"value":this.getListProjectInNumberInCost[i].employee})
this.venderNumberInCost.push({"value":this.getListProjectInNumberInCost[i].vendor})
//this.venderNumber.push({"label":this.getListProgress[i].monthes,"value":this.getListProgress[i].cost})
  this.setProjectNumberListInCost.push({"label":this.getListProjectInNumberInCost[i].monthNames,"value":this.getListProjectInNumberInCost[i].employee})
}

this.projectDetailNumberInCost = {
  chart: {
    //caption: "Analysing Subsidies by Youth Population",
    //subcaption: "By province",
    yaxisname: "",
    syaxisname: "",
    labeldisplay: "rotate",
    snumbersuffix: "",
    scrollheight: "10",
    numvisibleplot: "10",
    drawcrossline: "1",
    theme: "fusion",
plottooltext:     " $label: <b>$dataValue</b>",
  },
  categories: [
    {
      category:this.monthInCost
    }
  ],
  dataset: [
    {
      seriesname: "Projects",
    //  plottooltext: "Employee: $dataValue",
      data:this.numberProjectInCost
    },

    {
      seriesname: "Percentage",
      parentyaxis: "S",
      renderas: "line",
     // plottooltext: "$dataValue subsidies received",
      //showvalues: "0",
      data: this.numberProjectInCost
    }
  ]
};
// this.projectDetailNumberInCost = {
//   "chart": {
//     "theme": "fusion",
//     "subCaption": "",
//     "xAxisName": "",
//     "pYAxisName": "",
//     "sYAxisname": "",
//     "showValues": "0",
//     "showXAxisLine": "1",
//     'paletteColors' :'7bb7ed',
//     "showLineValues": "1"
//   },
//   "data": this.setProjectNumberListInCost
// };
//  this.projectDetailNumber = {
//   "chart": {
//     "theme": "fusion",
//     "subCaption": "Last month",
//     "xAxisName": "Reported Cause",
//     "pYAxisName": "No. of Occurrence",
//     "sYAxisname": "Cumulative Percentage",
//     "showValues": "0",
//     "showXAxisLine": "1",
//     'paletteColors' :'7bb7ed',
//     "showLineValues": "1"
//   },
//   "data":this.setProjectNumberList.toString()
// };

// this.projectDetailNumber = {
//   "chart": {
//     "caption": "Progress & Cost %",
//     'paletteColors' :'7cb5ec',
//     "showHoverEffect": "1",
//     "theme": "fusion"
// },
// "data":this.setList
// };




    })
}
getListProjectInNumberInCostLeave:any=[]
  monthInCostLeave:any=[]
  numberProjectInCostLeave:any=[]
  venderNumberInCostLeave:any=[]
  setProjectNumberListInCostLeave:any=[]
  projectDetailNumberInCostLeave:any
  getPbiProjectInNumberInCostLeave(){
    let cmpcode=1
    let year='2022-02-20'
    this.getListProjectInNumberInCostLeave=[]
    this.monthInCostLeave=[]
    this.numberProjectInCostLeave=[]
    this.venderNumberInCostLeave=[]
    this.setProjectNumberListInCostLeave=[]
    this.Loader=true
    this.HTTP.getPbiProjectDetailInNumberInCostLeave(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
this.Loader=false
      this.getListProjectInNumberInCostLeave=  arg.data.table
  console.log('getListProjectInNumberInCostLeave',arg.data.table)

    var getColor=[]

    for(var i=0;i<this.getListProjectInNumberInCostLeave.length;i++)
    {
      getColor.push(this.setColor[i])
    }
    for(var i=0;i<this.getListProjectInNumberInCostLeave.length;i++)
    {
this.monthInCostLeave.push({"label":this.getListProjectInNumberInCostLeave[i].monthNames})
this.numberProjectInCostLeave.push({"value":this.getListProjectInNumberInCostLeave[i].employee})
this.venderNumberInCostLeave.push({"value":this.getListProjectInNumberInCostLeave[i].vendor})
//this.venderNumber.push({"label":this.getListProgress[i].monthes,"value":this.getListProgress[i].cost})
  this.setProjectNumberListInCostLeave.push({"label":this.getListProjectInNumberInCostLeave[i].monthNames,"value":this.getListProjectInNumberInCostLeave[i].employee})
}
this.projectDetailNumberInCostLeave = {
  chart: {
    //caption: "Analysing Subsidies by Youth Population",
    //subcaption: "By province",
    yaxisname: "",
    syaxisname: "",
    labeldisplay: "rotate",
    snumbersuffix: "",
    scrollheight: "10",
    numvisibleplot: "10",
    drawcrossline: "1",
    theme: "fusion",
plottooltext:     " $label: <b>$dataValue</b>",
  },
  categories: [
    {
      category:this.monthInCostLeave
    }
  ],
  dataset: [
    {
      seriesname: "Projects",
    //  plottooltext: "Employee: $dataValue",
      data:this.venderNumberInCostLeave
    },

    {
      seriesname: "Leaves",
      parentyaxis: "S",
      renderas: "line",
     // plottooltext: "$dataValue subsidies received",
      //showvalues: "0",
      data: this.numberProjectInCostLeave
    }
  ]
};
// this.projectDetailNumberInCostLeave = {
//   "chart": {
//     "theme": "fusion",
//     "subCaption": " ",
//     "xAxisName": " ",
//     "pYAxisName": "  ",
//     "sYAxisname": " ",
//     "showValues": "0",
//     "showXAxisLine": "1",
//     'paletteColors' :'7bb7ed',
//     "showLineValues": "1"
//   },
//   "data": this.setProjectNumberListInCostLeave
// };
//  this.projectDetailNumber = {
//   "chart": {
//     "theme": "fusion",
//     "subCaption": "Last month",
//     "xAxisName": "Reported Cause",
//     "pYAxisName": "No. of Occurrence",
//     "sYAxisname": "Cumulative Percentage",
//     "showValues": "0",
//     "showXAxisLine": "1",
//     'paletteColors' :'7bb7ed',
//     "showLineValues": "1"
//   },
//   "data":this.setProjectNumberList.toString()
// };

// this.projectDetailNumber = {
//   "chart": {
//     "caption": "Progress & Cost %",
//     'paletteColors' :'7cb5ec',
//     "showHoverEffect": "1",
//     "theme": "fusion"
// },
// "data":this.setList
// };




    })
}
  getListProgress:any=[]
  dataProgress:any=[]
  dataprogressandcostproject:any
  dataProjectCostList:any=[]
  dataProjectProgressList:any=[]
  setList:any=[]
  // dataProjectProgressListele = [] 
  getPbiProjectDetailProgressAndCost(data){
      // let cmpcode=1
      let year='2022-02-20'
      this.Loader=true
      this.getListProgress=[]
      this.dataProgress=[]
      this.dataProjectProgressList= undefined
      this.setList=[]
      // this.dataProjectCostList=[]
      let dataForWindow = []
      let dataProjectProgressListele = []
      this.HTTP.getPbiProjectDetailProgressAndCost(this.setDate,this.CmpCode,data,this.departmentId).subscribe(arg => {
      this.getListProgress=  arg.data.table
      this.Loader=false
      var getColor=[]

      for(var i=0;i<this.getListProgress.length;i++)
      {
        getColor.push(this.setColor[i])
      }
      for(var i=0;i<this.getListProgress.length;i++)
      {
        this.dataProgress.push({"label":this.getListProgress[i].monthes})
        dataProjectProgressListele.push({"value":this.getListProgress[i].project})
        dataForWindow.push({"value":this.getListProgress[i].cost})
        this.setList.push({"label":this.getListProgress[i].monthes,"value":this.getListProgress[i].cost})

      }

this.dataProjectProgressList = {
  chart: {
    //caption: "Analysing Subsidies by Youth Population",
    //subcaption: "By province",
    yaxisname: "",
    syaxisname: "",
    labeldisplay: "rotate",
    snumbersuffix: "",
    scrollheight: "10",
    numvisibleplot: "10",
    drawcrossline: "1",
    theme: "fusion",
plottooltext:     " $label: <b>$dataValue</b>",
  },
  categories: [
    {
      category:this.dataProgress
    }
  ],
  dataset: [
    // {
    //   seriesname: "Avg Revenue /Projects",
    // //  plottooltext: "Employee: $dataValue",
    //   data:this.avgReveue
    // },
    {
      seriesname: "Progress",
     
    //  plottooltext: "Employee: $dataValue",
      data: dataProjectProgressListele
    },
    {
      seriesname: "Cost %",
      parentyaxis: "S",
      renderas: "line",
    //  plottooltext: "Employee: $dataValue",
      data:dataForWindow
    },
    
     ]
};
this.change.detectChanges();

})

  }

  getListProjectDetailRoadblock:any=[]
  getpbiProjectDetailRoadblock(data){
      let cmpcode=1
      let year='2022-02-20'
      this.getListProjectDetailRoadblock=[]
      this.Loader=true
      this.HTTP.getPbiProjectDetailRoadBlockList(this.setDate,this.CmpCode,data,this.departmentId).subscribe(arg => {
      this.getListProjectDetailRoadblock=  arg.data.table
  console.log('getListProjectDetailRoadblock',arg.data.table)

      this.Loader=false
      for(var i=0;i<this.getListProjectDetailRoadblock.length;i++)
      {
        if(this.getListProjectDetailRoadblock[i].billableHour==null)
        {
          this.getListProjectDetailRoadblock[i].billableHour=0
        }
        if(this.getListProjectDetailRoadblock[i].nonBillableHour==null)
        {
          this.getListProjectDetailRoadblock[i].nonBillableHour=0

        }
        var tooltipShow="Billable:"+this.getListProjectDetailRoadblock[i].billableHour+", Non-Billable:"+this.getListProjectDetailRoadblock[i].nonBillableHour
        var total=Number(this.getListProjectDetailRoadblock[i].billableHour)+Number(this.getListProjectDetailRoadblock[i].nonBillableHour)
      var billPercent=Number(this.getListProjectDetailRoadblock[i].billableHour)*100/total
      this.getListProjectDetailRoadblock[i].tooltipShow=tooltipShow
      this.getListProjectDetailRoadblock[i].billPercent=billPercent

      var nonBillPercent=Number(this.getListProjectDetailRoadblock[i].nonBillableHour)*100/total
      this.getListProjectDetailRoadblock[i].nonBillPercent=nonBillPercent
      this.getListProjectDetailRoadblock[i].totalHours=total
      if(total==0)
      {
      this.getListProjectDetailRoadblock[i].nonBillPercent=0
      this.getListProjectDetailRoadblock[i].billPercent=0

      }


    }
  if(this.getListProjectDetailRoadblock.length>0)
  {
    this.gridsFor.refresh()
    this.gridsFor.refreshColumns()
    this.gridsFor.dataSource=this.getListProjectDetailRoadblock

  }


      })
  }
  rows(e:any)
  {

  }
  customiseCell(args)
  {
   // if (args.column.field === 'resourceName') {
      if (args.data['inActive'] ==1) {
        args.cell.classList.add('abc');
     // }
    }
  }
  recieptIMg: any
  userImage(item) {
    // <img src="/assets/img/Logo/male.png" style="width: 190px;">
    //if(data.e)
      // this.recieptIMg = `${environment.siteUrl}` + "Uploads/Icon/UploadIcons.png";
      if (item.contribution == 1) {
        this.recieptIMg = "/assets/img/contribute.png"
      }
      else {
        this.recieptIMg = "/assets/img/non-contribute.png"
      }
    return this.recieptIMg
  }

  getListProjectDetailDevialtion:any=[]
  getpbiProjectDevaition(data){
      let cmpcode=1
      let year='2022-02-20'
      this.getListProjectDetailDevialtion=[]
      this.Loader=true
      this.HTTP.getPbiProjectDetailDeviationList(this.setDate,this.CmpCode,data,this.departmentId).subscribe(arg => {
      this.getListProjectDetailDevialtion=  arg.data.table
  console.log('getListProjectDetailDevialtion',arg.data.table)

this.Loader=false
      })
  }

  getListProjectDetailAllTaskList:any=[]
  getpbiProjectDevaitionAllTask(data){
      let cmpcode=1
      let year='2022-02-20'
      this.getListProjectDetailAllTaskList=[]
      this.Loader=true
      this.HTTP.getPbiProjectDetailAllTask(this.setDate,this.CmpCode,data,this.departmentId).subscribe(arg => {
      this.getListProjectDetailAllTaskList=  arg.data.table
  console.log('getListProjectDetailAllTaskList',arg.data.table)

this.Loader=false
      })
  }
  avgMarginCurrentYear:any
      avgMarginPreviousYear:any
      avgMarginCurrentYearGrowth:any
      avgMarginPreviousYearGrowth:any
      avgRevenueCurrentYear:any
avgRevenueCurrentYearGrowth:any
avgRevenuePreviousYear:any
avgRevenuePreviousYearGrowth:any
avgTenureCurrentYear:any
newavgTenureCurrentYear:any
avgTenureCurrentYearGrowth:any
avgTenurePreviousYear:any
avgTenurePreviousYearGrowth:any
netRevenueCurrentYear:any
netRevenueCurrentYearGrowth:any
netRevenuePreviousYear:any
projectCostCurrentYear:any
netRevenuePreviousYearGrowth:any
projectCostCurrentYearGrowth:any
projectCostInDollarCurrentYear:any
projectCostInDollarCurrentYearGrowth:any
projectCostInDollarPerviousYear:any
projectCostInDollarPreviousYearGrowth:any
projectCostPreviousYear:any
projectCostPreviousYearGrowth:any
projectWithAvgMarginCurrentYear:any
projectWithAvgMarginCurrentYearGrowth:any
projectWithAvgMarginPreviousYear:any
projectWithAvgMarginPreviousYearGrowth:any
totalCostCurrentYear:any
totalCostCurrentYearGrowth:any
totalCostPreviouYear:any
totalCostPreviouYearGrowth:any
getprojectDetailPAndLList:any=[]
totalCostPreviouYearGrowthPercent:any
totalCostCurrentYearGrowthPercent:any
projectWithAvgMarginPreviousYearGrowthPercent:any
projectWithAvgMarginCurrentYearGrowthPercent:any
projectCostPreviousYearGrowthPercent:any
avgMarginCurrentYearGrowthPercent:any
avgMarginPreviousYearGrowthPercent:any
avgRevenueCurrentYearGrowthPercent:any
avgRevenuePreviousYearGrowthPercent:any
avgTenureCurrentYearGrowthPercent:any
avgTenurePreviousYearGrowthPercent:any
netRevenueCurrentYearGrowthPercent:any
netRevenuePreviousYearGrowthPercent:any
projectCostCurrentYearGrowthPercent:any
projectCostInDollarPreviousYearGrowthPercent:any
projectCostInDollarCurrentYearGrowthPercent:any
plcurrentYear:any
plpreviousYear:any
avgMarginCurrentYearGrowthPercentimg:any
avgMarginPreviousYearGrowthPercentimg:any
avgRevenueCurrentYearGrowthPercentimg:any
avgRevenuePreviousYearGrowthPercentimg:any
avgTenureCurrentYearGrowthPercentimg:any
avgTenurePreviousYearGrowthPercentimg:any
netRevenueCurrentYearGrowthPercentimg:any
netRevenuePreviousYearGrowthPercentimg:any
projectCostCurrentYearGrowthPercentimg:any
projectCostInDollarCurrentYearGrowthPercentimg:any
projectCostPreviousYearGrowthPercentimg:any
projectWithAvgMarginCurrentYearGrowthPercentimg:any
projectWithAvgMarginPreviousYearGrowthPercentimg:any
totalCostCurrentYearGrowthPercentimg:any
totalCostPreviouYearGrowthPercentimg:any
newavgRevenueCurrentYear:any
newavgRevenueCurrentYearGrowthPercent:any
newavgTenurePreviousYearGrowth:any
newavgTenurePreviousYear:any
newavgTenureCurrentYearGrowth:any
newnetRevenuePreviousYear:any
newnetRevenueCurrentYearGrowth:any
newnetRevenueCurrentYear:any
newnetRevenuePreviousYearGrowth:any
  getpbiProjectDetailPAndLList(){
      let cmpcode=1
      let year='2022-02-20'
      this.getprojectDetailPAndLList=[]
      this.Loader=true
      this.HTTP.getPbiProjectDetailPAndLList(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getprojectDetailPAndLList=  arg.data.table
  console.log('getprojectDetailPAndLList',arg.data.table)

      this.Loader=false
this.plcurrentYear= this.getprojectDetailPAndLList[0].plcurrentYear
this.plpreviousYear= this.getprojectDetailPAndLList[0].plpreviousYear

this.avgRevenueCurrentYear=this.getprojectDetailPAndLList[0].avgRevenueCurrentYear
this.avgRevenueCurrentYearGrowth=this.getprojectDetailPAndLList[0].avgRevenueCurrentYearGrowth
this.newavgRevenueCurrentYear=this.projectCostInDollarCurrentYear/this.projectCostCurrentYear

          this.newavgRevenueCurrentYearGrowthPercent=this.projectCostInDollarCurrentYearGrowth/this.projectCostCurrentYearGrowth
        

this.avgRevenueCurrentYearGrowthPercent=(this.newavgRevenueCurrentYear-this.newavgRevenueCurrentYearGrowthPercent)*100/this.newavgRevenueCurrentYearGrowthPercent
if(this.newavgRevenueCurrentYearGrowthPercent==0)
{
  this.avgRevenueCurrentYearGrowthPercent=0
}

if(this.avgRevenueCurrentYearGrowthPercent>0)
{
  this.avgRevenueCurrentYearGrowthPercentimg=this.downUrl
}
else if(this.avgRevenueCurrentYearGrowthPercent<0){
  this.avgRevenueCurrentYearGrowthPercentimg=this.upUrl
}
this.avgRevenuePreviousYear=this.getprojectDetailPAndLList[0].avgRevenuePreviousYear
this.newavgRevenuePreviousYear=this.projectCostInDollarPerviousYear/this.projectCostPreviousYear
this.newprojectCostPreviousYearGrowthPercent=this.projectCostInDollarPreviousYearGrowth/this.projectCostPreviousYearGrowth

this.avgRevenuePreviousYearGrowth=this.getprojectDetailPAndLList[0].avgRevenuePreviousYearGrowth
this.avgRevenuePreviousYearGrowthPercent=(this.newavgRevenuePreviousYear-this.newprojectCostPreviousYearGrowthPercent)*100/this.newprojectCostPreviousYearGrowthPercent
if(this.newprojectCostPreviousYearGrowthPercent==0)
{
  this.avgRevenuePreviousYearGrowthPercent=0
}
if(this.avgRevenuePreviousYearGrowthPercent>0)
{
  this.avgRevenuePreviousYearGrowthPercentimg=this.downUrl
}
else if(this.avgRevenuePreviousYearGrowthPercent<0){
  this.avgRevenuePreviousYearGrowthPercentimg=this.upUrl
}
this.avgTenureCurrentYear=this.getprojectDetailPAndLList[0].avgTenureCurrentYear
this.newavgTenureCurrentYear=this.avgTenureCurrentYear; ///this.projectCostCurrentYear
this.avgTenurePreviousYear=this.getprojectDetailPAndLList[0].avgTenurePreviousYear

this.avgTenureCurrentYearGrowth=this.getprojectDetailPAndLList[0].avgTenureCurrentYearGrowth

this.newavgTenureCurrentYearGrowth=this.avgTenureCurrentYearGrowth///this.projectCostCurrentYearGrowth
// this.avgTenureCurrentYearGrowthPercent=(this.newavgTenureCurrentYear-this.newavgTenureCurrentYearGrowth)*100/this.newavgTenureCurrentYearGrowth
// if(this.newavgTenureCurrentYearGrowth==0)
// {
  // this.avgTenureCurrentYearGrowthPercent=0
// }
// if(this.avgTenureCurrentYearGrowthPercent>0)
// {
//   this.avgTenureCurrentYearGrowthPercentimg=this.downUrl
// }
// else if(this.avgTenureCurrentYearGrowthPercent<0){
//   this.avgTenureCurrentYearGrowthPercentimg=this.upUrl
// }



this.avgTenurePreviousYearGrowth= this.getprojectDetailPAndLList[0].avgTenurePreviousYearGrowth


this.newavgTenurePreviousYear= this.getprojectDetailPAndLList[0].projectCostPreviousYear
this.newavgTenurePreviousYearGrowth=this.avgTenurePreviousYearGrowth;///this.projectCostInDollarPreviousYearGrowth
if(this.projectCostInDollarPreviousYearGrowth==0)
{
  this.newavgTenurePreviousYearGrowth=0
}
// this.avgTenurePreviousYearGrowthPercent=(this.newavgTenurePreviousYear-this.newavgTenurePreviousYearGrowth)*100/this.newavgTenurePreviousYearGrowth

// if(this.newavgTenurePreviousYearGrowth==0)
// {
//   this.avgTenurePreviousYearGrowthPercent=0
// }
// if(this.avgTenurePreviousYearGrowthPercent>0)
// {
//   this.avgTenurePreviousYearGrowthPercentimg=this.downUrl
// }
// else if(this.avgTenurePreviousYearGrowthPercent<0){
//   this.avgTenurePreviousYearGrowthPercentimg=this.upUrl
// }
this.totalCostPreviouYear=this.getprojectDetailPAndLList[0].totalCostPreviouYear
this.totalCostPreviouYearGrowth=this.getprojectDetailPAndLList[0].totalCostPreviouYearGrowth

this.totalCostPreviouYearGrowthPercent=(this.totalCostPreviouYear-this.totalCostPreviouYearGrowth)*100/this.totalCostPreviouYearGrowth
if(this.totalCostPreviouYearGrowth==0)
{
  this.totalCostPreviouYearGrowthPercent=0
}
if(this.totalCostPreviouYearGrowthPercent>0)
{
  this.totalCostPreviouYearGrowthPercentimg=this.downUrl
}
else if(this.totalCostPreviouYearGrowthPercent<0){
  this.totalCostPreviouYearGrowthPercentimg=this.upUrl
}

      
this.netRevenuePreviousYear=this.getprojectDetailPAndLList[0].netRevenuePreviousYear
debugger
this.newnetRevenuePreviousYear=this.netRevenuePreviousYear-this.totalCostPreviouYear
this.netRevenuePreviousYearGrowth=this.getprojectDetailPAndLList[0].netRevenuePreviousYearGrowth
this.newnetRevenuePreviousYearGrowth=this.netRevenuePreviousYearGrowth-this.totalCostPreviouYearGrowth


this.netRevenuePreviousYearGrowthPercent=(this.newnetRevenuePreviousYear-this.newnetRevenuePreviousYearGrowth)*100/this.newnetRevenuePreviousYearGrowth
console.log('netRevenuePreviousYearGrowthPercent',this.netRevenuePreviousYearGrowthPercent)
if(this.newnetRevenuePreviousYearGrowth==0)
{
  this.netRevenuePreviousYearGrowthPercent=0
}
if(this.netRevenuePreviousYearGrowthPercent>0)
{
  this.netRevenuePreviousYearGrowthPercentimg=this.downUrl
}
else if(this.netRevenuePreviousYearGrowthPercent<0){
  this.netRevenuePreviousYearGrowthPercentimg=this.upUrl
}

this.projectCostCurrentYear=this.getprojectDetailPAndLList[0].projectCostCurrentYear
this.projectCostCurrentYearGrowth=this.getprojectDetailPAndLList[0].projectCostCurrentYearGrowth
this.projectCostCurrentYearGrowthPercent=(this.projectCostCurrentYear-this.projectCostCurrentYearGrowth)*100/this.projectCostCurrentYearGrowth
if(this.projectCostCurrentYearGrowth==0)
{
  this.projectCostCurrentYearGrowthPercent=0
}
if(this.projectCostCurrentYearGrowthPercent>0)
{
  this.projectCostCurrentYearGrowthPercentimg=this.downUrl
}
else if(this.projectCostCurrentYearGrowthPercent<0){
  this.projectCostCurrentYearGrowthPercentimg=this.upUrl
}
this.projectCostInDollarCurrentYear=this.getprojectDetailPAndLList[0].projectCostInDollarCurrentYear
this.projectCostInDollarCurrentYearGrowth=this.getprojectDetailPAndLList[0].projectCostInDollarCurrentYearGrowth

this.projectCostInDollarCurrentYearGrowthPercent=(this.projectCostInDollarCurrentYear-this.projectCostInDollarCurrentYearGrowth)*100/this.projectCostInDollarCurrentYearGrowth
if(this.projectCostInDollarCurrentYearGrowth==0)
{
  this.projectCostInDollarCurrentYearGrowthPercent=0
}
if(this.projectCostInDollarCurrentYearGrowthPercent>0)
{
  this.projectCostInDollarCurrentYearGrowthPercentimg=this.downUrl
}
else if(this.projectCostInDollarCurrentYearGrowthPercent<0)

{
  this.projectCostInDollarCurrentYearGrowthPercentimg=this.upUrl
}

this.projectCostInDollarPerviousYear=this.getprojectDetailPAndLList[0].projectCostInDollarPerviousYear
this.projectCostInDollarPreviousYearGrowth=this.getprojectDetailPAndLList[0].projectCostInDollarPreviousYearGrowth
this.projectCostInDollarPreviousYearGrowthPercent=(this.projectCostInDollarPerviousYear-this.projectCostInDollarPreviousYearGrowth)*100/this.projectCostInDollarPreviousYearGrowth
if(this.projectCostInDollarPreviousYearGrowth==0)
{
  this.projectCostInDollarPreviousYearGrowthPercent=0
}
if(this.projectCostInDollarCurrentYearGrowthPercent>0)
{
  this.projectCostInDollarCurrentYearGrowthPercentimg=this.downUrl
}
else if(this.projectCostInDollarCurrentYearGrowthPercent<0){
  this.projectCostInDollarCurrentYearGrowthPercentimg=this.upUrl
}
this.projectCostPreviousYear=this.getprojectDetailPAndLList[0].projectCostPreviousYear
this.projectCostPreviousYearGrowth=this.getprojectDetailPAndLList[0].projectCostPreviousYearGrowth
this.projectCostPreviousYearGrowthPercent=(this.projectCostPreviousYear-this.projectCostPreviousYearGrowth)*100/this.projectCostPreviousYearGrowth
if(this.projectCostPreviousYearGrowth==0)
{
  this.projectCostPreviousYearGrowthPercent=0
}
if(this.projectCostPreviousYearGrowthPercent>0)
{
  this.projectCostPreviousYearGrowthPercentimg=this.downUrl
}
else if(this.projectCostPreviousYearGrowthPercent<0){
  this.projectCostPreviousYearGrowthPercentimg=this.upUrl
}

this.projectWithAvgMarginCurrentYear=this.getprojectDetailPAndLList[0].projectWithAvgMarginCurrentYear
this.projectWithAvgMarginCurrentYearGrowth=this.getprojectDetailPAndLList[0].projectWithAvgMarginCurrentYearGrowth
this.projectWithAvgMarginCurrentYearGrowthPercent=(this.projectWithAvgMarginCurrentYear-this.projectWithAvgMarginCurrentYearGrowth)*100/this.projectWithAvgMarginCurrentYearGrowth
if(this.projectWithAvgMarginCurrentYearGrowth==0)
{
  this.projectWithAvgMarginCurrentYearGrowthPercent=0
}
if(this.projectWithAvgMarginCurrentYearGrowthPercent>0)
{
  this.projectWithAvgMarginCurrentYearGrowthPercentimg=this.downUrl
}
else if(this.projectWithAvgMarginCurrentYearGrowthPercent<0){
  this.projectWithAvgMarginCurrentYearGrowthPercentimg=this.upUrl
}
this.projectWithAvgMarginPreviousYear=this.getprojectDetailPAndLList[0].projectWithAvgMarginPreviousYear
this.projectWithAvgMarginPreviousYearGrowth=this.getprojectDetailPAndLList[0].projectWithAvgMarginPreviousYearGrowth
this.projectWithAvgMarginPreviousYearGrowthPercent=(this.projectWithAvgMarginPreviousYear-this.projectWithAvgMarginPreviousYearGrowth)*100/this.projectWithAvgMarginPreviousYearGrowth
if(this.projectWithAvgMarginPreviousYearGrowth==0)
{
  this.projectWithAvgMarginPreviousYearGrowthPercent=0
}
if(this.projectWithAvgMarginPreviousYearGrowthPercent>0)
{
  this.projectWithAvgMarginPreviousYearGrowthPercentimg=this.downUrl
}
else if(this.projectWithAvgMarginPreviousYearGrowthPercent<0){
  this.projectWithAvgMarginPreviousYearGrowthPercentimg=this.upUrl
}


this.totalCostCurrentYear=this.getprojectDetailPAndLList[0].totalCostCurrentYear
this.totalCostCurrentYearGrowth=this.getprojectDetailPAndLList[0].totalCostCurrentYearGrowth
this.totalCostCurrentYearGrowthPercent=(this.totalCostCurrentYear-this.totalCostCurrentYearGrowth)*100/this.totalCostCurrentYearGrowth
this.netRevenueCurrentYear= this.getprojectDetailPAndLList[0].netRevenueCurrentYear
this.newnetRevenueCurrentYear=this.netRevenueCurrentYear-this.totalCostCurrentYear
this.netRevenueCurrentYearGrowth=this.getprojectDetailPAndLList[0].netRevenueCurrentYearGrowth
this.newnetRevenueCurrentYearGrowth=this.netRevenueCurrentYear-this.totalCostCurrentYearGrowth
this.netRevenueCurrentYearGrowthPercent=(this.newnetRevenueCurrentYear-this.newnetRevenueCurrentYearGrowth)*100/this.newnetRevenueCurrentYearGrowth
if(this.netRevenueCurrentYearGrowth==0)
{
  this.netRevenueCurrentYearGrowthPercent=0
}
if(this.netRevenueCurrentYearGrowthPercent>0)
{
  this.netRevenueCurrentYearGrowthPercentimg=this.downUrl
}
else if(this.netRevenueCurrentYearGrowthPercent<0){
  this.netRevenueCurrentYearGrowthPercentimg=this.upUrl
}


if(this.totalCostCurrentYearGrowth==0)
{
  this.totalCostCurrentYearGrowthPercent=0
}


if(this.totalCostCurrentYearGrowthPercent>0)
{
  this.totalCostCurrentYearGrowthPercentimg=this.downUrl
}
else if(this.totalCostCurrentYearGrowthPercent<0){
  this.totalCostCurrentYearGrowthPercentimg=this.upUrl
}
this.avgMarginPreviousYear=(this.totalCostPreviouYear-this.newnetRevenuePreviousYear)*100/this.newnetRevenuePreviousYear
  this.avgMarginPreviousYearGrowth=(this.totalCostPreviouYearGrowth-this.newnetRevenuePreviousYearGrowth)*100/this.newnetRevenuePreviousYearGrowth
      this.avgMarginPreviousYearGrowthPercent=(this.avgMarginPreviousYear-this.avgMarginPreviousYearGrowth)*100/this.avgMarginPreviousYearGrowth
     
    //this.avgMarginPreviousYear=this.getprojectDetailPAndLList[0].avgMarginPreviousYear

if(this.avgMarginPreviousYearGrowth==0)
{
  this.avgMarginPreviousYearGrowthPercent=0
}
if(this.avgMarginPreviousYearGrowthPercent>0)
{
  this.avgMarginPreviousYearGrowthPercentimg=this.downUrl
}
else if(this.avgMarginPreviousYearGrowthPercent<0){
  this.avgMarginPreviousYearGrowthPercentimg=this.upUrl
}
this.avgMarginCurrentYear=(this.totalCostCurrentYear-this.totalCostCurrentYearGrowthPercent)*100/this.totalCostCurrentYearGrowthPercent
    
    
//this.avgMarginCurrentYear= this.getprojectDetailPAndLList[0].avgMarginCurrentYear
//this.avgMarginCurrentYearGrowth=this.getprojectDetailPAndLList[0].avgMarginCurrentYearGrowth

this.avgMarginCurrentYearGrowth=(this.totalCostCurrentYearGrowth-this.newnetRevenueCurrentYearGrowth)*100/this.newnetRevenueCurrentYearGrowth
if(this.netRevenueCurrentYearGrowth==0)
{
  this.avgMarginCurrentYearGrowth=0
}
this.avgMarginCurrentYearGrowthPercent=(this.avgMarginCurrentYear-this.avgMarginCurrentYearGrowth)*100/this.avgMarginCurrentYearGrowth
if(this.avgMarginCurrentYearGrowth==0)
{
  this.avgMarginCurrentYearGrowthPercent=0
}

if(this.avgMarginCurrentYearGrowthPercent>0)
{
  this.avgMarginCurrentYearGrowthPercentimg=this.downUrl
}
else if(this.avgMarginCurrentYearGrowthPercent<0){
  this.avgMarginCurrentYearGrowthPercentimg=this.upUrl
}

    
    
    
    })
  }
  getListExpense:any=[]
  dataExpenselist:any=[]
  newavgRevenuePreviousYear:any
  dataexpenselist:any
  newprojectCostPreviousYearGrowthPercent:any
 
  getpbiExpense(){
      let cmpcode=1
      let year='2022-02-20'
      this.getListExpense=[]
      this.dataExpenselist=[]
      this.Loader=true
      this.HTTP.getpbiExpenseListData(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getListExpense=  arg.data.table
  console.log('getListExpense',arg.data.table)

      this.Loader=false
      var getColor=[]

      for(var i=0;i<5;i++)
      {
        getColor.push(this.setColor[i])
      }
      var sum=0
//       for(var i=0;i<5;i++)
//       {
//     sum=this.getListExpense[i].designationId
// this.dataExpenselist.push({"label":this.getListExpense[i].designationName,"value":this.getListExpense[i].designationId})
//       }
// this.dataExpenselist.push({"label":'Other','value':100-sum})

if(this.getListExpense.length>5)
{
  for(var i=0;i<5;i++)
{
 this.dataExpenselist.push({"label":this.getListExpense[i].designationName,"value":this.getListExpense[i].designationId,tooltext: this.getListExpense[i].designationName+": "+this.currencyName+" "+ this.decimalFormat(this.getListExpense[i].amount)})

}
for(var j=0;j<this.getListExpense.length;j++)
{
  if(j>=5)
  {
 sum+=this.getListExpense[j].designationId


  }

}
this.dataExpenselist.push({"label":'Other','value':sum})
}

else
{
for(var i=0;i<this.getListExpense.length;i++)
{

this.dataExpenselist.push({"label":this.getListExpense[i].designationName,"value":this.getListExpense[i].designationId})


}
}
      this.dataexpenselist = {
        chart: {
          "numberPrefix": "",
          "bgColor": "#ffffff",
          "startingAngle": "100",
          "showLegend": "1",

          "defaultCenterLabel": "",
        "centerLabel": " $label: $value",
          "centerLabelBold": "1",
          "showTooltip": "1",
          "decimals": "0",
          'paletteColors' :getColor.toString(),
          "theme": "fusion"
        },
        "data": this.dataExpenselist
      };



      })
  }
  getListSpenderWise:any=[]
  dataSpenderWise:any=[]
  dataspenderwise:any
  columnList:any=[]
  rowList:any=[]
  dataExact:any
  top1:any
  top2:any
  top3:any
  top:any
testList:any=[]
checkAny:any=[]

  getpbiSpenderWise(){
    let cmpcode=1
    let year='2022-02-20'
    this.getListSpenderWise=[]
    this.dataSpenderWise=[]
    this.columnList=[]
    this.rowList=[]
    this.Loader=true
    this.HTTP.getPbiExpenseSpenderWise(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
this.Loader=false
      this.getListSpenderWise=  arg.data.table
console.log('getListSpenderWise',arg.data.table)

    var getColor=[]

    for(var i=0;i<this.getListSpenderWise.length;i++)
    {
      getColor.push(this.setColor[i])
    }
    var sum=0
    for(var i=0;i<this.getListSpenderWise.length;i++)
    {
      var a1
      a1=this.getListSpenderWise[0].amount
    var b1=this.getListSpenderWise[1].amount
      var c1=this.getListSpenderWise[2].amount
      this.top1=a1/a1+b1+c1
      this.top2=b1/a1+b1+c1
      this.top3=c1/a1+b1+c1

      //this.top4=this.getListSpenderWise[3].amount



this.dataSpenderWise.push({"label":this.getListSpenderWise[i].firstname+'<br/>'+this.getListSpenderWise[i].amount.toFixed(2)+'<br/>'+this.getListSpenderWise[i].percentage.toFixed(2)+'%',
"svalue":this.getListSpenderWise[i].percentage.toFixed(2),
"value":this.getListSpenderWise[i].amount.toFixed(2)})
sum+=this.getListSpenderWise[i].amount
this.columnList.push({"id":this.getListSpenderWise[i].percentage,"label":this.getListSpenderWise[i].percentage})
this.rowList.push({"id":this.getListSpenderWise[i].firstname,"label":""})

}
this.testList= {
data: [
  {
    label: "",
    value: sum+sum+sum,
    data: [
      {
        label: "",
        value:sum,
        data:this.dataSpenderWise
      }
    ]
  }
],
colorrange: {
  mapbypercent: "0",
  gradient: "1",
  minvalue: "0",
  code: "#62B58F",
  startlabel: "Ideal",
  endlabel: "Threshold",
  color: [
    {
      code: "#FFC533",
      maxvalue: "50"
    },
    {
      code: "#F2726F",
      maxvalue: "100",
      label: "Threshold"
    }
  ]
},
chart: {

  "caption": "",
  "subcaption": "",
  "animation": "0",
  "plotToolText": "<div><b>$label</b><br/></div>",
  //<b>Percentage: </b>$svalue%</div>",
  "horizontalPadding": "0",
  "verticalPadding": "0",
  "plotborderthickness": ".5",
  "plotbordercolor": "b3b3b3",
  "chartBottomMargin": "0",
  "labelGlow": "0",
  "showLegend": "1",
  "legendpadding": "0",
  "legenditemfontcolor": "4b4b4b",
  "legendScaleLineThickness": "0",
  "legendCaptionFontSize": "10",
  "legendCaptionFontBold": "1",
  "legendspreadfactor": ".7",
  "legendaxisbordercolor": "bfbfbf",
  "labelFontColor": "000000",
  "labelFontSize": "9",
  "showchildlabels": "1",
  "algorithm": "sliceanddice",
  "slicingmode": "alternate",
  "theme": "fusion",
  "legendCaption": ""
  // algorithm: "",
  // caption: "",
  // subcaption: "",
  // theme: "fusion",
  // legendcaption: "",
  // plottooltext:
  //   "<b>$label</b><br>Percentage: <b>$sValue %</b><br>Amount<b>$dataValue rs</b>"
}
};



this.dataspenderwise = {
  colorrange: {
    gradient: "1",
    minvalue: "0",
    startlabel: "Poor",
    palettecolors: "#002d57, #59748f",
    'paletteColors' :'002d57, 59748f',
    endlabel: "Outstanding"
  },
  dataset: [
    {
      data: this.dataSpenderWise
    }
  ],
  columns: {
    column: this.columnList
  },
  rows: {
    row: this.rowList
  },
  chart: {
    theme: "fusion",
    caption: "",
    subcaption: "",
    xaxisname: "",
    yaxisname: "",
    showvalues: "1",
    valuefontcolor: "#ffffff",
    algorithm:"sliceanddice",
    slicingmode: "horizontal",
    plottooltext: "$rowlabel's $columnlabel grading score: <b>$value</b>",

  }
};

this.dataExact = {
  colorrange: {
    gradient: "1",
    minvalue: "0",
    startlabel: "Poor",
    palettecolors: "#002d57, #59748f",
    'paletteColors' :'002d57, 59748f',
    endlabel: "Outstanding"
  },
  dataset: [
    {
      data: [
        {
          rowid: "JA",
          columnid: "EN",
          value: "3.7"
        },
        {
          rowid: "JA",
          columnid: "PY",
          value: "4.3"
        },
        {
          rowid: "JA",
          columnid: "MT",
          value: "4.0"
        },
        {
          rowid: "JA",
          columnid: "HS",
          value: "3.3"
        },
        {
          rowid: "JA",
          columnid: "EC",
          value: "3.1"
        },
        {
          rowid: "EM",
          columnid: "EN",
          value: "3.6"
        },
        {
          rowid: "EM",
          columnid: "PY",
          value: "4.0"
        },
        {
          rowid: "EM",
          columnid: "MT",
          value: "3.2"
        },
        {
          rowid: "EM",
          columnid: "HS",
          value: "2.6"
        },
        {
          rowid: "EM",
          columnid: "EC",
          value: "3.2"
        },
        {
          rowid: "JY",
          columnid: "EN",
          value: "3.8"
        },
        {
          rowid: "JY",
          columnid: "PY",
          value: "4.1"
        },
        {
          rowid: "JY",
          columnid: "MT",
          value: "3.9"
        },
        {
          rowid: "JY",
          columnid: "HS",
          value: "2.6"
        },
        {
          rowid: "JY",
          columnid: "EC",
          value: "2"
        },
        {
          rowid: "WL",
          columnid: "EN",
          value: "3.4"
        },
        {
          rowid: "WL",
          columnid: "PY",
          value: "3.2"
        },
        {
          rowid: "WL",
          columnid: "MT",
          value: "4"
        },
        {
          rowid: "WL",
          columnid: "HS",
          value: "2.5"
        },
        {
          rowid: "WL",
          columnid: "EC",
          value: "3.1"
        }
      ]
    }
  ],
  columns: {
    column: [
      {
        id: "EN",
        label: "English"
      },
      {
        id: "MT",
        label: "Maths"
      },
      {
        id: "PY",
        label: "Physics"
      },
      {
        id: "HS",
        label: "History"
      },
      {
        id: "EC",
        label: "Economics"
      }
    ]
  },
  rows: {
    row: [
      {
        id: "JA",
        label: ""
      },
      {
        id: "EM",
        label: ""
      },
      {
        id: "JY",
        label: ""
      },
      {
        id: "WL",
        label: ""
      }
    ]
  },
  chart: {
    theme: "fusion",
    caption: "",
    subcaption: "",
    xaxisname: "",
    yaxisname: "",
    showvalues: "1",
    valuefontcolor: "#ffffff",
    plottooltext: "$rowlabel's $columnlabel grading score: <b>$value</b>"
  }
};









})
}
expenseClick(){
  let eleList = document.getElementsByTagName("rect")
}

getListComerWise:any=[]
dataCustomerWise:any=[]
getpbiCustomerWise(){
  let cmpcode=1
  let year='2022-02-20'
  this.getListComerWise=[]
  this.dataCustomerWise=[]
  this.columnList=[]
  this.rowList=[]
  this.Loader=true
  this.HTTP.getPbiExpenseCustomerWise(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
this.Loader=false
    this.getListComerWise=  arg.data.table
console.log('getListSpenderWise',arg.data.table)

  var getColor=[]

  for(var i=0;i<this.getListComerWise.length;i++)
  {
    getColor.push(this.setColor[i])
  }
  var sum=0
  for(var i=0;i<this.getListComerWise.length;i++)
  {

this.dataCustomerWise.push({"label":this.getListComerWise[i].firstname+'<br/>'+this.getListComerWise[i].amount.toFixed(2)+'<br/>'+this.getListComerWise[i].percentage.toFixed(2)+'%',
"svalue":this.getListComerWise[i].percentage.toFixed(2),
"value":this.getListComerWise[i].amount.toFixed(2)})
sum+=this.getListComerWise[i].amount.toFixed(2)

}
this.checkAny= {
data: [
{
  label: "",
  value: sum+sum+sum,
  data: [
    {
      label: "",
      value:sum,
      data:this.dataCustomerWise
    }
  ]
}
],
colorrange: {
mapbypercent: "0",
gradient: "1",
minvalue: "0",
code: "#62B58F",
startlabel: "Ideal",
endlabel: "Threshold",
color: [
  {
    code: "#FFC533",
    maxvalue: "50"
  },
  {
    code: "#F2726F",
    maxvalue: "100",
    label: "Threshold"
  }
]
},
chart: {

"caption": "",
"subcaption": "",
"animation": "0",
"plotToolText": "<div><b>$label</b><br/></div>",
//<b>Percentage: </b>$svalue%</div>",
"horizontalPadding": "0",
"verticalPadding": "0",
"plotborderthickness": ".5",
"plotbordercolor": "b3b3b3",
"chartBottomMargin": "0",
"labelGlow": "0",
"showLegend": "1",
"legendpadding": "0",
"legenditemfontcolor": "4b4b4b",
"legendScaleLineThickness": "0",
"legendCaptionFontSize": "10",
"legendCaptionFontBold": "1",
"legendspreadfactor": ".7",
"legendaxisbordercolor": "bfbfbf",
"labelFontColor": "000000",
"labelFontSize": "9",
"showchildlabels": "1",
"algorithm": "sliceanddice",
"slicingmode": "alternate",
"theme": "fusion",
"legendCaption": ""
// algorithm: "",
// caption: "",
// subcaption: "",
// theme: "fusion",
// legendcaption: "",
// plottooltext:
//   "<b>$label</b><br>Percentage: <b>$sValue %</b><br>Amount<b>$dataValue rs</b>"
}
};















})
}

  getListDesignation:any=[]
  dataDesignation:any=[]
  datades31:any
  getpbiPeopleDesignation(){
      let cmpcode=1
      let year='2022-02-20'
      this.dataDesignation=[]
      this.getListDesignation=[]
      this.Loader=true
      this.HTTP.getPbiReportDesignation(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getListDesignation=  arg.data.table
  console.log('getListDesignation',arg.data.table)

      this.Loader=false
      var getColor=[]
var sum=0
      for(var i=0;i<this.getListDesignation.length;i++)
      {
        getColor.push(this.setColor[i])
      }
      if(this.getListDesignation.length>5)
      {
        for(var i=0;i<5;i++)
      {

this.dataDesignation.push({"label":this.getListDesignation[i].designationName,"value":this.getListDesignation[i].designationId})
      }
      for(var j=0;j<this.getListDesignation.length;j++)
      {
        if(j>=5)
        {
          sum+=this.getListDesignation[j].designationId

        }

      }
this.dataDesignation.push({"label":'Other','value':sum})
      }

else
{
  for(var i=0;i<this.getListDesignation.length;i++)
  {

this.dataDesignation.push({"label":this.getListDesignation[i].designationName,"value":this.getListDesignation[i].designationId})
  }
}

      this.datades31 = {
        chart: {
          "numberPrefix": "",
          "bgColor": "#ffffff",
          "startingAngle": "100",
          "showLegend": "1",

          "defaultCenterLabel": "",
        "centerLabel": " $label: $value",
          "centerLabelBold": "1",
          "showTooltip": "0",
          "decimals": "0",
          'paletteColors' :getColor.toString(),
          "theme": "fusion"
        },
        "data": this.dataDesignation
      };



      })
  }
  dataCategory:any=[]
  getListCategory:any=[]
  dataprojectCategory:any
  getpbiExpenseProjectCategory(){
    let cmpcode=1
    let year='2022-02-20'
    this.dataCategory=[]
    this.getListCategory=[]
    this.Loader=true
    this.HTTP.getPbiBuisnessCategoryList(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
    this.getListCategory=  arg.data.table
console.log('getListDesignation',arg.data.table)

    this.Loader=false
    var getColor=[]
var sum=0
    for(var i=0;i<this.getListCategory.length;i++)
    {
      getColor.push(this.setColor[i])
    }
    if(this.getListCategory.length>5)
    {
      for(var i=0;i<5;i++)
    {

this.dataCategory.push({"label":this.getListCategory[i].categoryName,"value":this.getListCategory[i].categoryId})
    }
    for(var j=0;j<this.getListCategory.length;j++)
    {
      if(j>=5)
      {
        sum+=this.getListCategory[j].categoryId

      }

    }
this.dataCategory.push({"label":'Other','value':sum})
    }

else
{
for(var i=0;i<this.getListCategory.length;i++)
{
  this.dataCategory.push({"label":this.getListCategory[i].categoryName,"value":this.getListCategory[i].categoryId})

}
}

    this.dataprojectCategory = {
      chart: {
        "numberPrefix": "",
        "bgColor": "#ffffff",
        "showLegend": "1",

        "defaultCenterLabel": "",
      "centerLabel": " $label: $value",
        "centerLabelBold": "1",
        "showTooltip": "1",
        "decimals": "0",
        "showlabels": "0",
        'paletteColors' :getColor.toString(),
        "theme": "fusion"
      },
      "data": this.dataCategory
    };


    this.change.detectChanges();
    })
}
dataDeployee:any=[]
getListDeployee:any=[]
dataExpenseDeployee:any
getpbiExpenseDeployee(){
  let cmpcode=1
  let year='2022-02-20'
  this.dataDeployee=[]
  this.getListDeployee=[]
  this.Loader=true
  this.HTTP.getPbiBuisnessDeployeeList(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
  this.getListDeployee=  arg.data.table
console.log('getListDeployee',arg.data.table)

  this.Loader=false
  var getColor=[]
var sum=0
  for(var i=0;i<this.getListDeployee.length+1;i++)
  {
    getColor.push(this.setColor[i])
  }

this.dataDeployee.push(
  {"label":'On Bench',"value":this.getListDeployee[0].onbench},
  {"label":'Deployed',"value":this.getListDeployee[0].deployeed}
  
  
  )
 



  this.dataExpenseDeployee = {
    chart: {
      "numberPrefix": "",
      "bgColor": "#ffffff",
      "startingAngle": "100",
      "showLegend": "1",
      "showlabels": "0",

      "defaultCenterLabel": "",
    "centerLabel": " $label: $value",
      "centerLabelBold": "1",
      "showTooltip": "1",
      "decimals": "0",
      'paletteColors' :getColor.toString(),
      "theme": "fusion"
    },
    "data": this.dataDeployee
  };

  this.change.detectChanges();

  })
}

dataBreackUp:any=[]
dataExpenseBreackUp:any
getListBreackUp:any=[]
getpbiExpenseBreackUp(){
  let cmpcode=1
  let year='2022-02-20'
  this.dataBreackUp=[]
  this.getListBreackUp=[]
  this.Loader=true
  this.HTTP.getPbiBuisnessBreackUpList(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
  this.getListBreackUp=  arg.data.table
console.log('getListBreackUp',arg.data.table)

  this.Loader=false
  var getColor=[]
var sum=0
  for(var i=0;i<this.getListBreackUp.length;i++)
  {
    getColor.push(this.setColor[i])
  }
  if(this.getListBreackUp.length>5)
  {
    for(var i=0;i<5;i++)
  {

this.dataBreackUp.push({"label":this.getListBreackUp[i].breackupName,"value":this.getListBreackUp[i].breackupId})
  }
  for(var j=0;j<this.getListBreackUp.length;j++)
  {
    if(j>=5)
    {
      sum+=this.getListBreackUp[j].breackupId

    }

  }
this.dataBreackUp.push({"label":'Other','value':sum})
  }

else
{
for(var i=0;i<this.getListBreackUp.length;i++)
{
this.dataBreackUp.push({"label":this.getListBreackUp[i].breackupName,"value":this.getListBreackUp[i].breackupId})



}
}

  this.dataExpenseBreackUp = {
    chart: {
      "numberPrefix": "",
      "bgColor": "#ffffff",
      "startingAngle": "100",
      "showLegend": "1",
      "showlabels": "0",

      "defaultCenterLabel": "",
    "centerLabel": " $label: $value",
      "centerLabelBold": "1",
      "showTooltip": "1",
      "decimals": "0",
      'paletteColors' :getColor.toString(),
      "theme": "fusion"
    },
    "data": this.dataBreackUp
  };



  })
}

  getListExpenseDepartment:any=[]
  dataExpenseDepartment:any=[]
  dataexpensedepartement:any
  getpbiExpenseDepartment(){
      let cmpcode=1
      let year='2022-02-20'
      this.getListExpenseDepartment=[]
      this.dataExpenseDepartment=[]
      this.Loader=true
      this.HTTP.getPbiExpenseDepartment(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getListExpenseDepartment=  arg.data.table
  console.log('getListExpenseDepartment',arg.data.table)

      this.Loader=false
      var getColor=[]

      for(var i=0;i<this.getListExpenseDepartment.length;i++)
      {
        getColor.push(this.setColor[i])
      }
      for(var i=0;i<this.getListExpenseDepartment.length;i++)
      {
this.dataExpenseDepartment.push({"label":this.getListExpenseDepartment[i].departmentName,"value":this.getListExpenseDepartment[i].departmentValue})
      }
      this.dataexpensedepartement = {
        chart: {
          caption: "",
          xaxisname: "",
          yaxisname: "",
          aligncaptionwithcanvas: "0",
          plottooltext: "<b>$dataValue</b> leads received",
          theme: "fusion",
          'paletteColors' :'7bb7ed'
        },
        data: this.dataExpenseDepartment
      };

      // this.dataexpensedepartement = {
      //   chart: {
      //     "numberPrefix": "",
      //     "bgColor": "#ffffff",
      //     "startingAngle": "100",
      //     "showLegend": "1",
      //
      //     "defaultCenterLabel": "",
      //   "centerLabel": " $label: $value",
      //     "centerLabelBold": "1",
      //     "showTooltip": "0",
      //     "decimals": "0",
      //     'paletteColors' :getColor.toString(),
      //     "theme": "fusion"
      //   },
      //   "data": this.dataExpenseDepartment
      // };



      })
  }

  getListExpenseProject:any=[]
  dataExpenseCurrentProject:any=[]
  dataExpensePreviousProject:any=[]
  dataExpenseCatProject:any=[]


  dataexpenseproject:any
  getpbiExpenseProject(){
      let cmpcode=1
      let year='2022-02-20'
      this.getListExpenseProject=[]
      //this.dataExpenseDepartment=[]
      this.dataExpenseCatProject=[]
      this.dataExpenseCurrentProject=[]
      this.dataExpensePreviousProject=[]
      this.Loader=true
      this.HTTP.getPbiExpenseProject(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getListExpenseProject=  arg.data.table
  console.log('getListExpenseProject',arg.data.table)

      this.Loader=false
      var getColor=[]

      for(var i=0;i<this.getListExpenseProject.length;i++)
      {
        getColor.push(this.setColor[i])
      }
      for(var i=0;i<this.getListExpenseProject.length;i++)
      {
this.dataExpenseCatProject.push({"label":this.getListExpenseProject[i].projectName,})
this.dataExpensePreviousProject.push({"value":this.getListExpenseProject[i].currentYearProject})
this.dataExpenseCurrentProject.push({"value":this.getListExpenseProject[i].previousYearProject})



}
this.dataexpenseproject = {
  chart: {
    caption: "",
    subcaption: "",
    yaxisname: "",
    palettecolors:  "#ed8f1d,#7cb5ec",
    plotgradientcolor: " ",
    theme: "fusion",
    yaxismaxvalue: "30",
    numdivlines: "2",
    showlegend: "1",
    interactivelegend: "0",
    showvalues: "0",
    'paletteColors' :'7cb5ec,ed8f1d',
    showsum: "0"
  },
  categories: [
    {
      category: this.dataExpenseCatProject
    }
  ],
  dataset: [
    {
      seriesname: "Customer",
      data: this.dataExpensePreviousProject
    },
    {
      seriesname: "Service Provider",
      data: this.dataExpenseCurrentProject
    }
  ]
  // annotations: {
  //   groups: [
  //     {
  //       id: "infobar",
  //       items: [
  //         {
  //           id: "1",
  //           type: "line",
  //           x: "$dataset.1.set.1.endx+10",
  //           y: "$dataset.1.set.1.y",
  //           tox: "$dataset.1.set.1.endx+50",
  //           toy: "$dataset.1.set.1.y",
  //           color: "#1b3c6a",
  //           dashed: "0",
  //           thickness: "1"
  //         },
  //         {
  //           id: "2",
  //           type: "line",
  //           x: "$dataset.1.set.1.endx+50",
  //           y: "$dataset.1.set.1.y",
  //           tox: "$dataset.1.set.1.endx+50",
  //           toy: "$dataset.0.set.1.y+50",
  //           color: "#1b3c6a",
  //           dashed: "0",
  //           thickness: "1"
  //         },
  //         {
  //           id: "3",
  //           type: "line",
  //           x: "$dataset.1.set.17.endx+5",
  //           y: "$dataset.1.set.17.y",
  //           tox: "$dataset.1.set.17.endx+200",
  //           toy: "$dataset.0.set.17.y",
  //           color: "#1b3c6a",
  //           dashed: "0",
  //           thickness: "1"
  //         },
  //         {
  //           id: "4",
  //           type: "line",
  //           x: "$dataset.1.set.17.endx+200",
  //           y: "$dataset.0.set.17.y",
  //           tox: "$dataset.1.set.17.endx+200",
  //           toy: "$dataset.0.set.17.y-40",
  //           color: "#1b3c6a",
  //           dashed: "0",
  //           thickness: "1"
  //         },
  //         {
  //           id: "shape",
  //           type: "polygon",
  //           startangle: "180",
  //           sides: "3",
  //           radius: "6",
  //           color: "#1b3c6a",
  //           x: "$dataset.1.set.17.endx+10",
  //           y: "$dataset.1.set.17.y"
  //         },
  //         {
  //           id: "shape",
  //           type: "polygon",
  //           startangle: "180",
  //           sides: "3",
  //           radius: "6",
  //           color: "1b3c6a",
  //           x: "$dataset.1.set.1.endx+10",
  //           y: "$dataset.1.set.1.y"
  //         },
  //         {
  //           id: "label1",
  //           align: "RiGHT",
  //           type: "text",
  //           text: "",
  //           fillcolor: "#1b3c6a",
  //           rotate: "90",
  //           x: "$dataset.1.set.1.endx+65",
  //           y: "$dataset.0.set.5.y"
  //         },
  //         {
  //           id: "label2",
  //           align: "CENTER",
  //           type: "text",
  //           text:
  //             "",
  //           fillcolor: "#1b3c6a",
  //           rotate: "90",
  //           x: "$dataset.1.set.17.endx+200",
  //           y: "$dataset.0.set.13.y"
  //         }
  //       ]
  //     }
  //   ]
  // }
};

      // this.dataexpenseproject = {
      //   chart: {
      //     caption: "",
      //     xaxisname: "",
      //     yaxisname: "",
      //     aligncaptionwithcanvas: "0",
      //     plottooltext: "<b>$dataValue</b> leads received",
      //     theme: "fusion",
      //     'paletteColors' :'7bb7ed'
      //   },
      //   data: this.dataExpenseProject
      // };




      })
  }
  datades21 = {
    chart: {
      "numberPrefix": "$",
      "bgColor": "#ffffff",
      "startingAngle": "100",
      "showLegend": "1",
      "defaultCenterLabel": "",
      "centerLabel": "Revenue from $label: $value",
      "centerLabelBold": "1",
      "showTooltip": "0",
      "decimals": "0",
      'paletteColors' :'7bb7ed, e4d556, 2b8f8d, f55d5c',
      "theme": "fusion"
    },
    "data": [{
      "label": "Traffic",
      "value": "5680"
    },
    {
      "label": "Family Engagement",
      "value": "1036"
    },
    {
      "label": "Public Transport",
      "value": "950"
    },
    {
      "label": "Weather",
      "value": "500"
    }
  ]

  };
  resourceList
  resouceBillableList
  resouceNonBillableList
  popup:boolean=false
  getResouceList(projectid){
    let NonBilleble = []
    let bllable=[]
    this.popup=true
    // this.Loader=true
    this.HTTP.getpbiResourceList(this.setDate,this.CmpCode,projectid,this.departmentId).subscribe(arg => {
    this.resourceList = arg.data.table;
    // console.log('resourceList',arg.data.table)
    this.Loader=false
    for(var i=0;i<this.resourceList.length;i++){
      if(this.resourceList[i].contribution==1){
        bllable.push({'billid':this.resourceList[i].resourceName, active:this.resourceList[i].inActive})
      }
      if(this.resourceList[i].contribution==0){
        NonBilleble.push({'billid':this.resourceList[i].resourceName,active:this.resourceList[i].inActive})
      }
    }
    this.resouceBillableList=bllable
    this.resouceNonBillableList=NonBilleble
    this.change.detectChanges();

    })
  }

  getListDepartment:any=[]
  dataDepartment:any=[]
  datadepartement:any
  Loader:boolean=false
  getpbiPeopleDepartment(){
      let cmpcode=1
      let year='2022-02-20'
     this.getListDepartment=[]
     this.dataDepartment=[]
     this.Loader=true
      this.HTTP.getPbiReportDepartment(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getListDepartment=  arg.data.table
  console.log('getListDepartment',arg.data.table)

      this.Loader=false
//       designationId: 15
// designationName:
var getColor=[]

for(var i=0;i<this.getListDepartment.length;i++)
{
  getColor.push(this.setColor[i])
}
if(this.getListDepartment.length>5)
{


  for(var i=0;i<5;i++)
  {
this.dataDepartment.push({"label":this.getListDepartment[i].departmentName,"value":this.getListDepartment[i].departmentId})
  }
  var sum=0
  for(var i=0;i<this.getListDepartment.length;i++)
  {
    if(i>=5)
    {
sum+=this.getListDepartment[i].departmentId
    }
  }
  this.dataDepartment.push({"label":"Other","value":sum})
}
else{
  for(var i=0;i<this.getListDepartment.length;i++)
  {
this.dataDepartment.push({"label":this.getListDepartment[i].departmentName,"value":this.getListDepartment[i].departmentId})
  }
}

      this.datadepartement = {
        chart: {
          "numberPrefix": "",
          "bgColor": "#ffffff",
          "startingAngle": "100",
          "showLegend": "1",

          "defaultCenterLabel": "",
         "centerLabel": "$label: $value",
          "centerLabelBold": "1",
          "showTooltip": "0",
          "decimals": "0",
          'paletteColors' :getColor.toString(),
          "theme": "fusion"
        },
        "data": this.dataDepartment
      };


      })
  }

  getListGender:any=[]
  dataGender:any=[]
  datagender:any
  getpbiPeopleGender(){
      let cmpcode=1
      let year='2022-02-20'
      this.getListGender=[]
      this.dataGender=[]
      this.Loader=true
      this.HTTP.getPbiReportGender(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getListGender=  arg.data.table
  console.log('getListGender',arg.data.table)

      this.Loader=false
//       designationId: 15
// designationName:

var male=[]
var female=[]
      var getColor=[]

      for(var i=0;i<this.getListGender.length;i++)
      {
        getColor.push(this.setColor[i])
      }
      for(var i=0;i<this.getListGender.length;i++)
      {
        if(this.getListGender[i].gender=="Male")
        {
male.push(this.getListGender[i].gender)
        }
        else{
          female.push(this.getListGender[i].gender)

        }
      }
this.dataGender.push({"label":'Male',"value":male.length},{"label":'Female',"value":female.length}
)

      this.datagender = {
        chart: {
          "numberPrefix": "",
          "bgColor": "#ffffff",
          "startingAngle": "100",

          "showLegend": "1",
          "defaultCenterLabel": "",
          "centerLabel": "$label: $value",
          "centerLabelBold": "1",
          "showTooltip": "0",
          "decimals": "0",
          'paletteColors' :getColor.toString(),
          "theme": "fusion"
        },
        "data": this.dataGender
      };


      })
  }


  getListEmployeeVsVendor:any=[]
  dataEmployeeVsVendor:any=[]
  dataempoyeevsvendor:object
  dataEmployee:any=[]
  dataVendor:any=[]
  getpbiPeopleEmployeeVsVendor(){
      let cmpcode=1
      let year='2022-02-20'
      this.dataEmployeeVsVendor=[]
      this.getListEmployeeVsVendor=[]
      this.dataEmployee=[]
      this.dataVendor=[]
      this.Loader=true
      this.HTTP.etPbiReportEmployeeVsVendor(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getListEmployeeVsVendor=  arg.data.table
  console.log('getListEmployeeVsVendor',arg.data.table)

      this.Loader=false
//       designationId: 15
// designationName:
var getColor=[]
      this.getListEmployeeVsVendor=  arg.data.table
if(this.getListEmployeeVsVendor.length>=0)
{


for(var i=0;i<this.getListEmployeeVsVendor.length;i++)
{
  getColor.push(this.setColor[i])
}
      for(var i=0;i<this.getListEmployeeVsVendor.length;i++)
      {
//this.dataEmployeeVsVendor.push({"label":this.getListEmployeeVsVendor[i].monthNames,"value":this.getListEmployeeVsVendor[i].employee,'value':this.getListEmployeeVsVendor[i].vendor})

this.dataEmployeeVsVendor.push({"label":this.getListEmployeeVsVendor[i].monthNames})
this.dataEmployee.push({'value':this.getListEmployeeVsVendor[i].employee})
this.dataVendor.push({'value':this.getListEmployeeVsVendor[i].vendor})



      }

       this.dataempoyeevsvendor = {
        chart: {
          'paletteColors':getColor.toString(),
          caption: "",
          yaxisname: "",
          subcaption: "",
          showhovereffect: "1",
          numbersuffix: "",
          drawcrossline: "1",
          //plottooltext: "<b>$dataValue</b> of youth were on $seriesName",
          theme: "fusion",


        },
        categories: [
          {
            category:this.dataEmployeeVsVendor
          }
        ],
        dataset: [
          {
            seriesname: "Employee",
            data:this.dataEmployee
          },
          {
            seriesname: "Vendor",
            data:this.dataVendor
          },


        ]
      };

  // this.dataempoyeevsvendor = {
  //   "chart": {
  //     "theme": "fusion",
  //     "subCaption": "Last month",
  //     "xAxisName": "Reported Cause",
  //     "pYAxisName": "No. of Occurrence",
  //     "sYAxisname": "Cumulative Percentage",
  //     "showValues": "0",
  //     "showXAxisLine": "1",
  //     'paletteColors' :'7bb7ed',
  //     "showLineValues": "1"
  //   },
  // "data":this.dataEmployeeVsVendor


  // };



      // this.dataempoyeevsvendor = {
      //   chart: {
      //     "numberPrefix": "$",
      //     "bgColor": "#ffffff",
      //     "startingAngle": "100",
      //     "showLegend": "1",
      //     "defaultCenterLabel": "",
      //     "centerLabel": "Revenue from $label: $value",
      //     "centerLabelBold": "1",
      //     "showTooltip": "0",
      //     "decimals": "0",
      //     'paletteColors' :'7bb7ed, e4d556',
      //     "theme": "fusion"
      //   },
      //   "data": this.dataEmployeeVsVendor
      // };
}

      })
  }
  dataProjectVsVendor:any=[]
  getListProjectVsVendor:any=[]
  dataProjectEmployee:any=[]
  dataVendorEmployee:any=[]
  dataprojectEmployeevsvendor:any
  getpbiProjectEmployeeVsVendor(){
    let cmpcode=1
    let year='2022-02-20'
    this.dataProjectVsVendor=[]
    this.getListProjectVsVendor=[]
    this.dataProjectEmployee=[]
    this.dataVendorEmployee=[]
    this.Loader=true
    this.HTTP.getPbiProjectEmployeeVsVendor(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getListProjectVsVendor=  arg.data.table
  console.log('getListProjectVsVendor',arg.data.table)

      this.Loader=false
//       designationId: 15
// designationName:
if(this.getListProjectVsVendor.length>0)
{

var getColor=[]

for(var i=0;i<this.getListProjectVsVendor.length;i++)
{
getColor.push(this.setColor[i])
}
    for(var i=0;i<this.getListProjectVsVendor.length;i++)
    {
//this.dataEmployeeVsVendor.push({"label":this.getListEmployeeVsVendor[i].monthNames,"value":this.getListEmployeeVsVendor[i].employee,'value':this.getListEmployeeVsVendor[i].vendor})

this.dataProjectVsVendor.push({"label":this.getListEmployeeVsVendor[i].monthNames})
this.dataProjectEmployee.push({'value':this.getListEmployeeVsVendor[i].employee})
this.dataVendorEmployee.push({'value':this.getListEmployeeVsVendor[i].vendor})



    }

    // this.dataprojectEmployeevsvendor = {
    //   chart: {
    //     'paletteColors':getColor.toString(),
    //   numvisibleplot: "12",
    //   labeldisplay: "auto",
    //   theme: "fusion"
    //     //plottooltext: "<b>$dataValue</b> of youth were on $seriesName",


    //   },
    //   categories: [
    //     {
    //       category:this.dataProjectVsVendor
    //     }
    //   ],
    //   dataset: [
    //     {
    //       seriesname: "Employeevs",
    //       data:this.dataProjectEmployee
    //     },
    //     {
    //       seriesname: "Vendorvs",
    //       data:this.dataVendorEmployee
    //     },


    //   ]
    // };
    this.dataprojectEmployeevsvendor = {
      chart: {

        'paletteColors' :'7cb5ec, ed8f1d',
        numvisibleplot: "",
        labeldisplay: "auto",
        theme: "fusion"
      },
      categories: [
        {
          category: this.dataProjectVsVendor


        }
      ],
      dataset: [
        {
          seriesname: "Employee",
          data: this.dataProjectEmployee
        },
        {
          seriesname: "Vender",
          data:this.dataVendorEmployee

        }
      ]
    };

// this.dataempoyeevsvendor = {
//   "chart": {
//     "theme": "fusion",
//     "subCaption": "Last month",
//     "xAxisName": "Reported Cause",
//     "pYAxisName": "No. of Occurrence",
//     "sYAxisname": "Cumulative Percentage",
//     "showValues": "0",
//     "showXAxisLine": "1",
//     'paletteColors' :'7bb7ed',
//     "showLineValues": "1"
//   },
// "data":this.dataEmployeeVsVendor

}


    })
}
dataProjectVsDeployee:any=[]
getListProjectVsBench:any=[]
dataProjectdeployee:any=[]
dataVendorBench:any=[]
dataprojectDeployeeVsBench:any=[]
getpbiProjecDeployeeVsBench(){
  let cmpcode=1
  let year='2022-02-20'
  this.dataProjectVsDeployee=[]
  this.getListProjectVsBench=[]
  this.dataProjectdeployee=[]
  this.dataVendorBench=[]
  this.Loader=true
  this.HTTP.getPbiProjectDeployeeVsBench(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
  this.getListProjectVsBench=  arg.data.table
  console.log('getListProjectVsBench',arg.data.table)

  this.Loader=false
//       designationId: 15
// designationName:
if(this.getListProjectVsBench.length>=0)
{

var getColor=[]

for(var i=0;i<this.getListProjectVsBench.length;i++)
{
getColor.push(this.setColor[i])
}
  for(var i=0;i<this.getListProjectVsBench.length;i++)
  {
//this.dataEmployeeVsVendor.push({"label":this.getListEmployeeVsVendor[i].monthNames,"value":this.getListEmployeeVsVendor[i].employee,'value':this.getListEmployeeVsVendor[i].vendor})

this.dataProjectVsDeployee.push({"label":this.getListProjectVsBench[i].monthNames})
this.dataProjectdeployee.push({'value':this.getListProjectVsBench[i].employee})
this.dataVendorBench.push({'value':this.getListProjectVsBench[i].vendor})



  }
   this.dataprojectDeployeeVsBench = {
    chart: {
      'paletteColors':getColor.toString(),
      caption: "",
      yaxisname: "",
      subcaption: "",
      showhovereffect: "1",
      numbersuffix: "",
      drawcrossline: "1",
      //plottooltext: "<b>$dataValue</b> of youth were on $seriesName",
      theme: "fusion",


    },
    categories: [
      {
        category:this.dataProjectVsDeployee
      }
    ],
    dataset: [
      {
        seriesname: "Deployee",
        data:this.dataProjectdeployee
      },
      {
        seriesname: "On Bench",
        data:this.dataVendorBench
      },


    ]
  };

// this.dataempoyeevsvendor = {
//   "chart": {
//     "theme": "fusion",
//     "subCaption": "Last month",
//     "xAxisName": "Reported Cause",
//     "pYAxisName": "No. of Occurrence",
//     "sYAxisname": "Cumulative Percentage",
//     "showValues": "0",
//     "showXAxisLine": "1",
//     'paletteColors' :'7bb7ed',
//     "showLineValues": "1"
//   },
// "data":this.dataEmployeeVsVendor

}


  })
}
dataExpenseReportList:any=[]
approvedReports:any
inprocess:any
pendingReports:any
reimbursed:any
totalReports:any
unsubmittedReports:any
unsubmittedReportsLeft:any
approvedReportsLeft:any
inprocessLeft:any
pendingReportsLeft:any
reimbursedLeft:any
totalReportsLeft:any
getpbiExpenseReportList(){
  let cmpcode=1
  let year='2022-02-20'
  this.dataExpenseReportList=[]
  this.Loader=true
  this.HTTP.getPbiExpenseReportList(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
    this.dataExpenseReportList=  arg.data.table
  console.log('dataExpenseReportList',arg.data.table)

    this.Loader=false
//       designationId: 15
// designationName:
this.approvedReports=this.dataExpenseReportList[0].approvedReports
this.inprocess=this.dataExpenseReportList[0].inprocess
this.pendingReports=this.dataExpenseReportList[0].pendingReports
this.reimbursed=this.dataExpenseReportList[0].reimbursed
this.totalReports=this.dataExpenseReportList[0].totalReports
this.unsubmittedReports=this.dataExpenseReportList[0].unsubmittedReports

this.approvedReportsLeft=this.dataExpenseReportList[0].approvedReportsLeft
this.inprocessLeft=this.dataExpenseReportList[0].inprocessLeft
this.pendingReportsLeft=this.dataExpenseReportList[0].pendingReportsLeft
this.reimbursedLeft=this.dataExpenseReportList[0].reimbursedLeft
this.totalReportsLeft=this.dataExpenseReportList[0].totalReportsLeft
this.unsubmittedReportsLeft=this.dataExpenseReportList[0].unsubmittedReportsLeft



  })
}
dataProjectVsDeployeeBill:any=[]
getListProjectVsBenchBill:any=[]
dataProjectdeployeeBill:any=[]
dataVendorBenchBill:any=[]
dataprojectDeployeeVsBenchBill:any=[]
getpbiProjecDeployeeVsBenchBill(){
  let cmpcode=1
  let year='2022-02-20'
  this.dataProjectVsDeployeeBill=[]
  this.getListProjectVsBenchBill=[]
  this.dataProjectdeployeeBill=[]
  this.dataVendorBenchBill=[]
  this.Loader=true
  this.HTTP.getPbiProjectDetailBillableVsNonBillable(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
    this.getListProjectVsBenchBill=  arg.data.table
  console.log('getListProjectVsBenchBill',arg.data.table)

    this.Loader=false
//       designationId: 15
// designationName:
if(this.getListProjectVsBenchBill.length>=0)
{

var getColor=[]

for(var i=0;i<this.getListProjectVsBenchBill.length;i++)
{
getColor.push(this.setColor[i])
}
  for(var i=0;i<this.getListProjectVsBenchBill.length;i++)
  {
//this.dataEmployeeVsVendor.push({"label":this.getListEmployeeVsVendor[i].monthNames,"value":this.getListEmployeeVsVendor[i].employee,'value':this.getListEmployeeVsVendor[i].vendor})

this.dataProjectVsDeployeeBill.push({"label":this.getListProjectVsBenchBill[i].monthNames})
this.dataProjectdeployeeBill.push({'value':this.getListProjectVsBenchBill[i].employee})
this.dataVendorBenchBill.push({'value':this.getListProjectVsBenchBill[i].vendor})



  }
   this.dataprojectDeployeeVsBenchBill = {
    chart: {
      'paletteColors':getColor.toString(),
      caption: "",
      yaxisname: "",
      subcaption: "",
      showhovereffect: "1",
      numbersuffix: "",
      drawcrossline: "1",
      //plottooltext: "<b>$dataValue</b> of youth were on $seriesName",
      theme: "fusion",


    },
    categories: [
      {
        category:this.dataProjectVsDeployeeBill
      }
    ],
    dataset: [
      {
        seriesname:"Billable",
        data:this.dataProjectdeployeeBill
      },
      {
        seriesname: "Non-Billable",
        data:this.dataVendorBenchBill
      },


    ]
  };

// this.dataempoyeevsvendor = {
//   "chart": {
//     "theme": "fusion",
//     "subCaption": "Last month",
//     "xAxisName": "Reported Cause",
//     "pYAxisName": "No. of Occurrence",
//     "sYAxisname": "Cumulative Percentage",
//     "showValues": "0",
//     "showXAxisLine": "1",
//     'paletteColors' :'7bb7ed',
//     "showLineValues": "1"
//   },
// "data":this.dataEmployeeVsVendor

}


  })
}

dataProjectVsDeployeeBillEmployeeCountVsExpense:any=[]
getListProjectVsBenchBillEmployeeCountVsExpense:any=[]
dataProjectdeployeeBillEmployeeCountVsExpense:any=[]
dataVendorBenchBillEmployeeCountVsExpense:any=[]
dataprojectDeployeeVsBenchBillEmployeeCountVsExpense:any=[]
getpbiProjecDeployeeVsBenchBillEmployeeCountVsExpense(){
  let cmpcode=1
  let year='2022-02-20'
  this.dataProjectVsDeployeeBillEmployeeCountVsExpense=[]
  this.getListProjectVsBenchBillEmployeeCountVsExpense=[]
  this.dataProjectdeployeeBillEmployeeCountVsExpense=[]
  this.dataVendorBenchBillEmployeeCountVsExpense=[]
  this.Loader=true
  this.HTTP.getPbiProjectDetailBillableVsNonBillablegetPbiProjectDetailBillableVsNonBillable(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
    this.getListProjectVsBenchBillEmployeeCountVsExpense=  arg.data.table
  console.log('getListProjectVsBenchBillEmployeeCountVsExpense',arg.data.table)

    this.Loader=false
//       designationId: 15
// designationName:
if(this.getListProjectVsBenchBillEmployeeCountVsExpense.length>0)
{

var getColor=[]

for(var i=0;i<this.getListProjectVsBenchBillEmployeeCountVsExpense.length;i++)
{
getColor.push(this.setColor[i])
}
  for(var i=0;i<this.getListProjectVsBenchBillEmployeeCountVsExpense.length;i++)
  {
//this.dataEmployeeVsVendor.push({"label":this.getListEmployeeVsVendor[i].monthNames,"value":this.getListEmployeeVsVendor[i].employee,'value':this.getListEmployeeVsVendor[i].vendor})

this.dataProjectVsDeployeeBillEmployeeCountVsExpense.push({"label":this.getListProjectVsBenchBillEmployeeCountVsExpense[i].monthNames})
this.dataProjectdeployeeBillEmployeeCountVsExpense.push({'value':this.getListProjectVsBenchBillEmployeeCountVsExpense[i].employee})
this.dataVendorBenchBillEmployeeCountVsExpense.push({'value':this.getListProjectVsBenchBillEmployeeCountVsExpense[i].vendor})



  }
   this.dataprojectDeployeeVsBenchBillEmployeeCountVsExpense = {
    chart: {
      'paletteColors':getColor.toString(),
      // caption: "",
      // yaxisname: "",
      // subcaption: "",
      // showhovereffect: "1",
      // numbersuffix: "",
      // drawcrossline: "1",
      // //plottooltext: "<b>$dataValue</b> of youth were on $seriesName",
      // theme: "fusion",


      "caption": "",
        "subCaption": "",
        "pYAxisName": "",
        "sYAxisName": " ",
        "numberPrefix": "",
        "sNumberSuffix": "",
        "sYAxisMaxValue": "50",
        "showValues": "1",
        "numVisiblePlot": "12",
        "flatScrollBars": "1",
        "scrollheight": "20",
        "theme": "fusion"


    },
    categories: [
      {
        category:this.dataProjectVsDeployeeBillEmployeeCountVsExpense
      }
    ],
    dataset: [
      {
        parentyaxis: "S",

        seriesname: "Expense",
        data:this.dataVendorBenchBillEmployeeCountVsExpense
      },
      {

        seriesname: "Employee Count",
        data:this.dataProjectdeployeeBillEmployeeCountVsExpense
      }
     


    ]
  };

// this.dataempoyeevsvendor = {
//   "chart": {
//     "theme": "fusion",
//     "subCaption": "Last month",
//     "xAxisName": "Reported Cause",
//     "pYAxisName": "No. of Occurrence",
//     "sYAxisname": "Cumulative Percentage",
//     "showValues": "0",
//     "showXAxisLine": "1",
//     'paletteColors' :'7bb7ed',
//     "showLineValues": "1"
//   },
// "data":this.dataEmployeeVsVendor

}


  })
}

dataProjectVsDeployeeBillProjectCountVsExpense:any=[]
getListProjectVsBenchBillProjectCountVsExpense:any=[]
dataProjectdeployeeBillProjectCountVsExpense:any=[]
dataVendorBenchBillProjectCountVsExpense:any=[]
dataprojectDeployeeVsBenchBillProjectCountVsExpense:any=[]
getpbiProjecDeployeeVsBenchBillProjectCountVsExpense(){
  let cmpcode=1
  let year='2022-02-20'
  this.dataProjectVsDeployeeBillProjectCountVsExpense=[]
  this.getListProjectVsBenchBillProjectCountVsExpense=[]
  this.dataProjectdeployeeBillProjectCountVsExpense=[]
  this.dataVendorBenchBillProjectCountVsExpense=[]
  this.Loader=true
  this.HTTP.getpbiProjecDeployeeVsBenchBillProjectCountVsExpense(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
    this.getListProjectVsBenchBillProjectCountVsExpense=  arg.data.table
  console.log('getListProjectVsBenchBillProjectCountVsExpense',arg.data.table)

    this.Loader=false
//       designationId: 15
// designationName:
if(this.getListProjectVsBenchBillProjectCountVsExpense.length>0)
{

var getColor=[]

for(var i=0;i<this.getListProjectVsBenchBillProjectCountVsExpense.length;i++)
{
getColor.push(this.setColor[i])
}
  for(var i=0;i<this.getListProjectVsBenchBillProjectCountVsExpense.length;i++)
  {
//this.dataEmployeeVsVendor.push({"label":this.getListEmployeeVsVendor[i].monthNames,"value":this.getListEmployeeVsVendor[i].employee,'value':this.getListEmployeeVsVendor[i].vendor})

this.dataProjectVsDeployeeBillProjectCountVsExpense.push({"label":this.getListProjectVsBenchBillProjectCountVsExpense[i].monthNames})
this.dataProjectdeployeeBillProjectCountVsExpense.push({'value':this.getListProjectVsBenchBillProjectCountVsExpense[i].employee})
this.dataVendorBenchBillProjectCountVsExpense.push({'value':this.getListProjectVsBenchBillProjectCountVsExpense[i].vendor})



  }
   this.dataprojectDeployeeVsBenchBillProjectCountVsExpense = {
    chart: {
      'paletteColors':getColor.toString(),
      caption: "",
      yaxisname: "",
      subcaption: "",
      showhovereffect: "1",
      numbersuffix: "",
      drawcrossline: "1",
      //plottooltext: "<b>$dataValue</b> of youth were on $seriesName",
      theme: "fusion",


    },
    categories: [
      {
        category:this.dataProjectVsDeployeeBillProjectCountVsExpense
      }
    ],
    dataset: [
      {
        seriesname: "Active Project Count",
        data:this.dataProjectdeployeeBillProjectCountVsExpense
      },
      {
        parentyaxis: "S",
        seriesname: "Expense",
        data:this.dataVendorBenchBillProjectCountVsExpense
      },


    ]
  };

// this.dataempoyeevsvendor = {
//   "chart": {
//     "theme": "fusion",
//     "subCaption": "Last month",
//     "xAxisName": "Reported Cause",
//     "pYAxisName": "No. of Occurrence",
//     "sYAxisname": "Cumulative Percentage",
//     "showValues": "0",
//     "showXAxisLine": "1",
//     'paletteColors' :'7bb7ed',
//     "showLineValues": "1"
//   },
// "data":this.dataEmployeeVsVendor

}


  })
}



dataProjectVsDeployeeBillCustomerVsService:any=[]
getListProjectVsBenchBillCustomerVsService:any=[]
dataProjectdeployeeBillCustomerVsService:any=[]
dataVendorBenchBillCustomerVsService:any=[]
dataprojectDeployeeVsBenchBillCustomerVsService:any
getpbiProjecDeployeeVsBenchBillCustomerVsService(){
  let cmpcode=1
  let year='2022-02-20'
  this.dataProjectVsDeployeeBillCustomerVsService=[]
  this.dataProjectdeployeeBillCustomerVsService=[]
  this.dataVendorBenchBillCustomerVsService=[]
  this.getListProjectVsBenchBillCustomerVsService=[]
  this.Loader=true
  this.HTTP.getpbiProjecDeployeeVsBenchBillCustomerVsService(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
    this.getListProjectVsBenchBillCustomerVsService=  arg.data.table
  console.log('getListProjectVsBenchBillCustomerVsService',arg.data.table)

    this.Loader=false
//       designationId: 15
// designationName:
if(this.getListProjectVsBenchBillCustomerVsService.length>=0)
{

var getColor=[]

for(var i=0;i<this.getListProjectVsBenchBillCustomerVsService.length;i++)
{
getColor.push(this.setColor[i])
}
  for(var i=0;i<this.getListProjectVsBenchBillCustomerVsService.length;i++)
  {
//this.dataEmployeeVsVendor.push({"label":this.getListEmployeeVsVendor[i].monthNames,"value":this.getListEmployeeVsVendor[i].employee,'value':this.getListEmployeeVsVendor[i].vendor})

this.dataProjectVsDeployeeBillCustomerVsService.push({"label":this.getListProjectVsBenchBillCustomerVsService[i].monthNames})
this.dataProjectdeployeeBillCustomerVsService.push({'value':this.getListProjectVsBenchBillCustomerVsService[i].employee})
this.dataVendorBenchBillCustomerVsService.push({'value':this.getListProjectVsBenchBillCustomerVsService[i].vendor})



  }
   this.dataprojectDeployeeVsBenchBillCustomerVsService = {
    chart: {
      'paletteColors':getColor.toString(),
      caption: "",
      yaxisname: "",
      subcaption: "",
      showhovereffect: "1",
      numbersuffix: "",
      drawcrossline: "1",
      //plottooltext: "<b>$dataValue</b> of youth were on $seriesName",
      theme: "fusion",


    },
    categories: [
      {
        category:this.dataProjectVsDeployeeBillCustomerVsService
      }
    ],
    dataset: [
      {
        seriesname: "Customer",
        data:this.dataProjectdeployeeBillCustomerVsService
      },
      {
        parentyaxis: "S",
        seriesname: "Service Provider",
        data:this.dataVendorBenchBillCustomerVsService
      },


    ]
  };

// this.dataempoyeevsvendor = {
//   "chart": {
//     "theme": "fusion",
//     "subCaption": "Last month",
//     "xAxisName": "Reported Cause",
//     "pYAxisName": "No. of Occurrence",
//     "sYAxisname": "Cumulative Percentage",
//     "showValues": "0",
//     "showXAxisLine": "1",
//     'paletteColors' :'7bb7ed',
//     "showLineValues": "1"
//   },
// "data":this.dataEmployeeVsVendor

}


  })
}



public format = {type:'date', format:'dd/MM/yyyy'}

  getListEmployeeAddition:any=[]
  dataEmployeeAddition:any=[]
  dataempoyeeaddition:any
  cateList:any=[]
  percentAddList:any=[]
  getpbiPeopleEmployeeAddition(){
      let cmpcode=1
      let year='2022-02-20'
      this.getListEmployeeAddition=[]
      this.dataEmployeeAddition=[]
      this.cateList=[]
      this.Loader=true
      this.HTTP.etPbiReportEmployeeAddition(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getListEmployeeAddition=  arg.data.table
  console.log('getListEmployeeAddition',arg.data.table)

      this.Loader=false
//       designationId: 15
// designationName:
var getColor=[]

for(var i=0;i<this.getListEmployeeAddition.length;i++)
{
  getColor.push(this.setColor[i])
}
//       for(var i=0;i<this.getListEmployeeAddition.length;i++)
//       {
// this.dataEmployeeAddition.push({"label":this.getListEmployeeAddition[i].monthNames,"value":this.getListEmployeeAddition[i].employee})
//       }
for(var i=0;i<this.getListEmployeeAddition.length;i++)
{
this.dataEmployeeAddition.push({"label":this.getListEmployeeAddition[i].monthNames})
}
for(var i=0;i<this.getListEmployeeAddition.length;i++)
{
this.cateList.push({"value":this.getListEmployeeAddition[i].employee})
this.percentAddList.push({"value":this.getListEmployeeAddition[i].avgPercent})

}
  //     this.dataempoyeeaddition={
  //   "chart": {
  //     caption: "Late arrivals by reported cause",
  //     subcaption: "Last month",
  //     pyaxisname: "No. of Occurrence",
  //     theme: "fusion",
  //     showsecondarylimits: "0",
  //     showdivlinesecondaryvalue: "0",
  //     plottooltext:
  //       "Due to $label, late arrivals count is : <b>$dataValue</b> of the total <b>$sum</b> employees",
  //     drawcrossline: "1"

  //   },
  //   "data":this.dataEmployeeAddition
  // };

  this.dataempoyeeaddition = {
    chart: {
      yaxisname: "",
      syaxisname: "",
      labeldisplay: "rotate",
      snumbersuffix: "",
      scrollheight: "10",
      numvisibleplot: "10",
      drawcrossline: "1",
      theme: "fusion",
plottooltext:     " $label: <b>$dataValue</b>",
    },
    categories: [
      {
        category:this.dataEmployeeAddition
      }
    ],
    dataset: [
      {
        seriesname: "Employee Count",
      //  plottooltext: "Employee: $dataValue",
        data:this.cateList
      },

      // {
      //   seriesname: "Percentage",
      //   parentyaxis: "S",
      //   renderas: "line",
      //   data: this.cateList
      // }
    ]
  };

      // this.dataempoyeevsvendor = {
      //   chart: {
      //     "numberPrefix": "$",
      //     "bgColor": "#ffffff",
      //     "startingAngle": "100",
      //     "showLegend": "1",
      //     "defaultCenterLabel": "",
      //     "centerLabel": "Revenue from $label: $value",
      //     "centerLabelBold": "1",
      //     "showTooltip": "0",
      //     "decimals": "0",
      //     'paletteColors' :'7bb7ed, e4d556',
      //     "theme": "fusion"
      //   },
      //   "data": this.dataEmployeeVsVendor
      // };


      })
  }
  getListTenureWiseEmployee:any=[]
  getListTenureWiseEmployeeAvg:any=[]
  tenurUpList:any=[]
  tenureDownList:any=[]
  tentureDetails:any=[]
  avgMin:any=[]
  avgMax:any=[]
  avgTotal:any=[]
  catList:any=[]
tenCatList:any=[]
curAvgLsit:any=[]
newList:any=[]
perFormanceType:any
changeProjectEmployeePerformance(e)
{
debugger
this.perFormanceType=e.target.value
this.getPerformance()
}
  getpbiPeopleTenureWiseEmployee(){
      let cmpcode=1
      let year='2022-02-20'
      this.getListTenureWiseEmployee=[]
      this.getListTenureWiseEmployeeAvg=[]
      this.tenurUpList=[]
      this.tenureDownList=[]
      this.Loader=true
      this.HTTP.getPbiReportEmployeeTenureWiseEmployeeDetail(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getListTenureWiseEmployee=  arg.data.table
  console.log('getListTenureWiseEmployee',arg.data.table)

      this.Loader=false
      this.getListTenureWiseEmployeeAvg=arg.data.table1
 this.avgMin=[]
 this.avgMax=[]
 this.catList=[]
      this.avgMin.push({'value':arg.data.table1[0].january},
      {'value':arg.data.table1[0].february},
      {'value':arg.data.table1[0].march},{'value':arg.data.table1[0].april}
      ,{'value':arg.data.table1[0].may},{'value':arg.data.table1[0].june},
      {'value':arg.data.table1[0].july},{'value':arg.data.table1[0].august},
      {'value':arg.data.table1[0].september},{'value':arg.data.table1[0].october},
      {'value':arg.data.table1[0].november},{'value':arg.data.table1[0].december})
      this.avgMax.push({'value':arg.data.table1[1].january},
      {'value':arg.data.table1[1].february},{'value':arg.data.table1[1].march},
      {'value':arg.data.table1[1].april},{'value':arg.data.table1[1].may},
      {'value':arg.data.table1[1].june},{'value':arg.data.table1[1].july},
      {'value':arg.data.table1[1].august},{'value':arg.data.table1[1].september},
      {'value':arg.data.table1[1].october},{'value':arg.data.table1[1].november},
      {'value':arg.data.table1[1].december})
      this.catList.push({'Label':'january'},{'Label':"february"},{'Label':'march'},
      {'Label':'april'},{'Label':'may'},
      {'Label':'june'},{'Label':'july'},
      {'Label':'august'},{'Label':'september'},
      {'Label':'october'},{'Label':'november'},
      {'Label':'december'})
      var dat=new Date(this.setDate)
             for(var i=0;i<dat.getMonth()+1;i++)
             {
               this.tenurUpList.push(this.avgMin[i])
               this.tenureDownList.push(this.avgMax[i])

               this.tenCatList.push(this.catList[i])
               this.curAvgLsit.push({'value':arg.data.table[0].cruntavg})
             this.newList.push({'value':this.avgMin[i].value+','+this.avgMax[i].value+','+this.curAvgLsit[i].value})


             }
    // this.tenurUpList.push(
    //   {"label": "Jan",'value':this.getListTenureWiseEmployee[0].janmax},
    //   {"label": "Feb",'value':this.getListTenureWiseEmployee[0].febmax},
    //   {"label": "Mar",'value':this.getListTenureWiseEmployee[0].marmax},
    //   {"label": "Apr",'value':this.getListTenureWiseEmployee[0].aprmax},
    //   {"label": "May",'value':this.getListTenureWiseEmployee[0].maymax}

    //   )
    //   this.tenureDownList.push({'value':this.getListTenureWiseEmployee[0].janmin,},
    //   {'value':this.getListTenureWiseEmployee[0].febmin},
    //   {'value':this.getListTenureWiseEmployee[0].marmin},
    //   {'value':this.getListTenureWiseEmployee[0].aprmin},
    //   {'value':this.getListTenureWiseEmployee[0].maymin})
      // var totalSum=(this.getListTenureWiseEmployeeAvg[0].aprilavg+this.getListTenureWiseEmployeeAvg[0].janavg+this.getListTenureWiseEmployeeAvg[0].febavg+
      // this.getListTenureWiseEmployeeAvg[0].marchavg+
      // this.getListTenureWiseEmployeeAvg[0].mayavg)/5
//       designationId: 15
// designationName:
// var avgList=[]
// for(var i=0;i<this.tenurUpList.length;i++)
// {
//   avgList.push( {'value':totalSum})

// }
// var maxValue=Math.max(...this.tenurUpList);
// var minValue=-Math.max(...this.tenurUpList);
// var newMax=Math.max(...this.tenureDownList);
// var newmin=-Math.max(...this.tenureDownList);
// this.tentureDetails={
//     chart: {
//       caption: "Quarterly Warehouse Inspections",
//       subcaption: "Last Year<br>(showing rise and fall through connecting line)",
//       palettecolors: "#5D62B5, #979AD0",
//       theme: "fusion",
//       showmean: "1",
//       drawmeanconnector: "1",
//       yaxisname: "Number of inspections",
//       yaxismaxvalue: "265",
//       yaxisminvalue: "20",
//       plotspacepercent: "65",
//       meaniconshape: "polygon",
//       meaniconsides: "2",
//       meaniconradius: "2",
//       outliericonsides: "20",
//       outliericonalpha: "50",
//       outliericonshape: "triangle",
//       outliericonradius: "4",
//       mediancolor: "#FFFFFF",
//      // plottooltext:
//        // "<b>Distribution for $label:</b><br>Max: <b>$maxDataValue</b><br>Q3: <b>$Q3</b><br>Median: <b>$median</b><br>Q1: <b>$Q1</b><br>Min: <b>$minDataValue</b>"
//     },
//     categories: [
//       {
//         category:this.tenCatList
//       }
//     ],
//     dataset: [
//       {
//         seriesname: "avg Value",
//         data: this.newList
//         //data: this.tenurUpList


//       }
//       // {
//       //   seriesname: "avg max Value",
//       //   //data: this.newList
//       //   data: this.tenureDownList


//       // }
//     ]


// }
this.tentureDetails={
    chart: {
      // caption: "Growth Accounting",
      // pyaxisname: "Monthly Active Users [MAU]",
      // syaxisname: "Growth Ratio",
      // numbersuffix: "",
      // numdivlines: "50",
      // adjustdiv: "50",
      // syaxismaxvalue: "7",
      // syaxisminvalue: "-3",
      // yaxisminvalue: "300",
      // yaxismaxvalue: "30",
      // theme: "fusion",
      // drawcustomlegendicon: "1",
      // plottooltext: "$label, $seriesname: $dataValue",
      // palettecolors: "#A5A5A5,#5EB863,#DD8341"
      caption: "",
      yaxisname: "",
      subcaption: "",
      numberprefix: "",
      yaxisminvalue: "0",
      yaxismaxvalue: "200",

     showsum: "1",
    //  plottooltext:
     //  "$seriesName in $label was <b>$dataValue</b>  ($percentValue of monthly total)",
     decimals: "1",
      theme: "fusion"
    },
    categories: [
      {
       // category:this.tenCatList
        category:this.catList

      }
    ],
    dataset: [



      {
        seriesname: "Avg Tenure",
        plottooltext: "Avg Tenure in $label was <b>$dataValue</b>",
        renderas: "Line",
        //data:this.tenurUpList
        data:this.curAvgLsit


      },
      {
        seriesname: "Above Avg",
        //data:this.tenurUpList
        data:this.avgMin

      },

      {
        seriesname: "Below Avg",
      // data:this.tenureDownList
      data:this.avgMax

      },
    ]

}

      })
  }


  Dateformat(datas:string){
    if (this.dateFormat=='1')
    {
      return this.datepipe.transform(datas, 'MM/dd/yyyy')
    }
    if(this.dateFormat=='2')
    {
      return this.datepipe.transform(datas, 'dd/MM/yyyy')
    }
    if(this.dateFormat== '3')
    {
      return this.datepipe.transform(datas, 'yyyy/MM/dd')
    }
  }
  getPerformanceDetail(data)
{
this.getProjectProjectDetailRevnueAndCost(data)
this.getpbiProjectDetailRoadblock(data)
this.getpbiProjectDevaition(data)
this.getpbiProjectDevaitionAllTask(data)
this.getPbiProjectDetailProgressAndCost(data)
//   this.getListProjectDetailRoadblock=[]
//   this.HTTP.getPbiProjectDetailRoadBlockList(this.setDate,this.CmpCode,data).subscribe(arg => {
//   this.getListProjectDetailRoadblock=  arg.data.table
//   this.gridsFor.refresh()
// this.gridsFor.refreshColumns()
// this.gridsFor.dataSource=this.getListProjectDetailRoadblock

// })
}
public tooltip: Tooltip;
headerCellInfo(args) {
  // if (args.cell.column.field != 'CustomerName') {
  //     const toolcontent = args.cell.column.headerText;
  //     this.tooltip = new Tooltip({
  //         position: 'BottomCenter',
  //         content: toolcontent,
  //         opensOn: 'Click'
  //     });
  //     this.tooltip.appendTo(args.node);
  // }
}
tooltipfor(args: any){
  // you can also add tooltip based on condition here
 let tooltip: Tooltip = new Tooltip({
 content: args.data[args.column.field].toString()
 }, args.cell);
}
  getPerformance(){

    this.getListEmployeePerformance=[]
    this.Loader=true
    var type
    if(this.perFormanceType==undefined || this.perFormanceType=='' || this.perFormanceType ==null)
    {
      type="All"
    }
    else{
      type=this.perFormanceType
    }
    this.HTTP.getPbiReportEmployeePerformance(this.setDate,this.CmpCode,this.departmentId,type).subscribe(arg => {
    this.getListEmployeePerformance=  arg.data.table
    this.Loader=false
    console.log('performance',arg.data.table)
    if(this.getListEmployeePerformance.length>0)
    {

      this.grids.refresh()
      this.grids.refreshColumns()
      this.grids.dataSource=this.getListEmployeePerformance
    }
    this.change.detectChanges();
    })
  }
  getListProjectPortfoliyo:any=[]
  projectStatus:any
  getProjectPortFoliyo(){
    this.getListProjectPortfoliyo=[]
    this.Loader=true
    if(this.projectStatus==undefined || this.projectStatus==null ||this.projectStatus=="")
{
  var type="All"
}
else{
  type=this.projectStatus

}

    this.HTTP.getPbiProjectPortfoliyo(this.setDate,this.CmpCode,this.departmentId,type).subscribe(arg => {
      debugger
    this.getListProjectPortfoliyo=  arg.data.table
    console.log('getListProjectPortfoliyo',arg.data.table)

    this.Loader=false
    for(var i=0;i<this.getListProjectPortfoliyo.length;i++)
    {
      if(this.getListProjectPortfoliyo[i].v_Billable==null || this.getListProjectPortfoliyo[i].v_Billable=='')
      {
        this.getListProjectPortfoliyo[i].v_Billable=0
      }
      if(this.getListProjectPortfoliyo[i].billablePer==null || this.getListProjectPortfoliyo[i].billablePer=='')
      {
        this.getListProjectPortfoliyo[i].billablePer=0
      }
      var tooltipBillableCount='E-Billable:'+Number(this.getListProjectPortfoliyo[i].billablePer)+'</br> V-Billable:'+Number(this.getListProjectPortfoliyo[i].v_Billable)
  this.getListProjectPortfoliyo[i].tooltipBillableCount=tooltipBillableCount

    var total=Number(this.getListProjectPortfoliyo[i].v_Billable)+Number(this.getListProjectPortfoliyo[i].billablePer)
  let billablePercent= Number(this.getListProjectPortfoliyo[i].billablePer)*100/total
  this.getListProjectPortfoliyo[i].billablePercent=billablePercent
  let vbillablePercent= Number(this.getListProjectPortfoliyo[i].v_Billable)*100/total
  this.getListProjectPortfoliyo[i].vbillablePercent=vbillablePercent
if(total==0)
{
  this.getListProjectPortfoliyo[i].vbillablePercent=0
  this.getListProjectPortfoliyo[i].billablePercent=0


}


  if(this.getListProjectPortfoliyo[i].nonBillablePer==null || this.getListProjectPortfoliyo[i].nonBillablePer=='')
  {
    this.getListProjectPortfoliyo[i].nonBillablePer=0
  }
  if(this.getListProjectPortfoliyo[i].vNonBillable==null || this.getListProjectPortfoliyo[i].vNonBillable=='')
  {
    this.getListProjectPortfoliyo[i].vNonBillable=0
  }
  var tooltipNonBillableCount='E-Non-Billable:'+Number(this.getListProjectPortfoliyo[i].nonBillablePer)+'<br/> V-NonBillable:'+Number(this.getListProjectPortfoliyo[i].vNonBillable)
  this.getListProjectPortfoliyo[i].tooltipNonBillableCount=tooltipNonBillableCount
  var totalbill=Number(this.getListProjectPortfoliyo[i].nonBillablePer)+Number(this.getListProjectPortfoliyo[i].vNonBillable)
let nonbillablePercent= Number(this.getListProjectPortfoliyo[i].nonBillablePer)*100/totalbill
this.getListProjectPortfoliyo[i].nonbillablePercent=nonbillablePercent
let vnonbillablePercent= Number(this.getListProjectPortfoliyo[i].vNonBillable)*100/totalbill
this.getListProjectPortfoliyo[i].vnonbillablePercent=vnonbillablePercent
if(totalbill==0)
{
  this.getListProjectPortfoliyo[i].nonbillablePercent=0
  this.getListProjectPortfoliyo[i].vnonbillablePercent=0
}

  if(this.getListProjectPortfoliyo[i].billable==null || this.getListProjectPortfoliyo[i].billable=='')
  {
    this.getListProjectPortfoliyo[i].billable=0
  }
  if(this.getListProjectPortfoliyo[i].v_BillableAmount==null || this.getListProjectPortfoliyo[i].v_BillableAmount=='')
  {
    this.getListProjectPortfoliyo[i].v_BillableAmount=0
  }
  var tooltipBillableAmount='E-Billable Amount:'+Number(this.getListProjectPortfoliyo[i].billable)+'<br/> V-BillableAmount:'+Number(this.getListProjectPortfoliyo[i].v_BillableAmount)
  this.getListProjectPortfoliyo[i].tooltipBillableAmount=tooltipBillableAmount
  var totalbillAmount=Number(this.getListProjectPortfoliyo[i].billable)+Number(this.getListProjectPortfoliyo[i].v_BillableAmount)
let billablePercentAmount= Number(this.getListProjectPortfoliyo[i].billable)*100/totalbillAmount
this.getListProjectPortfoliyo[i].billablePercentAmount=billablePercentAmount
let vbillablePercentAmount= Number(this.getListProjectPortfoliyo[i].v_BillableAmount)*100/totalbillAmount
this.getListProjectPortfoliyo[i].vbillablePercentAmount=vbillablePercentAmount
if(totalbillAmount==0)
{
  this.getListProjectPortfoliyo[i].billablePercentAmount=0
  this.getListProjectPortfoliyo[i].vbillablePercentAmount=0
}


if(this.getListProjectPortfoliyo[i].nonBillable==null || this.getListProjectPortfoliyo[i].nonBillable=='')
{
  this.getListProjectPortfoliyo[i].nonBillable=0
}
if(this.getListProjectPortfoliyo[i].V_NonBillableAmount==null || this.getListProjectPortfoliyo[i].V_NonBillableAmount=='')
{
  this.getListProjectPortfoliyo[i].V_NonBillableAmount=0
}
var tooltipNonBillableAmount='E-nonBillable Amount:'+Number(this.getListProjectPortfoliyo[i].nonBillable)+'<br/> V-nonBillableAmount:'+Number(this.getListProjectPortfoliyo[i].V_NonBillableAmount)
this.getListProjectPortfoliyo[i].tooltipNonBillableAmount=tooltipNonBillableAmount
var totalnonbillAmount=Number(this.getListProjectPortfoliyo[i].nonBillable)+Number(this.getListProjectPortfoliyo[i].V_NonBillableAmount)
let nonbillablePercentAmount= Number(this.getListProjectPortfoliyo[i].nonBillable)*100/totalnonbillAmount
this.getListProjectPortfoliyo[i].nonbillablePercentAmount=nonbillablePercentAmount
let vnonbillablePercentAmount= Number(this.getListProjectPortfoliyo[i].V_NonBillableAmount)*100/totalnonbillAmount
this.getListProjectPortfoliyo[i].vnonbillablePercentAmount=vnonbillablePercentAmount
if(totalnonbillAmount==0)
{
this.getListProjectPortfoliyo[i].nonbillablePercentAmount=0
this.getListProjectPortfoliyo[i].vnonbillablePercentAmount=0
}


if(this.getListProjectPortfoliyo[i].momclose==null || this.getListProjectPortfoliyo[i].momclose=='')
{
  this.getListProjectPortfoliyo[i].momclose=0
}
if(this.getListProjectPortfoliyo[i].momopen==null || this.getListProjectPortfoliyo[i].momopen=='')
{
  this.getListProjectPortfoliyo[i].momopen=0
}
var tooltipmom='Pending MOM:'+Number(this.getListProjectPortfoliyo[i].mompending)+'<br/>Open MOM:'+Number(this.getListProjectPortfoliyo[i].momopen)+'<br/>Close MOM:'+Number(this.getListProjectPortfoliyo[i].momclose)


this.getListProjectPortfoliyo[i].tooltipmom=tooltipmom
var totalmom=Number(this.getListProjectPortfoliyo[i].momopen)+Number(this.getListProjectPortfoliyo[i].momclose)
let momopenpercent= Number(this.getListProjectPortfoliyo[i].momopen)*100/totalmom
this.getListProjectPortfoliyo[i].momopenpercent=momopenpercent
let momclosepercent= Number(this.getListProjectPortfoliyo[i].momclose)*100/totalmom
this.getListProjectPortfoliyo[i].momclosepercent=momclosepercent
this.getListProjectPortfoliyo[i].momPendingpercent=Number(this.getListProjectPortfoliyo[i].mompending)*100/totalmom
if(totalmom==0)
{
this.getListProjectPortfoliyo[i].momclosepercent=0
this.getListProjectPortfoliyo[i].momopenpercent=0
}




if(this.getListProjectPortfoliyo[i].openRoadBlock==null || this.getListProjectPortfoliyo[i].openRoadBlock=='')
{
  this.getListProjectPortfoliyo[i].openRoadBlock=0
}
if(this.getListProjectPortfoliyo[i].closeRoadBlock==null || this.getListProjectPortfoliyo[i].closeRoadBlock=='')
{
  this.getListProjectPortfoliyo[i].closeRoadBlock=0
}
var tooltiproadblock='Open RoadBlock:'+Number(this.getListProjectPortfoliyo[i].openRoadBlock)+'<br/>Close RoadBlock:'+Number(this.getListProjectPortfoliyo[i].closeRoadBlock)


this.getListProjectPortfoliyo[i].tooltiproadblock=tooltiproadblock
var totalRoad=Number(this.getListProjectPortfoliyo[i].closeRoadBlock)+Number(this.getListProjectPortfoliyo[i].openRoadBlock)
let roadblockopenpercent= Number(this.getListProjectPortfoliyo[i].openRoadBlock)*100/totalRoad
this.getListProjectPortfoliyo[i].roadblockopenpercent=roadblockopenpercent
let roadblockclosepercent= Number(this.getListProjectPortfoliyo[i].closeRoadBlock)*100/totalRoad
this.getListProjectPortfoliyo[i].roadblockclosepercent=roadblockclosepercent
if(totalRoad==0)
{
this.getListProjectPortfoliyo[i].roadblockclosepercent=0
this.getListProjectPortfoliyo[i].roadblockopenpercent=0
}




if(this.getListProjectPortfoliyo[i].timepending==null || this.getListProjectPortfoliyo[i].timepending=='')
{
  this.getListProjectPortfoliyo[i].timepending=0
}
if(this.getListProjectPortfoliyo[i].timeapproved==null || this.getListProjectPortfoliyo[i].timeapproved=='')
{
  this.getListProjectPortfoliyo[i].timeapproved=0
}
if(this.getListProjectPortfoliyo[i].timerejected==null || this.getListProjectPortfoliyo[i].timerejected=='')
{
  this.getListProjectPortfoliyo[i].timerejected=0
}
var total=Number(this.getListProjectPortfoliyo[i].timeapproved)+Number(this.getListProjectPortfoliyo[i].timepending)
var totaltime=Number(this.getListProjectPortfoliyo[i].timerejected)+Number(this.getListProjectPortfoliyo[i].timepending)+Number(this.getListProjectPortfoliyo[i].timeapproved)
var tooltiptime='Total:'+this.getListProjectPortfoliyo[i].totaltime+'<br/>Time Pending:'+this.getListProjectPortfoliyo[i].timepending+'<br/>Time Approved:'+this.getListProjectPortfoliyo[i].timeapproved+'<br/>Time Rejected:'+this.getListProjectPortfoliyo[i].timerejected

this.getListProjectPortfoliyo[i].tooltiptime=tooltiptime
let timeopenpercent= Number(this.getListProjectPortfoliyo[i].timepending)*100/totaltime
this.getListProjectPortfoliyo[i].timeopenpercent=timeopenpercent
let timeclosepercent= Number(this.getListProjectPortfoliyo[i].timeapproved)*100/totaltime
this.getListProjectPortfoliyo[i].timeclosepercent=timeclosepercent
let timerejectedpercent= Number(this.getListProjectPortfoliyo[i].timerejected)*100/totaltime
this.getListProjectPortfoliyo[i].timerejectedpercent=timerejectedpercent
if(totaltime==0)
{
this.getListProjectPortfoliyo[i].timeopenpercent=0
this.getListProjectPortfoliyo[i].timeclosepercent=0
this.getListProjectPortfoliyo[i].timerejectedpercent=0
if(this.getListProjectPortfoliyo[i].progress==null)
{
  this.getListProjectPortfoliyo[i].progress=0
}

}
    }
    this.change.detectChanges()
    })
   
  }
  getListProjectDetailRevnureAndCost:any=[]
  costFirst:any
  costSecond:any
  marginFirst:any
  projectNameFirst:any
  projectNameSecond:any
  resourceFirst:any
  revnueSecond:any
  marginSecond:any
  resourceSecond:any
  revnueFirst:any
  startDate:any
  endDate:any
  purposedRevenue:any
  getProjectProjectDetailRevnueAndCost(data)
  {
    this.getListProjectDetailRevnureAndCost=[]
    this.Loader=true
    this.HTTP.getProjectProjectDetailRevnueAndCost(this.setDate,this.CmpCode,data,this.departmentId).subscribe(arg => {
    this.getListProjectDetailRevnureAndCost=  arg.data.table
    console.log('getListProjectDetailRevnureAndCost',arg.data.table)
    this.Loader=false
    this.costFirst=this.getListProjectDetailRevnureAndCost[0].cost
    this.purposedRevenue=this.getListProjectDetailRevnureAndCost[0].purposedRevenue
this.costSecond=this.getListProjectDetailRevnureAndCost[0].projectType
this.marginFirst= this.getListProjectDetailRevnureAndCost[0].margin
this.marginSecond=this.getListProjectDetailRevnureAndCost[0].delivery
this.projectNameFirst= this.getListProjectDetailRevnureAndCost[0].projectName
this.projectNameSecond=this.getListProjectDetailRevnureAndCost[0].projectManager
this.resourceFirst=this.getListProjectDetailRevnureAndCost[0].resource
//this.resourceSecond= this.getListProjectDetailRevnureAndCost[0].resourceSecond
this.revnueFirst=this.getListProjectDetailRevnureAndCost[0].revnue
this.revnueSecond= this.getListProjectDetailRevnureAndCost[0].projectAdmin
this.startDate=this.datepipe.transform(this.getListProjectDetailRevnureAndCost[0].startDate,'yyyy-MM-dd')

this.endDate=this.datepipe.transform(this.getListProjectDetailRevnureAndCost[0].endDate,'yyyy-MM-dd')


    })
  }

  previouslySelectedValue:any
  checkDate:any=0
  calendarName: any = "Show Calendar"
  months: any = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  onValueChange(args: any,y): void {
    //this.utilizationReportList = []

    //this.utilizationReportListsSecond = []
    this.previouslySelectedValue = args.value;
    var mon = new Date(this.previouslySelectedValue)
    var monthName = this.months[mon.getMonth()];
    this.calendarName = monthName+' '+mon.getFullYear()
    this.currentDate = this.datepipe.transform(new Date(this.previouslySelectedValue), 'yyyy-MM-dd');
    this.isDate = this.currentDate
    this.checkDate=1

if(y=='one')
{
  this.pbiActionableTimesheetList()
  this.show = false

}
else if(y=='two')
{
  this.pbiActionableCheckInCheckOutList()
  this.show = false

}
else if(y=='three')
{
  this.show = false

  if(this.checkMom==true)
{
  this.pbiActionableInsightList()

}
if(this.checkRoadBlock==true)
{
  this.pbiActionableInsightRoadBlockList()
}
if(this.checkOverDue==true)
{
  this.pbiActionableInsightOverDueList()
}

}
   // this.getResourceUtilizationReportList();
  }
  show: boolean = false
  showCalendar() {
    this.show = true

  }
  public dateValue: Object = new Date();

  currentDate: any;
  isDate:any
  clickme(x,y) {
    if (x == 'add') {
      if(this.currentDate==undefined)
      {
        dateValue = new Date();
        
      }
      else{
      var dateValue = new Date(this.currentDate);


      }

      var dateAfterChange = dateValue.setDate(dateValue.getDate() + 1);
      var mon = new Date(dateAfterChange)
      var monthName = this.months[mon.getMonth()];
      this.calendarName = monthName+mon.getFullYear()
      this.currentDate = this.datepipe.transform(new Date(dateAfterChange), 'yyyy-MM-dd');
      this.isDate = this.currentDate
    this.checkDate=1
if(y=='one')
{
  this.pbiActionableTimesheetList()

}
else if(y=='two')
{
  this.pbiActionableCheckInCheckOutList()
  
}
else if(y=='three')
{
  if(this.checkMom==true)
{
  this.pbiActionableInsightList()

}
if(this.checkRoadBlock==true)
{
  this.pbiActionableInsightRoadBlockList()
}
if(this.checkOverDue==true)
{
  this.pbiActionableInsightOverDueList()
}

}

     // this.getResourceUtilizationReportList();


    }
    if (x == 'remove') {
      if(this.currentDate==undefined)
      {
        dateValue = new Date();
        
      }
      else{
      var dateValue = new Date(this.currentDate);


      }



      var dateAfterChange = dateValue.setDate(dateValue.getDate() - 1);
      var mon = new Date(dateAfterChange)
      var monthName = this.months[mon.getMonth()];
      this.calendarName = monthName+mon.getFullYear()
      this.currentDate = this.datepipe.transform(new Date(dateAfterChange), 'yyyy-MM-dd');
      this.isDate = this.currentDate
    this.checkDate=1


     // this.getResourceUtilizationReportList();
     if(y=='one')
     {
  this.pbiActionableTimesheetList()
     
     }
     else if(y=='two')
     {
      this.pbiActionableCheckInCheckOutList()
       
     }
     else if(y=='three')
{
  if(this.checkMom==true)
{
  this.pbiActionableInsightList()

}
if(this.checkRoadBlock==true)
{
  this.pbiActionableInsightRoadBlockList()
}
if(this.checkOverDue==true)
{
  this.pbiActionableInsightOverDueList()
}

}

    }

    if (x == 'addweek') {


      if(this.currentDate==undefined)
      {
        dateValue = new Date();
        
      }
      else{
      var dateValue = new Date(this.currentDate);


      }



      var dateAfterChange = dateValue.setMonth(dateValue.getMonth() + 1);
      var mon = new Date(dateAfterChange)
      var monthName = this.months[mon.getMonth()];
      this.calendarName = monthName+mon.getFullYear()
      this.currentDate = this.datepipe.transform(new Date(dateAfterChange), 'yyyy-MM-dd');
      this.isDate = this.currentDate
      this.checkDate=1

      //this.getResourceUtilizationReportList();


      if(y=='one')
      {
  this.pbiActionableTimesheetList()
      
      }
      else if(y=='two')
      {
      this.pbiActionableCheckInCheckOutList()
        
      }
      else if(y=='three')
{
  if(this.checkMom==true)
{
  this.pbiActionableInsightList()

}
if(this.checkRoadBlock==true)
{
  this.pbiActionableInsightRoadBlockList()
}
if(this.checkOverDue==true)
{
  this.pbiActionableInsightOverDueList()
}

}
    }

    if (x == 'removeweek') {

     // this.utilizationReportList = []

      //this.utilizationReportListsSecond = []
      if(this.currentDate==undefined)
      {
        dateValue = new Date();
        
      }
      else{
      var dateValue = new Date(this.currentDate);


      }




var monthn=dateValue.getMonth() - 1
      var dateAfterChange = dateValue.setMonth(monthn);
      var mon = new Date(dateAfterChange)
      var monthName = this.months[mon.getMonth()];
      this.calendarName = monthName+mon.getFullYear()
      this.currentDate = this.datepipe.transform(new Date(dateAfterChange), 'yyyy-MM-dd');
      this.isDate = this.currentDate
      this.checkDate=1

    ///  this.getResourceUtilizationReportList();

    if(y=='one')
    {
  this.pbiActionableTimesheetList()
    
    }
    else if(y=='two')
    {
    this.pbiActionableCheckInCheckOutList()
      
    }
    else if(y=='three')
{
  if(this.checkMom==true)
{
  this.pbiActionableInsightList()

}
if(this.checkRoadBlock==true)
{
  this.pbiActionableInsightRoadBlockList()
}
if(this.checkOverDue==true)
{
  this.pbiActionableInsightOverDueList()
}

}

    }
  }

  pAndLType:any

 changeProjectPAndLStatus(e)
 {
  this.pAndLType=e.target.value
  this.getProjectProjectDetailPAndLGridList()
 }
  getListProjectDetailPAndLGridList:any=[]
   getListProjectDetailPAndLGridListAfter:any=[]

getProjectProjectDetailPAndLGridList(){
  this.Loader=true
  this.getListProjectDetailPAndLGridList=[]
  // this.getListProjectDetailPAndLGridListAfter=[]

  if(this.pAndLType==undefined ||this.pAndLType=="" || this.pAndLType==null)
  {
  var type="All"

  }
  else{
  type=this.pAndLType
  }

  this.HTTP.getPbiProjectDetailPAndLGridList(this.setDate,this.CmpCode,this.departmentId,type).subscribe(arg => {
  this.Loader=false
  this.getListProjectDetailPAndLGridList=  arg.data.table

  var sum=0

  for(var i=0;i<this.getListProjectDetailPAndLGridList.length;i++){
  if(this.getListProjectDetailPAndLGridList[i].margin==null)
  {
  this.getListProjectDetailPAndLGridList[i].margin=0
  }
  var margintwo=100-Number(this.getListProjectDetailPAndLGridList[i].margin)
  var marginpercent=Number(this.getListProjectDetailPAndLGridList[i].margin)
  sum+=this.getListProjectDetailPAndLGridList[i].margin
  }

  var avgSum=sum/this.getListProjectDetailPAndLGridList.length
  for(var i=0;i<this.getListProjectDetailPAndLGridList.length;i++){
  if(this.getListProjectDetailPAndLGridList[i].margin==null)
  {
  this.getListProjectDetailPAndLGridList[i].margin=0
  }
  if(this.getListProjectDetailPAndLGridList[i].margin>avgSum)
  {
  var isActive=0

  }
  else
  {
  isActive=1
  }
  this.getListProjectDetailPAndLGridList[i].isActive=isActive
  }
  this.getListProjectDetailPAndLGridListAfter=this.getListProjectDetailPAndLGridList
  this.change.detectChanges();
  })

  }
  customerExpenseCurrentYearGrowth:any
customerExpenseCurrentYearGrowthYoy:any
customerExpenseCurrentYearYoy:any
customerExpenseCurrentYear:any
  getListExpenseDetailList:any=[]
  serviceProviderPreviousYearGrowth:any
    serviceProviderPreviousYear:any
    customerExpensePreviousYear:any
    serviceProviderCurrentYearYoy:any
    serviceProviderCurrentYearGrowthYoy:any
    serviceProviderCurrentYear:any
    serviceProviderCurrentYearGrowth:any
    customerExpensePreviousYearGrowth:any
    customerExpenseCurrentYearGrowthPercent:any
    customerExpenseCurrentYearGrowthYoyPercent:any
    customerExpensePreviousYearGrowthPercent:any
    serviceProviderCurrentYearGrowthPercent:any
    serviceProviderCurrentYearGrowthYoyPercent:any
    serviceProviderPreviousYearGrowthPercent:any
    customerExpenseCurrentYearGrowthPercentimg:any
customerExpenseCurrentYearGrowthYoyPercentimg:any
customerExpensePreviousYearGrowthPercentimg:any
serviceProviderCurrentYearGrowthPercentimg:any

serviceProviderCurrentYearGrowthYoyPercentimg:any
serviceProviderPreviousYearGrowthPercentimg:any
totalExpenseCurrentYear:any
    totalExpenseCurrentYearGrowth:any

 totalExpensePreviousYear:any
totalExpensePreviousYearGrowth:any
 totalExpenseCurrentYearYoy:any
totalExpenseCurrentYearYoyGrowth:any
totalExpenseCurrentYearYoyGrowthPercent:any
totalExpensePreviousYearGrowthPercent:any
totalExpenseCurrentYearGrowthPercent:any
totalExpenseCurrentYearYoyGrowthPercentimg:any
totalExpensePreviousYearGrowthPercentimg:any
expenseCurrentYear:any
expensePreviousYear:any
totalExpenseCurrentYearGrowthPercentimg:any
serviceProviderPreviousYearGrowthYoy:any
serviceProviderPreviousYearYoy:any
serviceProviderPreviousYearGrowthYoyPercent:any
serviceProviderPreviousYearGrowthYoyPercentimg:any

totalExpensePreviousYearYoy:any
totalExpensePreviousYearYoyGrowth:any
totalExpensePreviousYearYoyGrowthPercent:any
totalExpensePreviousYearYoyGrowthPercentimg:any
customerExpensePreviousYearGrowthYoyPercent:any
customerExpensePreviousYearGrowthYoy:any
customerExpensePreviousYearYoy:any
customerExpensePreviousYearGrowthYoyPercentimg:any
  getProjectExpenseDetailList()
  {
    this.getListExpenseDetailList=[]
    this.Loader=true
    this.HTTP.getPbiExpenseDetailList(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
    this.getListExpenseDetailList=  arg.data.table
    console.log('getListExpenseDetailList',arg.data.table)

    this.Loader=false
   this.expenseCurrentYear=this.getListExpenseDetailList[0].expenseCurrentYear
     this.expensePreviousYear=this.getListExpenseDetailList[0].expensePreviousYear
    this.customerExpenseCurrentYear=this.getListExpenseDetailList[0].customerExpenseCurrentYear
    this.customerExpenseCurrentYearGrowth=this.getListExpenseDetailList[0].customerExpenseCurrentYearGrowth
this.customerExpenseCurrentYearGrowthPercent=(this.customerExpenseCurrentYear-this.customerExpenseCurrentYearGrowth)*100/this.customerExpenseCurrentYearGrowth
if(this.customerExpenseCurrentYearGrowth==0)
{
  this.customerExpenseCurrentYearGrowthPercent=0
}

if(this.customerExpenseCurrentYearGrowthPercent>0)
{
  this.customerExpenseCurrentYearGrowthPercentimg=this.downUrl
}

else if(this.customerExpenseCurrentYearGrowthPercent<0){
  this.customerExpenseCurrentYearGrowthPercentimg=this.upUrl
}


this.customerExpenseCurrentYearGrowthYoy=this.getListExpenseDetailList[0].customerExpenseCurrentYearGrowthYoy

    this.customerExpenseCurrentYearYoy=this.getListExpenseDetailList[0].customerExpenseCurrentYearYoy
    this.customerExpenseCurrentYearGrowthYoyPercent=(this.customerExpenseCurrentYearYoy-this.customerExpenseCurrentYearGrowthYoy)*100/this.customerExpenseCurrentYearGrowthYoy
    if(this.customerExpenseCurrentYearGrowthYoy==0)
    {
      this.customerExpenseCurrentYearGrowthYoyPercent=0
    }
    if(this.customerExpenseCurrentYearGrowthYoyPercent>0)
{
  this.customerExpenseCurrentYearGrowthYoyPercentimg=this.downUrl
}
else if(this.customerExpenseCurrentYearGrowthYoyPercent<0){
  this.customerExpenseCurrentYearGrowthYoyPercentimg=this.upUrl
}


this.customerExpensePreviousYearGrowthYoy=this.getListExpenseDetailList[0].customerExpensePreviousYearGrowthYoy

    this.customerExpensePreviousYearYoy=this.getListExpenseDetailList[0].customerExpensePreviousYearYoy
    this.customerExpensePreviousYearGrowthYoyPercent=(this.customerExpensePreviousYearYoy-this.customerExpensePreviousYearGrowthYoy)*100/this.customerExpensePreviousYearGrowthYoy==0?1:this.customerExpensePreviousYearGrowthYoy
    if(this.customerExpenseCurrentYearGrowthYoy==0)
    {
      this.customerExpensePreviousYearGrowthYoyPercent=0
    }
    if(this.customerExpensePreviousYearGrowthYoyPercent>0)
{
  this.customerExpensePreviousYearGrowthYoyPercentimg=this.downUrl
}
else if(this.customerExpensePreviousYearGrowthYoyPercent<0){
  this.customerExpensePreviousYearGrowthYoyPercentimg=this.upUrl
}



    this.customerExpensePreviousYear=this.getListExpenseDetailList[0].customerExpensePreviousYear
    this.customerExpensePreviousYearGrowth=this.getListExpenseDetailList[0].customerExpensePreviousYearGrowth
   this.customerExpensePreviousYearGrowthPercent=(this.customerExpensePreviousYear-this.customerExpensePreviousYearGrowth)*100/this.customerExpensePreviousYearGrowth
   if(this.customerExpensePreviousYearGrowth==0)
    {
      this.customerExpensePreviousYearGrowthPercent=0
    }

   if(this.customerExpensePreviousYearGrowthPercent>0)
   {
     this.customerExpensePreviousYearGrowthPercentimg=this.downUrl
   }
   else if(this.customerExpensePreviousYearGrowthPercent<0){
     this.customerExpensePreviousYearGrowthPercentimg=this.upUrl
   }
    this.serviceProviderCurrentYear=this.getListExpenseDetailList[0].serviceProviderCurrentYear
    this.serviceProviderCurrentYearGrowth=this.getListExpenseDetailList[0].serviceProviderCurrentYearGrowth

    this.serviceProviderCurrentYearGrowthPercent=(this.serviceProviderCurrentYearGrowth-this.serviceProviderCurrentYearGrowth)*100/this.serviceProviderCurrentYearGrowth

    if(this.serviceProviderCurrentYearGrowth==0)
    {
      this.serviceProviderCurrentYearGrowthPercent=0
    }
    if(this.serviceProviderCurrentYearGrowthPercent>0)
   {
     this.serviceProviderCurrentYearGrowthPercentimg=this.downUrl
   }
   else if(this.serviceProviderCurrentYearGrowthPercent<0){
     this.serviceProviderCurrentYearGrowthPercentimg=this.upUrl
   }

   this.serviceProviderCurrentYearGrowthYoy=this.getListExpenseDetailList[0].serviceProviderCurrentYearGrowthYoy
    this.serviceProviderCurrentYearYoy=this.getListExpenseDetailList[0].serviceProviderCurrentYearYoy
    this.serviceProviderCurrentYearGrowthYoyPercent=(this.serviceProviderCurrentYearYoy-this.serviceProviderCurrentYearGrowthYoy)*100/this.serviceProviderCurrentYearGrowthYoy
    if(this.serviceProviderCurrentYearGrowthYoy==0)
    {
      this.serviceProviderCurrentYearGrowthYoyPercent=0
    }

    if(this.serviceProviderCurrentYearGrowthYoyPercent>0)
    {
      this.serviceProviderCurrentYearGrowthYoyPercentimg=this.downUrl
    }
    else if(this.serviceProviderCurrentYearGrowthYoyPercent<0){
      this.serviceProviderCurrentYearGrowthYoyPercentimg=this.upUrl
    }
    this.serviceProviderPreviousYearGrowthYoy=this.getListExpenseDetailList[0].serviceProviderPreviousYearGrowthYoy

    this.serviceProviderPreviousYearYoy=this.getListExpenseDetailList[0].serviceProviderPreviousYearYoy
    this.serviceProviderPreviousYearGrowthYoyPercent=(this.serviceProviderPreviousYearYoy-this.serviceProviderPreviousYearGrowthYoy)*100/this.serviceProviderPreviousYearGrowthYoy
    if(this.serviceProviderPreviousYearGrowthYoy==0)
    {
      this.serviceProviderPreviousYearGrowthYoyPercent=0
    }

    if(this.serviceProviderPreviousYearGrowthYoyPercent>0)
    {
      this.serviceProviderPreviousYearGrowthYoyPercentimg=this.downUrl
    }
    else if(this.serviceProviderPreviousYearGrowthYoyPercent<0){
      this.serviceProviderPreviousYearGrowthYoyPercentimg=this.upUrl
    }

    this.serviceProviderPreviousYear=this.getListExpenseDetailList[0].serviceProviderPreviousYear

this.serviceProviderPreviousYearGrowth=this.getListExpenseDetailList[0].serviceProviderPreviousYearGrowth
    this.serviceProviderPreviousYearGrowthPercent=(this.serviceProviderPreviousYear-this.serviceProviderPreviousYearGrowth)*100/this.serviceProviderPreviousYearGrowth
    if(this.serviceProviderPreviousYearGrowth==0)
    {
      this.serviceProviderPreviousYearGrowthPercent=0
    }

    if(this.serviceProviderPreviousYearGrowthPercent>0)
    {
      this.serviceProviderPreviousYearGrowthPercentimg=this.downUrl
    }
    else if(this.serviceProviderPreviousYearGrowthPercent<0){
      this.serviceProviderPreviousYearGrowthPercentimg=this.upUrl
    }

   this.totalExpenseCurrentYear=this.getListExpenseDetailList[0].totalExpenseCurrentYear
    this.totalExpenseCurrentYearGrowth=this.getListExpenseDetailList[0].totalExpenseCurrentYearGrowth
 this.totalExpenseCurrentYearGrowthPercent=(this.totalExpenseCurrentYear-this.totalExpenseCurrentYearGrowth)*100/this.totalExpenseCurrentYearGrowth
 if(this.totalExpenseCurrentYearGrowth==0)
 {
   this.totalExpenseCurrentYearGrowthPercent=0
 }

 if(this.totalExpenseCurrentYearGrowthPercent>0)
 {
   this.totalExpenseCurrentYearGrowthPercentimg=this.downUrl
 }
 else if(this.totalExpenseCurrentYearGrowthPercent<0){
   this.totalExpenseCurrentYearGrowthPercentimg=this.upUrl
 }

    this.totalExpensePreviousYear=this.getListExpenseDetailList[0].totalExpensePreviousYear
this.totalExpensePreviousYearGrowth=this.getListExpenseDetailList[0].totalExpensePreviousYearGrowth
this.totalExpensePreviousYearGrowthPercent=(this.totalExpensePreviousYear-this.totalExpensePreviousYearGrowth)*100/this.totalExpensePreviousYearGrowth
if(this.totalExpensePreviousYearGrowth==0)
{
  this.totalExpensePreviousYearGrowthPercent=0
}

if(this.totalExpensePreviousYearGrowthPercent>0)
{
  this.totalExpensePreviousYearGrowthPercentimg=this.downUrl
}
else if(this.totalExpensePreviousYearGrowthPercent<0){
  this.totalExpensePreviousYearGrowthPercentimg=this.upUrl
}

this.totalExpenseCurrentYearYoy=this.getListExpenseDetailList[0].totalExpenseCurrentYearYoy
this.totalExpenseCurrentYearYoyGrowth=this.getListExpenseDetailList[0].totalExpenseCurrentYearYoyGrowth
this.totalExpenseCurrentYearYoyGrowthPercent=(this.totalExpenseCurrentYearYoy-this.totalExpenseCurrentYearYoyGrowth)*100/this.totalExpenseCurrentYearYoyGrowth

if(this.totalExpenseCurrentYearYoyGrowth==0)
{
  this.totalExpenseCurrentYearYoyGrowthPercent=0
}

if(this.totalExpenseCurrentYearYoyGrowthPercent>0)
{
  this.totalExpenseCurrentYearYoyGrowthPercentimg=this.downUrl
}
else if(this.totalExpenseCurrentYearYoyGrowthPercent<0){
  this.totalExpenseCurrentYearYoyGrowthPercentimg=this.upUrl
}
this.totalExpensePreviousYearYoy=this.getListExpenseDetailList[0].totalExpensePreviousYearYoy
this.totalExpensePreviousYearYoyGrowth=this.getListExpenseDetailList[0].totalExpensePreviousYearYoyGrowth
this.totalExpensePreviousYearYoyGrowthPercent=(this.totalExpensePreviousYearYoy-this.totalExpensePreviousYearYoyGrowth)*100/this.totalExpensePreviousYearYoyGrowth

if(this.totalExpensePreviousYearYoyGrowth==0)
{
  this.totalExpensePreviousYearYoyGrowthPercent=0
}

if(this.totalExpensePreviousYearYoyGrowthPercent>0)
{
  this.totalExpensePreviousYearYoyGrowthPercentimg=this.downUrl
}
else if(this.totalExpensePreviousYearYoyGrowthPercent<0){
  this.totalExpensePreviousYearYoyGrowthPercentimg=this.upUrl
}


})
  }
  getListBuinessList:any=[]
  buisnesscurrentYear:any;
  buisnesspreviousYear:any;
  previousYearRevnuePercent:any
previousYearRevnue:any
previousYearProjectMoney:any
currentYearResourcePercent:any
previousYearProjectMoneyPercent:any
previousYearResource:any
previousYearResourcePercent:any
currentYearProjectCount:any
currentYearProjectCountPercent:any
currentYearProjectMoney:any
currentYearProjectMoneyPercent:any
     currentYearResource:any
     currentYearRevnue:any
previousYearProjectCountPercent:any
previousYearProjectCount:any
currentYearRevnuePercent:any
previousYearProjectCountPercentGrowth:any
previousYearProjectCountPercentGrowthimg:any
previousYearProjectMoneyPercentGrowth:any
previousYearProjectMoneyPercentGrowthimg:any
previousYearResourcePercentGrowth:any
previousYearResourcePercentGrowthimg:any
previousYearRevnuePercentGrowth:any
previousYearRevnuePercentGrowthimg:any
currentYearRevnuePercentGrowth:any
currentYearRevnuePercentGrowthimg:any
currentYearResourcePercentGrowth:any
currentYearResourcePercentGrowthimg:any
currentYearProjectMoneyPercentGrowth:any
currentYearProjectMoneyPercentGrowthimg:any
currentYearProjectCountPercentGrowth:any
currentYearProjectCountPercentGrowthimg:any
currentYearpropose:any
currentYearproposePercent:any
previousYearpropose:any
previousYearproposePercent:any
previousYearproposePercentGrowth:any
currentYearproposePercentGrowth:any
previousYearproposePercentGrowthimg:any
currentYearproposePercentGrowthimg:any
  getProjectBuisinessProjectList()
  {
    this.getListBuinessList=[]
    this.Loader=true
    this.HTTP.getPbiBuisnessDetailList(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
    this.getListBuinessList=  arg.data.table
    console.log('getListBuinessList',arg.data.table)

    this.Loader=false
   this.buisnesscurrentYear=this.getListBuinessList[0].currentYear
     this.buisnesspreviousYear=this.getListBuinessList[0].previousYear
    
this.currentYearpropose=this.getListBuinessList[0].currentYearpropose
this.currentYearproposePercent=this.getListBuinessList[0].currentYearproposePercent
this.currentYearproposePercentGrowth=(this.currentYearpropose-this.currentYearproposePercent)*100/this.currentYearproposePercent
if(this.currentYearproposePercent===0)
{
  this.currentYearproposePercentGrowth=0
}
if(this.currentYearproposePercentGrowth>0)
{
  this.currentYearproposePercentGrowthimg=this.downUrl

}


if(this.currentYearproposePercentGrowth<0)
{
  this.currentYearproposePercentGrowthimg=this.upUrl

}
this.previousYearpropose=this.getListBuinessList[0].previousYearpropose
this.previousYearproposePercent=this.getListBuinessList[0].previousYearproposePercent
this.previousYearproposePercentGrowth=(this.previousYearpropose-this.previousYearproposePercent)*100/this.previousYearproposePercent
if(this.previousYearproposePercent===0)
{
  this.previousYearproposePercentGrowth=0
}
if(this.previousYearproposePercentGrowth>0)
{
  this.previousYearproposePercentGrowthimg=this.downUrl

}
if(this.previousYearproposePercentGrowth<0)
{
  this.previousYearproposePercentGrowthimg=this.upUrl

}
this.currentYearProjectCount=this.getListBuinessList[0].currentYearProjectCount
this.currentYearProjectCountPercent=this.getListBuinessList[0].currentYearProjectCountPercent
this.currentYearProjectCountPercentGrowth=(this.currentYearProjectCount-this.currentYearProjectCountPercent)*100/this.currentYearProjectCountPercent
if(this.currentYearProjectCountPercent==0)
{
  this.currentYearProjectCountPercentGrowth=0
}
debugger
if(this.currentYearProjectCountPercentGrowth>0)
{
  this.currentYearProjectCountPercentGrowthimg=this.downUrl
}
else if(this.currentYearProjectCountPercentGrowth<0){
  this.currentYearProjectCountPercentGrowthimg=this.upUrl
}



this.currentYearProjectMoney=this.getListBuinessList[0].currentYearProjectMoney
this.currentYearProjectMoneyPercent=this.getListBuinessList[0].currentYearProjectMoneyPercent

this.currentYearProjectMoneyPercentGrowth=(this.currentYearProjectMoney-this.currentYearProjectMoneyPercent)*100/this.currentYearProjectMoneyPercent
if(this.currentYearProjectMoneyPercent==0)
{
  this.currentYearProjectMoneyPercentGrowth=0
}
if(this.currentYearProjectMoneyPercentGrowth>0)
{
  this.currentYearProjectMoneyPercentGrowthimg=this.downUrl
}

else if(this.currentYearProjectMoneyPercentGrowth<0) {
  this.currentYearProjectMoneyPercentGrowthimg=this.upUrl
}

this.currentYearResource=this.getListBuinessList[0].currentYearResource
this.currentYearResourcePercent=this.getListBuinessList[0].currentYearResourcePercent
this.currentYearResourcePercentGrowth=(this.currentYearResource-this.currentYearResourcePercent)*100/this.currentYearResourcePercent
if(this.currentYearResourcePercent==0)
{
  this.currentYearResourcePercentGrowth=0
}
if(this.currentYearResourcePercentGrowth>0)
{
  this.currentYearResourcePercentGrowthimg=this.downUrl
}
else if(this.currentYearResourcePercentGrowth<0){
  this.currentYearResourcePercentGrowthimg=this.upUrl
}

this.currentYearRevnue=this.getListBuinessList[0].currentYearRevnue

this.currentYearRevnuePercent=this.getListBuinessList[0].currentYearRevnuePercent
this.currentYearRevnuePercentGrowth=(this.currentYearRevnue-this.currentYearRevnuePercent)*100/this.currentYearRevnuePercent
if(this.currentYearRevnuePercent==0)
{
  this.currentYearRevnuePercentGrowth=0
}
if(this.currentYearRevnuePercentGrowth>0)
{
  this.currentYearRevnuePercentGrowthimg=this.downUrl
}
else if(this.currentYearRevnuePercentGrowth<0){
  this.currentYearRevnuePercentGrowthimg=this.upUrl
}
this.previousYearProjectCount=this.getListBuinessList[0].previousYearProjectCount
this.previousYearProjectCountPercent=this.getListBuinessList[0].previousYearProjectCountPercent
this.previousYearProjectCountPercentGrowth=(this.previousYearProjectCount-this.previousYearProjectCountPercent)*100/this.previousYearProjectCountPercent
if(this.previousYearProjectCountPercent==0)
{
  this.previousYearProjectCountPercentGrowth=0
}
if(this.previousYearProjectCountPercentGrowth>0)
{
  this.previousYearProjectCountPercentGrowthimg=this.downUrl
}
else if(this.previousYearProjectCountPercentGrowth<0){
  this.previousYearProjectCountPercentGrowthimg=this.upUrl
}
this.previousYearProjectMoney=this.getListBuinessList[0].previousYearProjectMoney
this.previousYearProjectMoneyPercent=this.getListBuinessList[0].previousYearProjectMoneyPercent

this.previousYearProjectMoneyPercentGrowth=(this.previousYearProjectMoney-this.previousYearProjectMoneyPercent)*100/this.previousYearProjectMoneyPercent
if(this.previousYearProjectMoneyPercent==0)
{
this.previousYearProjectMoneyPercentGrowth=0
}
if(this.previousYearProjectMoneyPercentGrowth>0)
{
  this.previousYearProjectMoneyPercentGrowthimg=this.downUrl
}
else if(this.previousYearProjectMoneyPercentGrowth<0)
{
this.previousYearProjectMoneyPercentGrowthimg=this.upUrl
}

this.previousYearResource=this.getListBuinessList[0].previousYearResource
this.previousYearResourcePercent=this.getListBuinessList[0].previousYearResourcePercent
this.previousYearResourcePercentGrowth=(this.previousYearResource-this.previousYearResourcePercent)*100/this.previousYearResourcePercent
if(this.previousYearResourcePercent==0)
{
this.previousYearResourcePercentGrowth=0
}
if(this.previousYearResourcePercentGrowth>0)
{
  this.previousYearResourcePercentGrowthimg=this.downUrl
}
else if(this.previousYearResourcePercentGrowth<0)
{
this.previousYearResourcePercentGrowthimg=this.upUrl
}

this.previousYearRevnue=this.getListBuinessList[0].previousYearRevnue
this.previousYearRevnuePercent=this.getListBuinessList[0].previousYearRevnuePercent
this.previousYearRevnuePercentGrowth=(this.previousYearRevnue-this.previousYearRevnuePercent)*100/this.previousYearRevnuePercent
if(this.previousYearRevnuePercent==0)
{
this.previousYearRevnuePercentGrowth=0
}
if(this.previousYearRevnuePercentGrowth>0)
{
  this.previousYearRevnuePercentGrowthimg=this.downUrl
}
else if(this.previousYearRevnuePercentGrowth<0)
{
this.previousYearRevnuePercentGrowthimg=this.upUrl
}



})
  }
  peopleCurrentYear:any
  getListBuinessPeopleList:any=[]
  currentYearAttrition:any
    currentYearBillable:any
    currentYearCostR:any
    currentYearNonBillable:any
    currentYearRevenueR:any
    currentYearTotalMoney:any
    currentYearTotalNumber:any
    peoplePreviousYear:any
    previousYearBillable:any
    previousYearCostR:any
    previousYearNonBillable:any
    previousYearTotalMoney:any
    previousYearAttrition:any
    previousYearTotalNumber:any
previousYearRevenueR:any
  getProjectBuisinessPeopleList()
  {
    this.getListBuinessPeopleList=[]
    this.Loader=true
    this.HTTP.getPbiBuisnessPeopleDetailList(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
    this.getListBuinessPeopleList=  arg.data.table
    console.log('getListBuinessPeopleList',arg.data.table)

    this.Loader=false
    this.peopleCurrentYear=this.getListBuinessPeopleList[0].currentYear
  

this.currentYearAttrition=this.getListBuinessPeopleList[0].currentYearAttrition
this.currentYearBillable=this.getListBuinessPeopleList[0].currentYearBillable
this.currentYearCostR=this.getListBuinessPeopleList[0].currentYearCostR
this.currentYearNonBillable=this.getListBuinessPeopleList[0].currentYearNonBillable
this.currentYearRevenueR=this.getListBuinessPeopleList[0].currentYearRevenueR
this.currentYearTotalMoney=this.getListBuinessPeopleList[0].currentYearTotalMoney
this.currentYearTotalNumber=this.getListBuinessPeopleList[0].currentYearTotalNumber
this.peoplePreviousYear=this.getListBuinessPeopleList[0].previousYear
this.previousYearAttrition=this.getListBuinessPeopleList[0].previousYearAttrition
this.previousYearBillable=this.getListBuinessPeopleList[0].previousYearBillable
this.previousYearCostR=this.getListBuinessPeopleList[0].previousYearCostR
this.previousYearNonBillable=this.getListBuinessPeopleList[0].previousYearNonBillable
this.previousYearRevenueR=this.getListBuinessPeopleList[0].previousYearRevenueR
this.previousYearTotalMoney=this.getListBuinessPeopleList[0].previousYearTotalMoney

this.previousYearTotalNumber=this.getListBuinessPeopleList[0].previousYearTotalNumber
    })}
    getListBuinessExpenseList:any=[]
    previousYearExpense:any
    currentYearExpense:any
    expensepreviousYearTotalNumber:any
expensepreviousYearExpense:any
expensepreviousYearNonBillable:any
expensepreviousYearBillable:any
expensecurrentYearNonBillable:any
expensecurrentYearTotalNumber:any
expensecurrentYearBillable:any
expensecurrentYearExpense:any
expensepeoplePreviousYear:any
    getProjectBuisinessExpenseList()
    {
      this.getListBuinessExpenseList=[]
      this.Loader=true
      this.HTTP.getPbiBuisnessExpenseDetailList(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getListBuinessExpenseList=  arg.data.table

      console.log('getListBuinessExpenseList',arg.data.table)
  
      this.Loader=false
      this.expenseCurrentYear=this.getListBuinessExpenseList[0].currentYear
this.expensecurrentYearBillable=this.getListBuinessExpenseList[0].currentYearBillable
this.expensecurrentYearNonBillable=this.getListBuinessExpenseList[0].currentYearNonBillable
this.expensecurrentYearExpense=this.getListBuinessExpenseList[0].currentYearExpense
this.expensecurrentYearTotalNumber=this.getListBuinessExpenseList[0].currentYearTotalNumber
this.expensepeoplePreviousYear=this.getListBuinessExpenseList[0].previousYear
this.expensepreviousYearBillable=this.getListBuinessExpenseList[0].previousYearBillable
this.expensepreviousYearNonBillable=this.getListBuinessExpenseList[0].previousYearNonBillable
this.expensepreviousYearExpense=this.getListBuinessExpenseList[0].previousYearExpense

this.expensepreviousYearTotalNumber=this.getListBuinessExpenseList[0].previousYearTotalNumber
      })
    }
  getListEmployeePerformance:any=[]
  getpbiPeopleEmployeePerformance(){
      let cmpcode=1
      let year='2022-02-20'
      this.getListEmployeePerformance=[]
      this.Loader=true
      var type
      if(this.perFormanceType==undefined || this.perFormanceType=='' || this.perFormanceType ==null)
      {
        type="All"
      }
      else{
        type=this.perFormanceType
      }
      this.HTTP.getPbiReportEmployeePerformance(this.setDate,this.CmpCode,this.departmentId,type).subscribe(arg => {
      this.getListEmployeePerformance=  arg.data.table
    console.log('getListEmployeePerformance',arg.data.table)

      if(this.getListEmployeePerformance.length>0)
      {
        this.Loader=false
        this.grids.refresh()
        this.grids.refreshColumns()

      }
//       designationId: 15
// designationName:


      // this.dataempoyeevsvendor = {
      //   chart: {
      //     "numberPrefix": "$",
      //     "bgColor": "#ffffff",
      //     "startingAngle": "100",
      //     "showLegend": "1",
      //     "defaultCenterLabel": "",
      //     "centerLabel": "Revenue from $label: $value",
      //     "centerLabelBold": "1",
      //     "showTooltip": "0",
      //     "decimals": "0",
      //     'paletteColors' :'7bb7ed, e4d556',
      //     "theme": "fusion"
      //   },
      //   "data": this.dataEmployeeVsVendor
      // };


      })
  }



  getListEmployeeAttrition:any=[]
  dataEmployeeAttrition:any=[]
  dataempoyeeattrition:any
  PercentList:any=[]
  catAttritionList:any=[]
  getpbiPeopleEmployeeAttrition(){
    let cmpcode=1
    let year='2022-02-20'
    this.getListEmployeeAttrition=[]
    this.dataEmployeeAttrition=[]
    this.PercentList=[]
    this.catAttritionList=[]
    this.Loader=true
    this.HTTP.etPbiReportEmployeeAttrition(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
    this.getListEmployeeAttrition=  arg.data.table
    console.log('getListEmployeeAttrition',arg.data.table)

    this.Loader=false
//       designationId: 15
// designationName:
var getColor=[]

for(var i=0;i<this.getListEmployeeAttrition.length;i++)
{
getColor.push(this.setColor[i])
}
    for(var i=0;i<this.getListEmployeeAttrition.length;i++)
    {
this.catAttritionList.push({"label":this.getListEmployeeAttrition[i].monthNames})

    }
    for(var i=0;i<this.getListEmployeeAttrition.length;i++)
    {
this.PercentList.push({"value":this.getListEmployeeAttrition[i].avgPercent})

    }
    for(var i=0;i<this.getListEmployeeAttrition.length;i++)
    {
this.dataEmployeeAttrition.push({"value":this.getListEmployeeAttrition[i].employee})

    }
// this.dataempoyeeattrition = {
//   "chart": {
//     "theme": "fusion",
//     "subCaption": "Last month",
//     "xAxisName": "Reported Cause",
//     "pYAxisName": "No. of Occurrence",
//     "sYAxisname": "Cumulative Percentage",
//     "showValues": "0",
//     "showXAxisLine": "1",
//     'paletteColors' :getColor.toString(),
//     "showLineValues": "1"
//   },
//   "data":this.dataEmployeeAttrition
// };
this.dataempoyeeattrition = {
  chart: {
    //caption: "Analysing Subsidies by Youth Population",
    //subcaption: "By province",
    yaxisname: "",
    syaxisname: "",
    labeldisplay: "rotate",
    snumbersuffix: "",
    scrollheight: "10",
    numvisibleplot: "10",
    drawcrossline: "1",
    theme: "fusion"
  },
  categories: [
    {
      category:this.catAttritionList
    }
  ],
  dataset: [
    {
      seriesname: "Employee Count",
    //  plottooltext: "Employee: $dataValue",
      data:this.dataEmployeeAttrition
    },

    // {
    //   seriesname: "Percentage",
    //   parentyaxis: "S",
    //   renderas: "line",
    //   showvalues: "0",
    //   data: this.dataEmployeeAttrition
    // }
  ]
};


    // this.dataempoyeevsvendor = {
    //   chart: {
    //     "numberPrefix": "$",
    //     "bgColor": "#ffffff",
    //     "startingAngle": "100",
    //     "showLegend": "1",
    //     "defaultCenterLabel": "",
    //     "centerLabel": "Revenue from $label: $value",
    //     "centerLabelBold": "1",
    //     "showTooltip": "0",
    //     "decimals": "0",
    //     'paletteColors' :'7bb7ed, e4d556',
    //     "theme": "fusion"
    //   },
    //   "data": this.dataEmployeeVsVendor
    // };


    })
}



  getListJobband:any=[]
  dataJobband:any=[]
  datajobband:any
  getpbiPeopleJoband(){
      let cmpcode=1
      let year='2022-02-20'
      this.getListJobband=[]
      this.dataJobband=[]
      this.Loader=true
      this.HTTP.getPbiReportJobband(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getListJobband=  arg.data.table
    console.log('getListJobband',arg.data.table)

      this.Loader=false
//       designationId: 15
// designationName:
var getColor=[]

for(var i=0;i<this.getListJobband.length;i++)
{
  getColor.push(this.setColor[i])
}
      for(var i=0;i<this.getListJobband.length;i++)
      {
this.dataJobband.push({"label":this.getListJobband[i].jobandName,"value":this.getListJobband[i].jobandId})
      }

      this.datajobband = {
        chart: {
          "numberPrefix": "",
          "bgColor": "#ffffff",
          "startingAngle": "100",

          "showLegend": "1",
          "defaultCenterLabel": "",
          "centerLabel": " $label: $value",
          "centerLabelBold": "1",
          "showTooltip": "0",
          "decimals": "0",
          'paletteColors' :getColor.toString(),
          "theme": "fusion"
        },
        "data": this.dataJobband
      };


      })
  }
  getListLocation:any=[]
  dataLocation:any=[]
  datalocation:any
  setColor=['7bb7ed', 'e4d556','FF0000','00FF00','0000FF','800080','008000']
  getpbiPeopleLocation(){
      let cmpcode=1
      let year='2022-02-20'
      this.getListLocation=[]
      this.dataLocation=[]
      this.Loader=true
      this.HTTP.getPbiReportLocation(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getListLocation=  arg.data.table
    console.log('getListLocation',arg.data.table)

      this.Loader=false
      var getColor=[]

      for(var i=0;i<this.getListLocation.length;i++)
      {
        getColor.push(this.setColor[i])
      }
//       designationId: 15
// designationName:
      for(var i=0;i<this.getListLocation.length;i++)
      {
this.dataLocation.push({"label":this.getListLocation[i].locationName,"value":this.getListLocation[i].locationid})
      }

      this.datalocation = {
        chart: {
          "numberPrefix": "",
          "bgColor": "#ffffff",
          "startingAngle": "100",
          "showLegend": "1",

          "defaultCenterLabel": "",
          "centerLabel": "$label: $value",
          "centerLabelBold": "1",
          "showTooltip": "0",
          "decimals": "0",
          'paletteColors' :getColor.toString(),
          "theme": "fusion"
        },
        "data": this.dataLocation
      };


      })
  }

  getListAge:any=[]
  dataAge:any=[]
  dataage:any
  totalAgeArray:any=[]
  //colorList:any=['7bb7ed, e4d556,FF0000,00FF00,0000FF,008000,800080']
  getpbiPeopleAge(){
      let cmpcode=1
      let year='2022-02-20'
      this.getListAge=[]
      this.totalAgeArray=[]
      this.Loader=true
      this.HTTP.getPbiReportAge(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getListAge=  arg.data.table
    console.log('getListAge',arg.data.table)

      this.Loader=false
      var getColor=[]

      for(var i=0;i<this.getListAge.length;i++)
      {
        getColor.push(this.setColor[i])
      }
//       designationId: 15
// designationName:
var data20=[]
var data25=[]
var data30=[]
var data35=[]
var data40=[]
var data45=[]
var data50=[]
      for(var i=0;i<this.getListAge.length;i++)
      {
        if(Number(this.getListAge[i].age)>20 && Number(this.getListAge[i].age)<=25)
        {
             data20.push(this.getListAge[i].age)

         // this.dataAge.push({"label":this.getListAge[i].locationName,"value":this.getListAge[i].locationid})

        }
        else if(Number(this.getListAge[i].age)>25 && Number(this.getListAge[i].age)<=30)
        {
data25.push(this.getListAge[i].age)
        }
        else if(Number(this.getListAge[i].age)>30 && Number(this.getListAge[i].age)<=35)
        {
data30.push(this.getListAge[i].age)
        }
        else if(Number(this.getListAge[i].age)>35 && Number(this.getListAge[i].age)<=40)
        {
data35.push(this.getListAge[i].age)
        }
        else if(Number(this.getListAge[i].age)>40 && Number(this.getListAge[i].age)<=45)
        {
data40.push(this.getListAge[i].age)
        }
        else if(Number(this.getListAge[i].age)>45 && Number(this.getListAge[i].age)<=50)
        {
data45.push(this.getListAge[i].age)
        }
        else if(Number(this.getListAge[i].age)>50){
          data50.push(this.getListAge[i].age)
        }

      }
      this.totalAgeArray.push({'label':'20-25','value':data20.length},{
        'label':'25-30','value':data25.length
      },
      {
        'label':'30-35','value':data30.length

      },
      {
        'label':'35-40','value':data35.length

      },
      {
        'label':'40-45','value':data40.length

      },
      {
        'label':'45-50','value':data45.length

      },
      {
        'label':'50-Above','value':data50.length

      }
      )

      this.dataage = {
        chart: {
          "numberPrefix": "",
          "bgColor": "#ffffff",
          "startingAngle": "100",
          "showLegend": "1",

          "defaultCenterLabel": "",
          "centerLabel": "$label: $value",
          "centerLabelBold": "1",
          "showTooltip": "0",
          "decimals": "0",
          'paletteColors' :getColor.toString(),
          "theme": "fusion"
        },
        "data": this.totalAgeArray
      };


      })
  }



  // datades21 = {
  //   chart: {
  //     "numberPrefix": "$",
  //     "bgColor": "#ffffff",
  //     "startingAngle": "100",
  //     "showLegend": "1",
  //     "defaultCenterLabel": "",
  //     "centerLabel": "Revenue from $label: $value",
  //     "centerLabelBold": "1",
  //     "showTooltip": "0",
  //     "decimals": "0",
  //     'paletteColors' :'7bb7ed, e4d556, 2b8f8d, f55d5c',
  //     "theme": "fusion"
  //   },
  //   "data": this.dataDesignation
  // };
  getListData:any=[]
  currentAddtionYear:any
  currentGrowthAddtionYearPercent:any
  currentGrowthVendorAddtionYearPercent:any
  currentGrowthVendorYearPercent:any
  currentGrowthVendorattritionYearPercent:any
  currentGrowthYearPercent:any
  currentGrowthattritionYearPercent:any
  currentVendorAddtionYear:any
  currentVendorYear:any
  currentVendorAttritionYear:any
  currentYear:any
  valcurrentYear:any
  currentattritionYear:any
  perviousYear:any
  totalAdditionGrowthYoyYearPercent:any
totalAdditionPreviousYear:any
totalAdditionVendorPreviousYear:any
totalAdditionyoyYear:any
totalAttritionGrowthYoyYearPercent:any
totalGrowthAdditionPreviousYearPercent:any
totalGrowthAdditionVendorPreviousYearPercent:any
totalAttritionyoyYear:any

totalGrowthPrevousYearPercent:any
totalGrowthVendorattritionYearPercent:any
totalGrowthYoyYearPercent:any
totalGrowthattritionPerviousYearPercent:any
totalPrevousYear:any
totalVendorAdditionGrowthYoyYearPercent:any

totalVendorAdditionyoyYear:any
totalVendorAttritionGrowthYoyYearPercent:any
totalVendorAttritionyoyYear:any

totalVendorGrowthPrevoisYearPercent:any
totalVendorGrowthYoyYearPercent:any
totalVendorPrevoisYear:any
totalVendorattritionYear:any

totalVendoryoyYear:any
totalattritionPerviousYear:any
totalyoyYear:any
employeePercentage:any
employeePerviousYearpercentage:any
employeeyoyprecentage:any
employeeAdditionPercentage:any
employeeAdditionCurrentYearPercentage:any
employeeAdditionyoypercentage:any
employeeAttritionPercentage:any
employeeAttritionCurrentPercent:any
employeeAttritionYoyPercentage:any
VendorCurrentYearPercentage:any
VendorPreviousPercentage:any
VendorYoyPercentage:any
VendorAddtionprevousPercentage:any
VendorAddtionCurrentPercentage:any
VendorAddtionYoyPercentage:any
VendorAttritionPercentage:any
currentVendorAttritionPercentage:any
currentVendorAttritionYoyPercentage:any
upUrl:any="../../assets/img/up.jpg"
downUrl:any="../../assets/img/down.jpg"
imgUrl:any
imgUrl1:any
imgUrl2:any
imgUrl3:any
imgUrl4:any
imgUrl5:any
imgUrl6:any
imgUrl7:any
imgUrl8:any
imgUrl9:any
imgUrl10:any
imgUrl11:any
imgUrl12:any
imgUrl13:any
imgUrl14:any
imgUrl15:any
imgUrl16:any
imgUrl17:any
imgUrl18:any
imgUrl19:any
imgUrl20:any
imgUrl21:any
imgUrl22:any
imgUrl23:any
imgUrl24:any
totalCurrentyoyYear:any
totalGrowthCurrentyoyYear:any
totalCurrentAdditionyoyYear:any
totalVendorGrowthCurrentyoyYear:any
totalVendorCurrentyoyYear:any
totalGrowthCurrentAdditionyoyYear:any
totalVendorCurrentAdditionyoyYear:any
totalVendorGrowthCurrentAdditionyoyYear:any
totalCurrentAttritionyoyYear:any
totalCurrentGrowthAttritionyoyYear:any
totalVendorCurrentAttritionyoyYear:any
totalVendorCurrentGrowthAttritionyoyYear:any
totalCurrentGrowthPercent:any
totalVendorCurrentGrowthYoyPercent:any
totalCurrentGrowthAttritionyoyYearPercent:any
totalVendorCurrentGrowthAttritionyoyYearPercent:any
totalCurrentGrowthyoyPercent:any
totalGrowthCurrentAdditionyoyYearPercent:any
totalVendorGrowthCurrentAdditionyoyYearPercent:any
departmentId:any
 getpbiPeopleDetailList(){
try {
  let cmpcode=1
  let year='2022-02-20'
  this.getListData=[]
  this.Loader=true
  this.HTTP.getPbiReportDetail(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
this.Loader=false
  this.getListData=  arg.data.table
  console.log('getListData',arg.data.table)


this.currentAddtionYear=this.getListData[0].currentAddtionYear
this.currentGrowthAddtionYearPercent=this.getListData[0].currentGrowthAddtionYearPercent
this.currentGrowthVendorAddtionYearPercent=this.getListData[0].currentGrowthVendorAddtionYearPercent
this.currentGrowthVendorYearPercent=this.getListData[0].currentGrowthVendorYearPercent
this.currentGrowthVendorattritionYearPercent=this.getListData[0].currentGrowthVendorattritionYearPercent
this.currentGrowthYearPercent=this.getListData[0].currentGrowthYearPercent
this.currentGrowthattritionYearPercent=this.getListData[0].currentGrowthattritionYearPercent
this.currentVendorAddtionYear=this.getListData[0].currentVendorAddtionYear
this.currentVendorYear=this.getListData[0].currentVendorYear
this.currentVendorAttritionYear=this.getListData[0].currentVendorattritionYear

this.currentYear=this.getListData[0].currentYear
this.valcurrentYear=this.getListData[0].valcurrentYear

this.currentattritionYear=this.getListData[0].currentattritionYear
this.perviousYear=this.getListData[0].perviousYear


this.totalAdditionGrowthYoyYearPercent=this.getListData[0].totalAdditionGrowthYoyYearPercent

this.totalAdditionPreviousYear=this.getListData[0].totalAdditionPreviousYear
this.totalAdditionVendorPreviousYear=this.getListData[0].totalAdditionVendorPreviousYear
this.totalAdditionyoyYear=this.getListData[0].totalAdditionyoyYear
this.totalAttritionGrowthYoyYearPercent=this.getListData[0].totalAttritionGrowthYoyYearPercent
this.totalAttritionyoyYear=this.getListData[0].totalAttritionyoyYear
this.totalGrowthAdditionPreviousYearPercent=this.getListData[0].totalGrowthAdditionPreviousYearPercent
this.totalGrowthAdditionVendorPreviousYearPercent=this.getListData[0].totalGrowthAdditionVendorPreviousYearPercent
this.totalGrowthPrevousYearPercent=this.getListData[0].totalGrowthPrevousYearPercent
this.totalGrowthVendorattritionYearPercent=this.getListData[0].totalGrowthVendorattritionYearPercent
this.totalGrowthYoyYearPercent=this.getListData[0].totalGrowthYoyYearPercent
this.totalGrowthattritionPerviousYearPercent=this.getListData[0].totalGrowthattritionPerviousYearPercent
this.totalPrevousYear=this.getListData[0].totalPrevousYear
this.totalVendorAdditionGrowthYoyYearPercent=this.getListData[0].totalVendorAdditionGrowthYoyYearPercent
this.totalVendorAdditionyoyYear=this.getListData[0].totalVendorAdditionyoyYear
this.totalVendorAttritionGrowthYoyYearPercent=this.getListData[0].totalVendorAttritionGrowthYoyYearPercent
this.totalVendorAttritionyoyYear=this.getListData[0].totalVendorAttritionyoyYear

this.totalVendorGrowthPrevoisYearPercent=this.getListData[0].totalVendorGrowthPrevoisYearPercent
this.totalVendorGrowthYoyYearPercent=this.getListData[0].totalVendorGrowthYoyYearPercent
this.totalVendorPrevoisYear=this.getListData[0].totalVendorPrevoisYear

this.totalVendorattritionYear=this.getListData[0].totalVendorattritionYear
this.totalVendoryoyYear=this.getListData[0].totalVendoryoyYear
this.totalattritionPerviousYear=this.getListData[0].totalattritionPerviousYear
this.totalyoyYear=this.getListData[0].totalyoyYear

this.totalCurrentyoyYear=this.getListData[0].totalCurrentyoyYear

this.totalGrowthCurrentyoyYear=this.getListData[0].totalGrowthCurrentyoyYear
this.totalCurrentGrowthyoyPercent=(this.totalCurrentyoyYear-this.totalGrowthCurrentyoyYear)*100/this.totalGrowthCurrentyoyYear
if(this.totalGrowthCurrentyoyYear==0)
{
  this.totalCurrentGrowthyoyPercent=0
}
if(this.totalCurrentGrowthyoyPercent>0)
{
  this.imgUrl19=this.downUrl
}
else if(this.totalCurrentGrowthyoyPercent<0){
  this.imgUrl19=this.upUrl
}
this.totalVendorCurrentyoyYear=this.getListData[0].totalVendorCurrentyoyYear
this.totalVendorGrowthCurrentyoyYear=this.getListData[0].totalVendorGrowthCurrentyoyYear
this.totalVendorCurrentGrowthYoyPercent=(this.totalVendorCurrentyoyYear-this.totalVendorGrowthCurrentyoyYear)*100/this.totalVendorGrowthCurrentyoyYear
if(this.totalVendorCurrentGrowthYoyPercent==0)
{
  this.totalVendorCurrentGrowthYoyPercent=0
}
if(this.totalVendorCurrentGrowthYoyPercent>0)
{
  this.imgUrl20=this.downUrl
}
else if(this.totalVendorCurrentGrowthYoyPercent<0){
  this.imgUrl20=this.upUrl
}
this.totalCurrentAdditionyoyYear=this.getListData[0].totalCurrentAdditionyoyYear
this.totalGrowthCurrentAdditionyoyYear=this.getListData[0].totalGrowthCurrentAdditionyoyYear

this.totalGrowthCurrentAdditionyoyYearPercent=(this.totalCurrentAdditionyoyYear-this.totalGrowthCurrentAdditionyoyYear)*100/this.totalGrowthCurrentAdditionyoyYear
if(this.totalAdditionGrowthYoyYearPercent==0)
{
this.totalGrowthCurrentAdditionyoyYearPercent=0
}
if(this.totalGrowthCurrentAdditionyoyYearPercent>0)
{
  this.imgUrl21=this.downUrl
}
else if(this.totalGrowthCurrentAdditionyoyYearPercent<0){
  this.imgUrl21=this.upUrl
}
this.totalVendorCurrentAdditionyoyYear=this.getListData[0].totalVendorCurrentAdditionyoyYear
this.totalVendorGrowthCurrentAdditionyoyYear=this.getListData[0].totalVendorGrowthCurrentAdditionyoyYear
this.totalVendorGrowthCurrentAdditionyoyYearPercent=(this.totalVendorCurrentAdditionyoyYear -this.totalVendorGrowthCurrentAdditionyoyYear)*100/this.totalVendorGrowthCurrentAdditionyoyYear
if(this.totalVendorGrowthCurrentAdditionyoyYear==0)
{
this.totalVendorGrowthCurrentAdditionyoyYearPercent=0
}
if(this.totalVendorGrowthCurrentAdditionyoyYearPercent>0)
{
  this.imgUrl22=this.downUrl
}
else if(this.totalVendorGrowthCurrentAdditionyoyYearPercent<0){
  this.imgUrl22=this.upUrl
}
this.totalCurrentAttritionyoyYear=this.getListData[0].totalCurrentAttritionyoyYear
this.totalCurrentGrowthAttritionyoyYear=this.getListData[0].totalCurrentGrowthAttritionyoyYear
this.totalCurrentGrowthAttritionyoyYearPercent=(this.totalCurrentAttritionyoyYear-this.totalCurrentGrowthAttritionyoyYear)*100/this.totalCurrentGrowthAttritionyoyYear
if(this.totalCurrentGrowthAttritionyoyYear==0)
{
this.totalCurrentGrowthAttritionyoyYearPercent=0
}
if(this.totalCurrentGrowthAttritionyoyYearPercent>0)
{
  this.imgUrl23=this.downUrl
}
else if(this.totalCurrentGrowthAttritionyoyYearPercent<0){
  this.imgUrl23=this.upUrl
}
this.totalVendorCurrentAttritionyoyYear=this.getListData[0].totalVendorCurrentAttritionyoyYear
this.totalVendorCurrentGrowthAttritionyoyYear=this.getListData[0].totalVendorCurrentGrowthAttritionyoyYear
this.totalVendorCurrentGrowthAttritionyoyYearPercent=(this.totalVendorCurrentAttritionyoyYear-this.totalVendorCurrentGrowthAttritionyoyYear)*100/this.totalVendorCurrentGrowthAttritionyoyYear
if(this.totalVendorCurrentGrowthAttritionyoyYear==0)
{
  this.totalVendorCurrentGrowthAttritionyoyYearPercent=0
}

if(this.totalVendorCurrentGrowthAttritionyoyYearPercent>0)
{
  this.imgUrl24=this.downUrl
}
else if(this.totalVendorCurrentGrowthAttritionyoyYearPercent<0){
  this.imgUrl24=this.upUrl
}











if(this.totalGrowthPrevousYearPercent==0)
{
  this.employeePercentage=0
}
else{
  this.employeePercentage =(this.totalPrevousYear-this.totalGrowthPrevousYearPercent) *100 / this.totalGrowthPrevousYearPercent

}
if(this.employeePercentage>0)
{
  this.imgUrl=this.downUrl
}
else if(this.employeePercentage<0){
  this.imgUrl=this.upUrl
}
if(this.currentGrowthYearPercent==0)
{
this.employeePerviousYearpercentage=0
}
else{
  this.employeePerviousYearpercentage=(this.valcurrentYear-this.currentGrowthYearPercent)*100/this.currentGrowthYearPercent

}
if(this.employeePerviousYearpercentage>0)
{
  this.imgUrl1=this.downUrl
}
else if(this.employeePerviousYearpercentage<0){
  this.imgUrl1=this.upUrl
}

if(this.totalGrowthYoyYearPercent==0)
{
this.employeeyoyprecentage=0
}
else{
  this.employeeyoyprecentage=(this.totalyoyYear-this.totalGrowthYoyYearPercent)/this.totalGrowthYoyYearPercent*100

}
if(this.employeeyoyprecentage>0)
{
  this.imgUrl2=this.downUrl
}
else if(this.employeeyoyprecentage<0){
  this.imgUrl2=this.upUrl
}
if( this.totalGrowthAdditionPreviousYearPercent==0)
{
  this.employeeAdditionPercentage=0
}
else{
  this.employeeAdditionPercentage=(this.totalAdditionPreviousYear-this.totalGrowthAdditionPreviousYearPercent)*100/this.totalGrowthAdditionPreviousYearPercent

}
if(this.employeeAdditionPercentage>0)
{
  this.imgUrl3=this.downUrl
}
else if(this.employeeAdditionPercentage<0){
  this.imgUrl3=this.upUrl
}
if(this.currentGrowthAddtionYearPercent==0)
{
  this.employeeAdditionCurrentYearPercentage=0
}
else{
this.employeeAdditionCurrentYearPercentage=(this.currentAddtionYear-this.currentGrowthAddtionYearPercent)*100/this.currentGrowthAddtionYearPercent

}
if(this.employeeAdditionCurrentYearPercentage>0)
{
  this.imgUrl4=this.downUrl
}
else if(this.employeeAdditionCurrentYearPercentage<0){
  this.imgUrl4=this.upUrl
}
if(this.totalAdditionGrowthYoyYearPercent==0)
{
  this.employeeAdditionyoypercentage=0
}
else{
  this.employeeAdditionyoypercentage=(this.totalAdditionyoyYear-this.totalAdditionGrowthYoyYearPercent)*100/this.totalAdditionGrowthYoyYearPercent

}
if(this.employeeAdditionyoypercentage>0)
{
  this.imgUrl5=this.downUrl
}
else if(this.employeeAdditionyoypercentage<0){
  this.imgUrl5=this.upUrl
}

if(this.totalGrowthattritionPerviousYearPercent==0)
{
  this.employeeAttritionPercentage=0
}
else{
  this.employeeAttritionPercentage=(this.totalattritionPerviousYear-this.totalGrowthattritionPerviousYearPercent)*100/this.totalGrowthattritionPerviousYearPercent

}
if(this.employeeAttritionPercentage>0)
{
  this.imgUrl6=this.downUrl
}
else if(this.employeeAttritionPercentage<0){
  this.imgUrl6=this.upUrl
}
if(this.currentGrowthattritionYearPercent==0)
{
this.employeeAttritionCurrentPercent=0
}
else{
  this.employeeAttritionCurrentPercent=(this.currentattritionYear-this.currentGrowthattritionYearPercent)*100/this.currentGrowthattritionYearPercent
}
if(this.employeeAttritionCurrentPercent>0)
{
  this.imgUrl7=this.downUrl
}
else if(this.employeeAttritionCurrentPercent<0){
  this.imgUrl7=this.upUrl
}

if(this.totalAttritionGrowthYoyYearPercent==0)
{
  this.employeeAttritionYoyPercentage=0
}
else if(this.totalAttritionGrowthYoyYearPercent==0)
{
  this.employeeAttritionYoyPercentage=0

}
else{
  this.employeeAttritionYoyPercentage=(this.totalAttritionyoyYear-this.totalAttritionGrowthYoyYearPercent)*100/this.totalAttritionGrowthYoyYearPercent

}
if(this.employeeAttritionYoyPercentage>0)
{
  this.imgUrl8=this.downUrl
}
else if(this.employeeAttritionYoyPercentage<0){
  this.imgUrl8=this.upUrl
}
if(this.totalVendorGrowthPrevoisYearPercent==0)
{
  this.VendorPreviousPercentage=0
}
else{
this.VendorPreviousPercentage=(this.totalVendorPrevoisYear-this.totalVendorGrowthPrevoisYearPercent)*100/this.totalVendorGrowthPrevoisYearPercent

}
if(this.VendorPreviousPercentage>0)
{
  this.imgUrl9=this.downUrl
}
else if(this.VendorPreviousPercentage<0){
  this.imgUrl9=this.upUrl
}

if(this.currentGrowthVendorYearPercent==0)
{
  this.VendorCurrentYearPercentage=0
}
else{
this.VendorCurrentYearPercentage=(this.currentVendorYear-this.currentGrowthVendorYearPercent)*100/this.currentGrowthVendorYearPercent
}
if(this.VendorCurrentYearPercentage>0)
{
  this.imgUrl10=this.downUrl
}
else if(this.VendorCurrentYearPercentage<0){
  this.imgUrl10=this.upUrl
}
if(this.totalVendorGrowthYoyYearPercent==0)
{
  this.VendorYoyPercentage=0
}
else{
this.VendorYoyPercentage=(this.totalVendoryoyYear-this.totalVendorGrowthYoyYearPercent)*100/this.totalVendorGrowthYoyYearPercent

}
if(this.VendorYoyPercentage>0)
{
  this.imgUrl11=this.downUrl
}
else if(this.VendorYoyPercentage<0){
  this.imgUrl11=this.upUrl
}
if(this.totalGrowthAdditionVendorPreviousYearPercent==0)
{
  this.VendorAddtionprevousPercentage=0
}
else{
this.VendorAddtionprevousPercentage=(this.totalAdditionVendorPreviousYear-this.totalGrowthAdditionVendorPreviousYearPercent)*100/this.totalGrowthAdditionVendorPreviousYearPercent
}
if(this.VendorAddtionprevousPercentage>0)
{
  this.imgUrl12=this.downUrl
}
else  if(this.VendorAddtionprevousPercentage<0){
  this.imgUrl12=this.upUrl
}
if(this.currentGrowthVendorAddtionYearPercent==0)
{
  this.VendorAddtionCurrentPercentage=0
}
else{
this.VendorAddtionCurrentPercentage=(this.currentVendorAddtionYear-this.currentGrowthVendorAddtionYearPercent)*100/this.currentGrowthVendorAddtionYearPercent
}
if(this.VendorAddtionCurrentPercentage>0)
{
  this.imgUrl13=this.downUrl
}
else if(this.VendorAddtionCurrentPercentage<0){
  this.imgUrl13=this.upUrl
}
if(this.totalVendorAdditionGrowthYoyYearPercent==0)
{
  this.VendorAddtionYoyPercentage=0
}
else{
this.VendorAddtionYoyPercentage=(this.totalVendorAdditionyoyYear-this.totalVendorAdditionGrowthYoyYearPercent)*100/this.totalVendorAdditionGrowthYoyYearPercent
}
if(this.VendorAddtionYoyPercentage>0)
{
  this.imgUrl14=this.downUrl
}
else if(this.VendorAddtionYoyPercentage<0){
  this.imgUrl14=this.upUrl
}
if(this.totalGrowthVendorattritionYearPercent==0)
{
  this.VendorAttritionPercentage=0
}
else{
this.VendorAttritionPercentage=(this.totalVendorattritionYear-this.totalGrowthVendorattritionYearPercent)*100/this.totalGrowthVendorattritionYearPercent
}
if(this.VendorAttritionPercentage>0)
{
  this.imgUrl15=this.downUrl
}
else if(this.VendorAttritionPercentage<0){
  this.imgUrl15=this.upUrl
}
if(this.totalGrowthVendorattritionYearPercent==0)
{
  this.currentVendorAttritionPercentage=0
}
else{
this.currentVendorAttritionPercentage=(this.currentVendorAttritionYear-this.currentGrowthVendorattritionYearPercent)*100/this.currentGrowthVendorattritionYearPercent
}
if(this.currentVendorAttritionPercentage>0)
{
  this.imgUrl16=this.downUrl
}
else if(this.currentVendorAttritionPercentage<0){
  this.imgUrl16=this.upUrl
}
if(this.totalVendorAttritionGrowthYoyYearPercent==0)
{
  this.currentVendorAttritionYoyPercentage=0
}
else{
this.currentVendorAttritionYoyPercentage=(this.totalVendorAttritionyoyYear-this.totalVendorAttritionGrowthYoyYearPercent)*100/this.totalVendorAttritionGrowthYoyYearPercent
}
if(this.currentVendorAttritionYoyPercentage>0)
{
  this.imgUrl17=this.downUrl
}
else if(this.currentVendorAttritionYoyPercentage<0){
  this.imgUrl17=this.upUrl
}

})


} catch (error) {

}

  }
  getProjectListData:any=[]
  avgLeavePercent: any
avgLeaveTotal: any
billableResourceTotal: any
billableResourceTotalPercent: any
cost: any
costPercentageGrowth: any
leaveTotalYoy: any
leaveTotalYoyPercent: any
nonBillableResourceTotal: any
nonBillableResourceTotalPercent: any
nonBillableResourceTotalYoy: any
nonBillableResourceTotalYoyPercent: any
onBenchTotalResource: any
onBenchTotalResouPercent: any=0
revenue: any
revenueCostTotalYoy: any
revenueCostTotalYoyPercent: any
revenuePercentageGrowth: any
serviceProviderTotalResource: any
serviceProviderTotalResourcePercentage: any
totalCloseProject: any
totalGrowthCloseProjectPercent: any
totalGrowthOpenProjectPercent: any
totalGrowthProjectYoyYearPercent: any
totalLeaveResource: any
totalLeaveResourcePercent: any
totalOpenProject: any
totalResource: any
totalResourcePercent: any
totalProjectyoyYear: any
vendorTotalResource: any
vendorTotalResourcePercentage: any
vendorTotalYoy: any
vendorTotalYoyPercent: any
avgLeaveTotalPercentage:any
billableResourceTotalPercentGrowth:any=0
costPercentageGrowthValue:any
leaveTotalYoyPercentGrowth:any
nonBillableResourceTotalPercentGrowth:any
nonBillableResourceTotalYoyPercentGrowth:any
onBenchTotalResourcePercentGrowth:any
revenueCostTotalYoyPercentGrowth:any
revenuePercentageGrowthPercent:any
serviceProviderTotalResourcePercentageGrowth:any
totalResourcePercentGrowth:any
totalGrowthCloseProjectPercentGrowth:any
totalGrowthProjectYoyYearPercentGrowth:any
totalLeaveResourcePercentGrowth:any
totalGrowthOpenProjectPercentGrowth:any
totalResourcePercentGrowthPercentGrowth:any
vendorTotalResourcePercentageGrowth:any
vendorTotalYoyPercentGrowth:any
onBenchTotalYoy:any
OnBenchTotalYoyPercent:any
onBenchTotalYoyPercentGrowth:any
imgtotalResourcePercentGrowthPercentGrowth:any
imgavgLeaveTotalPercentage:any
imgcostPercentageGrowthValue:any
imgleaveTotalYoyPercentGrowth:any
imgnonBillableResourceTotalPercentGrowth:any
imgnonBillableResourceTotalYoyPercentGrowth:any
imgrevenueCostTotalYoyPercentGrowth:any
imgrevenuePercentageGrowthPercent:any
imgserviceProviderTotalResourcePercentageGrowth:any
imgtotalGrowthCloseProjectPercentGrowth:any
imgtotalLeaveResourcePercentGrowth:any
imgtotalGrowthOpenProjectPercentGrowth:any
imgtotalResourcePercentGrowth:any
imgtotalGrowthProjectYoyYearPercentGrowth:any
imgvendorTotalResourcePercentageGrowth:any
imgvendorTotalYoyPercentGrowth:any
imgonBenchTotalYoyPercentGrowth:any

imgonBenchTotalResourcePercentGrowth:any
imgbillableResourceTotalPercentGrowth:any
costYoyYearPercent:any
nonBillableYoyYearPercent:any
nonBillableYoyYear:any
avgLeaveYoyYearPercent:any
avgLeaveYoyYear:any
closeYoyYear:any
costYoyYear:any
venderYoyYearPercent:any
venderYoyYear:any
onBenchYoyYearPercent:any
closeYoyYearPercent:any
closeYoyYearPercentGrowth:any
onBenchYoyYear:any
nonBillableYoyYearPercentGrowth:any
avgLeaveYoyYearPercentGrowth:any
costYoyYearPercentGrowth:any
venderYoyYearPercentGrowt:any
onBenchYoyYearPercentGrowth:any
venderYoyYearPercentGrowth:any


imgnonBillableYoyYearPercentGrowth:any
 imgavgLeaveYoyYearPercentGrowth:any
 imgcostYoyYearPercentGrowth:any
 imgonBenchYoyYearPercentGrowth:any
 imgvenderYoyYearPercentGrowth:any
 imgcloseYoyYearPercentGrowth:any
  getpbiProjectDetailList(){
    let cmpcode=1
    let year='2022-02-20'
    this.getProjectListData=[]
    this.Loader=true
    this.HTTP.getPbiProjectDetail(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      debugger
this.Loader=false
  this.getProjectListData=  arg.data.table
  console.log('getProjectListData',arg.data.table)

 // if(this.getProjectListData>=0)
  //{

this.avgLeavePercent=this.getProjectListData[0].avgLeavePercent
this.avgLeaveTotal=this.getProjectListData[0].avgLeaveTotal
this.avgLeaveTotalPercentage=(this.avgLeaveTotal-this.avgLeavePercent)*100/this.avgLeavePercent
if(this.avgLeavePercent==0)
{
this.avgLeaveTotalPercentage=0
}


if(this.avgLeaveTotalPercentage>0)
{
  this.imgavgLeaveTotalPercentage=this.downUrl
}
else if(this.avgLeaveTotalPercentage<0){
  this.imgavgLeaveTotalPercentage=this.upUrl
}

this.closeYoyYear=this.getProjectListData[0].closeYoyYear
this.closeYoyYearPercent=this.getProjectListData[0].closeYoyYearPercent
this.closeYoyYearPercentGrowth=(this.closeYoyYear-this.closeYoyYearPercent)*100/this.closeYoyYearPercent
if(this.closeYoyYearPercent==0)
{
this.closeYoyYearPercentGrowth=0
}


if(this.closeYoyYearPercentGrowth>0)
{
  this.imgcloseYoyYearPercentGrowth=this.downUrl
}
else if(this.closeYoyYearPercentGrowth<0){
  this.imgcloseYoyYearPercentGrowth=this.upUrl
}
this.onBenchYoyYear=this.getProjectListData[0].onBenchYoyYear
 this.onBenchYoyYearPercent=this.getProjectListData[0].onBenchYoyYearPercent
 this.onBenchYoyYearPercentGrowth=(this.onBenchYoyYear-this.onBenchYoyYearPercent)*100/this.onBenchYoyYearPercent

 if(this.onBenchYoyYearPercent==0)
 {
 this.onBenchYoyYearPercentGrowth=0
 }


 if(this.onBenchYoyYearPercentGrowth>0)
 {
   this.imgonBenchYoyYearPercentGrowth=this.downUrl
 }
 else if(this.onBenchYoyYearPercentGrowth<0){
   this.imgonBenchYoyYearPercentGrowth=this.upUrl
 }

 this.venderYoyYear=this.getProjectListData[0].venderYoyYear

 this.venderYoyYearPercent=this.getProjectListData[0].venderYoyYearPercent
 this.venderYoyYearPercentGrowth=(this.venderYoyYear-this.venderYoyYearPercent)*100/this.venderYoyYearPercent


 if(this.venderYoyYearPercent==0)
 {
 this.venderYoyYearPercentGrowth=0
 }


 if(this.venderYoyYearPercentGrowth>0)
 {
   this.imgvenderYoyYearPercentGrowth=this.downUrl
 }
 else if(this.venderYoyYearPercentGrowth<0){
   this.imgvenderYoyYearPercentGrowth=this.upUrl
 }

 this.costYoyYear=this.getProjectListData[0].costYoyYear
this.costYoyYearPercent=this.getProjectListData[0].costYoyYearPercent
this.costYoyYearPercentGrowth=(this.costYoyYear-this.costYoyYearPercent)*100/this.costYoyYearPercent
if(this.costYoyYearPercent==0)
{
this.costYoyYearPercentGrowth=0
}


if(this.costYoyYearPercentGrowth>0)
{
  this.imgcostYoyYearPercentGrowth=this.downUrl
}
else if(this.costYoyYearPercentGrowth<0){
  this.imgcostYoyYearPercentGrowth=this.upUrl
}



this.avgLeaveYoyYear=this.getProjectListData[0].avgLeaveYoyYear
this.avgLeaveYoyYearPercent=this.getProjectListData[0].avgLeaveYoyYearPercent
this.avgLeaveYoyYearPercentGrowth=(this.avgLeaveYoyYear-this.avgLeaveYoyYearPercent)*100/this.avgLeaveYoyYearPercent
if(this.avgLeaveYoyYearPercent==0)
{
this.avgLeaveYoyYearPercentGrowth=0
}


if(this.avgLeaveYoyYearPercentGrowth>0)
{
  this.imgavgLeaveYoyYearPercentGrowth=this.downUrl
}
else if(this.avgLeaveYoyYearPercentGrowth<0){
  this.imgavgLeaveYoyYearPercentGrowth=this.upUrl
}




this.nonBillableYoyYear=this.getProjectListData[0].nonBillableYoyYear
this.nonBillableYoyYearPercent=this.getProjectListData[0].nonBillableYoyYearPercent
this.nonBillableYoyYearPercentGrowth=(this.nonBillableYoyYear-this.nonBillableYoyYearPercent)*100/this.nonBillableYoyYearPercent
if(this.nonBillableYoyYearPercent==0)
{
this.nonBillableYoyYearPercentGrowth=0
}


if(this.nonBillableYoyYearPercentGrowth>0)
{
  this.imgnonBillableYoyYearPercentGrowth=this.downUrl
}
else if(this.nonBillableYoyYearPercentGrowth<0){
  this.imgnonBillableYoyYearPercentGrowth=this.upUrl
}
this.cost =this.getProjectListData[0].cost
this.costPercentageGrowth=this.getProjectListData[0].costPercentageGrowth
this.costPercentageGrowthValue=(this.cost-this.costPercentageGrowth)*100/this.costPercentageGrowth
if(this.costPercentageGrowth==0)
{
  this.costPercentageGrowthValue=0
}
if(this.costPercentageGrowthValue>0)
{
  this.imgcostPercentageGrowthValue=this.downUrl
}
else if(this.costPercentageGrowthValue<0){
  this.imgcostPercentageGrowthValue=this.upUrl
}
this.leaveTotalYoy=this.getProjectListData[0].leaveTotalYoy
this.leaveTotalYoyPercent=this.getProjectListData[0].leaveTotalYoyPercent
this.leaveTotalYoyPercentGrowth=(this.leaveTotalYoy-this.leaveTotalYoyPercent)*100/this.leaveTotalYoyPercent
if(this.leaveTotalYoyPercent==0)
{
this.leaveTotalYoyPercentGrowth=0
}
if(this.leaveTotalYoyPercentGrowth>0)
{
  this.imgleaveTotalYoyPercentGrowth=this.downUrl
}
else if(this.leaveTotalYoyPercentGrowth<0){
  this.imgleaveTotalYoyPercentGrowth=this.upUrl
}
this.billableResourceTotal=this.getProjectListData[0].billableResourceTotal

this.nonBillableResourceTotal=this.getProjectListData[0].nonBillableResourceTotal
this.nonBillableResourceTotalPercent=this.getProjectListData[0].nonBillableResourceTotalPercent
this.nonBillableResourceTotalPercentGrowth=(this.nonBillableResourceTotal-this.nonBillableResourceTotalPercent)*100/this.nonBillableResourceTotalPercent
if(this.nonBillableResourceTotalPercent==0)
{
  this.nonBillableResourceTotalPercentGrowth=0
}
if(this.nonBillableResourceTotalPercentGrowth>0)
{
  this.imgnonBillableResourceTotalPercentGrowth=this.downUrl
}
else if(this.nonBillableResourceTotalPercentGrowth<0){
  this.imgnonBillableResourceTotalPercentGrowth=this.upUrl
}
this.nonBillableResourceTotalYoy=this.getProjectListData[0].nonBillableResourceTotalYoy
this.nonBillableResourceTotalYoyPercent=this.getProjectListData[0].nonBillableResourceTotalYoyPercent
this.nonBillableResourceTotalYoyPercentGrowth=(this.nonBillableResourceTotalYoy-this.nonBillableResourceTotalYoyPercent)*100/this.nonBillableResourceTotalYoyPercent
if(this.nonBillableResourceTotalYoyPercent==0)
{
  this.nonBillableResourceTotalYoyPercentGrowth=0
}

if(this.nonBillableResourceTotalYoyPercentGrowth>0)
{
  this.imgnonBillableResourceTotalYoyPercentGrowth=this.downUrl
}
else if(this.nonBillableResourceTotalYoyPercentGrowth<0){
  this.imgnonBillableResourceTotalYoyPercentGrowth=this.upUrl
}
this.onBenchTotalYoy=this.getProjectListData[0].onBenchTotalYoy
this.OnBenchTotalYoyPercent=this.getProjectListData[0].onBenchTotalYoyPercent
this.onBenchTotalYoyPercentGrowth=(this.onBenchTotalYoy-this.OnBenchTotalYoyPercent)*100/this.OnBenchTotalYoyPercent
if(this.OnBenchTotalYoyPercent==0)
{
  this.onBenchTotalYoyPercentGrowth=0
}

if(this.onBenchTotalYoyPercentGrowth>0)
{
  this.imgonBenchTotalYoyPercentGrowth=this.downUrl
}
else if(this.onBenchTotalYoyPercentGrowth<0){
  this.imgonBenchTotalYoyPercentGrowth=this.upUrl
}
this.revenue=this.getProjectListData[0].revenue
this.revenueCostTotalYoy=this.getProjectListData[0].revenueCostTotalYoy
this.revenueCostTotalYoyPercent=this.getProjectListData[0].revenueCostTotalYoyPercent
this.revenueCostTotalYoyPercentGrowth=(this.revenueCostTotalYoy-this.revenueCostTotalYoyPercent)*100/this.revenueCostTotalYoyPercent
if(this.revenueCostTotalYoyPercent==0)
{
  this.revenueCostTotalYoyPercentGrowth=0
}

if(this.revenueCostTotalYoyPercentGrowth>0)
{
  this.imgrevenueCostTotalYoyPercentGrowth=this.downUrl
}
else if(this.revenueCostTotalYoyPercentGrowth<0){
  this.imgrevenueCostTotalYoyPercentGrowth=this.upUrl
}
this.revenuePercentageGrowth=this.getProjectListData[0].revenuePercentageGrowth
this.revenuePercentageGrowthPercent=(this.revenue-this.revenuePercentageGrowth)*100/this.revenuePercentageGrowth
if(this.revenuePercentageGrowth==0)
{
  this.revenuePercentageGrowthPercent=0
}
if(this.revenuePercentageGrowthPercent>0)
{
  this.imgrevenuePercentageGrowthPercent=this.downUrl
}
else if(this.revenuePercentageGrowthPercent<0){
  this.imgrevenuePercentageGrowthPercent=this.upUrl
}

this.serviceProviderTotalResource=this.getProjectListData[0].serviceProviderTotalResource
this.serviceProviderTotalResourcePercentage=this.getProjectListData[0].serviceProviderTotalResourcePercentage
this.serviceProviderTotalResourcePercentageGrowth=(this.serviceProviderTotalResource-this.serviceProviderTotalResourcePercentage)*100/this.serviceProviderTotalResourcePercentage
if(this.serviceProviderTotalResourcePercentage==0)
  {
    this.serviceProviderTotalResourcePercentageGrowth=0
  }
  if(this.serviceProviderTotalResourcePercentageGrowth>0)
{
  this.imgserviceProviderTotalResourcePercentageGrowth=this.downUrl
}
else if(this.serviceProviderTotalResourcePercentageGrowth<0){
  this.imgserviceProviderTotalResourcePercentageGrowth=this.upUrl
}

this.totalResource=this.getProjectListData[0].totalResource
this.totalCloseProject=this.getProjectListData[0].totalCloseProject
this.totalGrowthCloseProjectPercent=this.getProjectListData[0].totalGrowthCloseProjectPercent
this.totalGrowthCloseProjectPercentGrowth=(this.totalCloseProject-this.totalGrowthCloseProjectPercent)*100/this.totalGrowthCloseProjectPercent
if(this.totalGrowthCloseProjectPercent==0)
{
  this.totalGrowthCloseProjectPercentGrowth=0
}
if(this.totalGrowthCloseProjectPercentGrowth>0)
{
  this.imgtotalGrowthCloseProjectPercentGrowth=this.downUrl
}
else if(this.totalGrowthCloseProjectPercentGrowth<0){ 
  this.imgtotalGrowthCloseProjectPercentGrowth=this.upUrl
}
this.totalGrowthOpenProjectPercent=this.getProjectListData[0].totalGrowthOpenProjectPercent
this.totalLeaveResource=this.getProjectListData[0].totalLeaveResource
this.totalLeaveResourcePercent=this.getProjectListData[0].totalLeaveResourcePercent
this.totalLeaveResourcePercentGrowth=(this.totalLeaveResource-this.totalLeaveResourcePercent)*100/this.totalLeaveResourcePercent
if(this.totalLeaveResourcePercent==0)
{
  this.totalLeaveResourcePercentGrowth=0
}
if(this.totalLeaveResourcePercentGrowth>0)
{
  this.imgtotalLeaveResourcePercentGrowth=this.downUrl
}
else if(this.totalLeaveResourcePercentGrowth<0){
  this.imgtotalLeaveResourcePercentGrowth=this.upUrl
}
this.totalOpenProject=this.getProjectListData[0].totalOpenProject
this.totalGrowthOpenProjectPercentGrowth=(this.totalOpenProject-this.totalGrowthOpenProjectPercent)*100/this.totalGrowthOpenProjectPercent
if(this.totalGrowthOpenProjectPercent==0)
{
  this.totalGrowthOpenProjectPercentGrowth=0
}
if(this.totalGrowthOpenProjectPercentGrowth>0)
{
  this.imgtotalGrowthOpenProjectPercentGrowth=this.downUrl
}
else if(this.totalGrowthOpenProjectPercentGrowth<0){
  this.imgtotalGrowthOpenProjectPercentGrowth=this.upUrl
}
this.totalResourcePercent=this.getProjectListData[0].totalResourcePercent
this.totalResourcePercentGrowth=(this.totalResource-this.totalResourcePercent)*100/this.totalResourcePercent
if(this.totalResourcePercent==0)
{
  this.totalResourcePercentGrowth=0

}
if(this.totalResourcePercentGrowth>0)
{
  this.imgtotalResourcePercentGrowth=this.downUrl
}
else if(this.totalResourcePercentGrowth<0){
  this.imgtotalResourcePercentGrowth=this.upUrl
}
this.totalResourcePercentGrowthPercentGrowth=(this.totalResourcePercent-this.totalResourcePercentGrowth)*100/this.totalResourcePercentGrowth
if(this.totalResourcePercentGrowth==0)
{
  this.totalResourcePercentGrowthPercentGrowth=0
}
if(this.totalResourcePercentGrowthPercentGrowth>0)
{
  this.imgtotalResourcePercentGrowthPercentGrowth=this.downUrl
}
else if(this.totalResourcePercentGrowthPercentGrowth<0){
  this.imgtotalResourcePercentGrowthPercentGrowth=this.upUrl
}

this.totalProjectyoyYear=this.getProjectListData[0].totalProjectyoyYear
this.totalGrowthProjectYoyYearPercent=this.getProjectListData[0].totalGrowthProjectYoyYearPercent
this.totalGrowthProjectYoyYearPercentGrowth=(this.totalProjectyoyYear-this.totalGrowthProjectYoyYearPercent)*100/this.totalGrowthOpenProjectPercent
if(this.totalGrowthProjectYoyYearPercent==0)
{
  this.totalGrowthProjectYoyYearPercentGrowth=0
}
if(this.totalGrowthProjectYoyYearPercentGrowth>0)
{
  this.imgtotalGrowthProjectYoyYearPercentGrowth=this.downUrl
}
else if(this.totalGrowthProjectYoyYearPercentGrowth<0){
  this.imgtotalGrowthProjectYoyYearPercentGrowth=this.upUrl
}

this.vendorTotalResource=this.getProjectListData[0].vendorTotalResource
this.vendorTotalResourcePercentage=this.getProjectListData[0].vendorTotalResourcePercentage
this.vendorTotalResourcePercentageGrowth=(this.vendorTotalResource-this.vendorTotalResourcePercentage)*100/this.vendorTotalResourcePercentage
if(this.vendorTotalResourcePercentage==0)
{
  this.vendorTotalResourcePercentageGrowth=0
}
if(this.vendorTotalResourcePercentageGrowth>0)
{
  this.imgvendorTotalResourcePercentageGrowth=this.downUrl
}
else if(this.vendorTotalResourcePercentageGrowth<0){
  this.imgvendorTotalResourcePercentageGrowth=this.upUrl
}
this.vendorTotalYoy=this.getProjectListData[0].vendorTotalYoy
this.vendorTotalYoyPercent=this.getProjectListData[0].vendorTotalYoyPercent
this.vendorTotalYoyPercentGrowth=(this.vendorTotalYoy-this.vendorTotalYoyPercent)*100/this.vendorTotalYoyPercent
if(this.vendorTotalYoyPercent==0)
{
  this.vendorTotalYoyPercentGrowth=0

}
if(this.vendorTotalYoyPercentGrowth>0)
{
  this.imgvendorTotalYoyPercentGrowth=this.downUrl
}
else if(this.vendorTotalYoyPercentGrowth<0){
  this.imgvendorTotalYoyPercentGrowth=this.upUrl
}

this.onBenchTotalResource=this.getProjectListData[0].onBenchTotalResource;
this.onBenchTotalResouPercent=this.getProjectListData[0].onBenchTotalResourcePercent;
//this.onBenchTotalResouPercent=0;
this.onBenchTotalResourcePercentGrowth=(this.onBenchTotalResource-this.onBenchTotalResouPercent)*100 / this.onBenchTotalResource;
(this.onBenchTotalResouPercent==0)
{
  this.onBenchTotalResourcePercentGrowth=0
}
if(this.onBenchTotalResourcePercentGrowth>0)
{
  this.imgonBenchTotalResourcePercentGrowth=this.downUrl
}
else if(this.onBenchTotalResourcePercentGrowth<0){
  this.imgonBenchTotalResourcePercentGrowth=this.upUrl
}
this.billableResourceTotalPercent=this.getProjectListData[0].billableResourceTotalPercent
this.billableResourceTotalPercent=0;
//this.billableResourceTotalPercentGrowth=(this.billableResourceTotal-this.billableResourceTotalPercent)*100/this.getProjectListData[0].billableResourceTotalPercent
(this.billableResourceTotalPercent==0)
{
  this.billableResourceTotalPercentGrowth=0
}
if(this.billableResourceTotalPercentGrowth>0)
{
  this.imgbillableResourceTotalPercentGrowth=this.downUrl
}
else if(this.billableResourceTotalPercentGrowth<0){
  this.imgbillableResourceTotalPercentGrowth=this.upUrl
}
  //}
    })
  }
  getDate:any
  setDate:any
  monthName:any
  fullYear:any
  changeDate(e){
var date=e.target.value
let latest_date =this. datepipe. transform(new Date(date), 'yyyy-MM-dd');
this.setDate=latest_date
let getdate = new Date(date); // 2020-06-21.
let shortMonth = getdate. toLocaleString('en-us', { month: 'short' }); /* Jun */
this.monthName=shortMonth
this.fullYear=getdate.getFullYear()

this.calendarName=this.monthName+' '+ getdate.getFullYear()
this.currentDate=this.setDate
this.checkDate=0
this.getpbiExpenseProjectCategory()
this.getpbiExpenseDeployee()
this.getpbiExpenseBreackUp()
this.getpbiExpenseDepartment()
this.getpbiExpense()
this.getPbiBuisinessRevenueList()
this.getPbiBuisinessAvgRevenueList()
this.getPbiBuisinessExpenseAndHeadCountAndProjectList()
this.getpbiPeopleDetailList()
this.getpbiPeopleTenureWiseEmployee()
this.getpbiPeopleResources()
this.getpbiPeopleEmployeeVsVendor()

this.getpbiPeopleDesignation()

this.getpbiSpenderWise()
this.getpbiCustomerWise()
this.getpbiPeopleDepartment()
this.getpbiPeopleLocation()
this.getpbiPeopleAge()
this.getpbiPeopleJoband()
this.getpbiPeopleGender()
this.getpbiPeopleEmployeeAddition()
this.getpbiPeopleEmployeeAttrition()
this.getpbiPeopleEmployeePerformance()
this.getpbiProjectDetailList()
this.getpbiPeopleResources()
this.getpbiProjectEmployeeVsVendor()
this.getpbiProjecDeployeeVsBench()
this.getpbiProjecDeployeeVsBenchBill()
this.getpbiExpenseReportList()
this.getpbiProjecDeployeeVsBenchBillEmployeeCountVsExpense()
this.getpbiProjecDeployeeVsBenchBillProjectCountVsExpense()
this.getpbiProjecDeployeeVsBenchBillCustomerVsService()

this.getProjectPortFoliyo()
//this.getProjectProjectDetailRevnueAndCost()
//this.getPbiProjectDetailProgressAndCost()
//this.getpbiProjectDetailRoadblock()
//this.getpbiProjectDevaition()
//this.getpbiProjectDevaitionAllTask()
this.getProjectProjectDetailPAndLGridList()
this.getpbiProjectDetailPAndLList()
this.getProjectExpenseDetailList()
this.getProjectBuisinessProjectList()
this.getProjectBuisinessPeopleList()
this.getProjectBuisinessExpenseList()
this.getPbiProjectInNumber()
this.getPbiProjectInNumberInCost()
this.getPbiProjectInNumberInCostLeave()
this.getpbiExpenseProject()
this.pbiActionableTimesheetList()
this.pbiActionableCheckInCheckOutList()
if(this.checkMom==true)
{
  this.pbiActionableInsightList()

}
if(this.checkRoadBlock==true)
{
  this.pbiActionableInsightRoadBlockList()
}
if(this.checkOverDue==true)
{
  this.pbiActionableInsightOverDueList()
}

  }
  pandlCallMethod()
  {
    this.getProjectProjectDetailPAndLGridList()
    
  }

  getResourcesDetail:any=[]
  category:any=[]
  employeeList:any=[]
 deployeeList:any=[]
 totalData:any
 width = 600;
  height = 400;
    type = "overlappedcolumn2d";
    dataFormat = "json";
    ccData:any

  getpbiPeopleResources(){
    let cmpcode=1
    let year='2022-02-20'
    this.getResourcesDetail=[]


this.Loader=true
    this.HTTP.getPbiPeopleResources(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getResourcesDetail=arg.data.table
  console.log('getResourcesDetail',arg.data.table)
  this.category=[]
    this.deployeeList=[]
    this.employeeList=[]
      this.Loader=false
//       deployeeproject: 10
// mm: 9
// monthNames: "September"
// totalemployee: 60
// yy: 2021
if(this.getResourcesDetail.length>0)
{

      for(var i=0;i<this.getResourcesDetail.length;i++)
      {
this.category.push({'label':this.getResourcesDetail[i].monthNames})
      }

      for(var i=0;i<this.getResourcesDetail.length;i++)
      {
this.deployeeList.push({'value':this.getResourcesDetail[i].deployeeproject})
      }

      for(var i=0;i<this.getResourcesDetail.length;i++)
      {
this.employeeList.push({'value':this.getResourcesDetail[i].totalemployee})
      }

      this.totalData = {
        chart: {
          caption: "",
          subcaption: "",
          yaxisname: "",
          numberprefix: "",
          drawcrossline: "1",
          theme: "fusion",
          showvalues: "0",
          renderAt: "chartContainer",
        },
        categories: [
          {
            category:this.category
          }
        ],
        dataset: [
          {
            seriesname:'Employee',
            data: this.employeeList
          },
          {
            seriesname: "On Project",
            data: this.deployeeList
          },
          // {
          //   seriesname: "Project",
          //   data: this.deployeeList
          // },

          // {
          //   seriesname:'totalEmployee',
          //   data: this.employeeList=[]
          // },

        ]
      };



    }
    })
  }

}







