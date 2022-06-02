import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExcelExportProperties, GridComponent } from '@syncfusion/ej2-angular-grids';
import { AnimationModel, FontModel } from '@syncfusion/ej2-angular-progressbar';
import { dataBinding, GroupModel } from '@syncfusion/ej2-angular-schedule';
import { ToasterService } from '../toaster/toaster.service';
import { GlobalServiceService } from '../global-service.service';
import { min } from 'moment';
import { DatePipe } from '@angular/common'
import { threadId } from 'worker_threads';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Tooltip } from '@syncfusion/ej2-popups';
import { environment } from 'src/environments/environment';

import { debug } from 'console';




type AOA = any[][];


@Component({
  selector: 'app-power-bireport',
  templateUrl: './power-bireport.component.html',
  styleUrls: ['./power-bireport.component.scss']
})
export class PowerBIReportComponent implements OnInit {
  public selectedDate: Date = new Date(2021, 3, 4);
  @ViewChild('overviewgrid')
  public grids: GridComponent;
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
  public allowMultiple = true;
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






  datahead = {
    chart: {
      caption: "",
      subcaption: "",
      yaxisname: "",
      syaxisname: "",
      labeldisplay: "rotate",
      snumbersuffix: "%",
      scrollheight: "10",
      numvisibleplot: "10",
      drawcrossline: "1",
      theme: "fusion"
    },
    categories: [
      {
        category: [
          {
            label: "Matzikama"
          },
          {
            label: "Cederberg"
          },
          {
            label: "Bergrivier"
          },
          {
            label: "Saldanha Bay"
          },
          {
            label: "Swartland"
          },
          {
            label: "Witzenberg"
          },
          {
            label: "Drakenstein"
          },
          {
            label: "Stellenbosch"
          },
          {
            label: "Breede Valley"
          },
          {
            label: "Langeberg"
          },
          {
            label: "Swellendam"
          },
          {
            label: "Theewaterskloof"
          },
          {
            label: "Overstrand"
          },
          {
            label: "Cape Agulhas"
          },
          {
            label: "Kannaland"
          },
          {
            label: "Hessequa"
          },
          {
            label: "Mossel Bay"
          },
          {
            label: "George"
          },
          {
            label: "Oudtshoorn"
          },
          {
            label: "Bitou"
          },
          {
            label: "Knysna"
          },
          {
            label: "Laingsburg"
          },
          {
            label: "Prince Albert"
          },
          {
            label: "Beaufort West"
          }
        ]
      }
    ],
    dataset: [
      {
        seriesname: "Total Population",
        plottooltext: "Population: $dataValue",
        data: [
          {
            value: "71045"
          },
          {
            value: "52949"
          },
          {
            value: "67474"
          },
          {
            value: "111173"
          },
          {
            value: "133762"
          },
          {
            value: "130548"
          },
          {
            value: "280195"
          },
          {
            value: "173419"
          },
          {
            value: "176578"
          },
          {
            value: "105483"
          },
          {
            value: "40211"
          },
          {
            value: "117109"
          },
          {
            value: "93466"
          },
          {
            value: "36000"
          },
          {
            value: "24168"
          },
          {
            value: "54237"
          },
          {
            value: "94135"
          },
          {
            value: "208237"
          },
          {
            value: "97509"
          },
          {
            value: "59157"
          },
          {
            value: "73835"
          },
          {
            value: "8895"
          },
          {
            value: "14272"
          },
          {
            value: "51080"
          }
        ]
      },
      {
        seriesname: "Youth",
        renderas: "area",
        showanchors: "0",
        plottooltext: "Youth: $dataValue",
        data: [
          {
            value: "24598"
          },
          {
            value: "18302"
          },
          {
            value: "22162"
          },
          {
            value: "40696"
          },
          {
            value: "47420"
          },
          {
            value: "49981"
          },
          {
            value: "97230"
          },
          {
            value: "73162"
          },
          {
            value: "60668"
          },
          {
            value: "34594"
          },
          {
            value: "12567"
          },
          {
            value: "39907"
          },
          {
            value: "30681"
          },
          {
            value: "11323"
          },
          {
            value: "7801"
          },
          {
            value: "15785"
          },
          {
            value: "31478"
          },
          {
            value: "72762"
          },
          {
            value: "32301"
          },
          {
            value: "21401"
          },
          {
            value: "27863"
          },
          {
            value: "3254"
          },
          {
            value: "5562"
          },
          {
            value: "19047"
          }
        ]
      },
      {
        seriesname: "Subsidies received %",
        parentyaxis: "S",
        renderas: "line",
        plottooltext: "$dataValue subsidies received",
        showvalues: "0",
        data: [
          {
            value: "28.0"
          },
          {
            value: "35.2"
          },
          {
            value: "23.9"
          },
          {
            value: "11.8"
          },
          {
            value: "18.0"
          },
          {
            value: "26.9"
          },
          {
            value: "11.1"
          },
          {
            value: "11.2"
          },
          {
            value: "24.0"
          },
          {
            value: "18.9"
          },
          {
            value: "35.6"
          },
          {
            value: "37.9"
          },
          {
            value: "12.9"
          },
          {
            value: "27.6"
          },
          {
            value: "40.5"
          },
          {
            value: "19.9"
          },
          {
            value: "15.6"
          },
          {
            value: "28.2"
          },
          {
            value: "23.3"
          },
          {
            value: "26.2"
          },
          {
            value: "16.9"
          },
          {
            value: "41.9"
          },
          {
            value: "62.1"
          },
          {
            value: "31.2"
          }
        ]
      }
    ]
  };


  dataspline = {
    chart: {
      caption: "",
      yaxisname: "",
      anchorradius: "5",
      plottooltext: "Average temperature in $label is <b>$dataValue</b>",
      showhovereffect: "1",
      showvalues: "0",
      numbersuffix: "°C",
      theme: "fusion",
      anchorbgcolor: "#72D7B2",
      palettecolors: "#72D7B2"
    },
    data: [
      {
        label: "Jan",
        value: "1"
      },
      {
        label: "Feb",
        value: "5"
      },
      {
        label: "Mar",
        value: "10"
      },
      {
        label: "Apr",
        value: "12"
      },
      {
        label: "May",
        value: "14"
      },
      {
        label: "Jun",
        value: "16"
      },
      {
        label: "Jul",
        value: "20"
      },
      {
        label: "Aug",
        value: "22"
      },
      {
        label: "Sep",
        value: "20"
      },
      {
        label: "Oct",
        value: "16"
      },
      {
        label: "Nov",
        value: "7"
      },
      {
        label: "Dec",
        value: "2"
      }
    ]
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
  CmpCode: any;
  public filter: Object;
  public filterSettings: Object;
  public selectionSettings: Object;
  //public height: string = '240px';
  public fields: Object = { text: 'text', value: 'value' };
  public item: number[] = [1, 2, 3, 4, 5];
  roleIds: any;
  UserType: any



  constructor(
   private  HTTP: GlobalServiceService,
   private datepipe:DatePipe

  ) { }
  setDepartment:any
  departmentList:any=[]
  onChange(e)
  {
    this.departmentId=e.target.value
    this.getpbiPeopleDetailList()
    this.getpbiPeopleDesignation()
    this.getpbiExpenseDepartment()
    this.getpbiExpense()
    this.getpbiSpenderWise()
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
    this.getPbiProjectInNumber()
    this.getPbiProjectInNumberInCost()
    this.getPbiProjectInNumberInCostLeave()
    this.getpbiExpenseProject()

  }
  ngOnInit(): void {
    this.departmentId=0
    this.setDepartment=0
this.CmpCode="1"
//this.departmentList=[{depId:'1',depName:'it'},{depId:'2',depName:'Admin'}]
let latest_date =this. datepipe. transform(new Date(), 'yyyy-MM-dd');
this.setDate=latest_date
let getdate = new Date(); // 2020-06-21.
this.getDate=latest_date
let shortMonth = getdate. toLocaleString('en-us', { month: 'short' }); /* Jun */
this.monthName=shortMonth
    this.filterSettings = { type: "Menu" };
    this.filter = { type: "CheckBox" };
    this.Planwk1 = [
      {
        field: 'openTask',
        headerText: 'Open',
        textAlign:"Center",



      },
      {
        field: 'pendingTask',
        headerText: 'Pending',
        textAlign:"Center",




      },
      {
        field: 'closeTask',
        headerText: 'Close',
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
    this.getpbiPeopleDetailList()
this.getpbiPeopleDesignation()
this.getpbiExpenseDepartment()
this.getpbiExpense()
this.getpbiSpenderWise()
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
this.getPbiProjectInNumber()
this.getPbiProjectInNumberInCost()
this.getPbiProjectInNumberInCostLeave()
this.getpbiExpenseProject()
this.getDepartmentListDropdown()

  }

  getDepartmentListDropdown()
  {
    debugger
    this.Loader=true
    this.HTTP.getpbiDepartmentList(this.setDate,this.CmpCode).subscribe(arg => {

      this.departmentList=  arg.data.table
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
    "chart": {
      "theme": "fusion",
      "subCaption": " ",
      "xAxisName": " ",
      "pYAxisName": "  ",
      "sYAxisname": " ",
      "showValues": "0",
      "showXAxisLine": "1",
      'paletteColors' :'7bb7ed',
      "showLineValues": "1"
    },
    "data": this.setProjectNumberList
  };
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
    var getColor=[]

    for(var i=0;i<this.getListProjectInNumberInCost.length;i++)
    {
      getColor.push(this.setColor[i])
    }
    for(var i=0;i<this.getListProjectInNumber.length;i++)
    {
this.monthInCost.push({"label":this.getListProjectInNumber[i].monthNames})
this.numberProjectInCost.push({"value":this.getListProjectInNumber[i].employee})
this.venderNumberInCost.push({"value":this.getListProjectInNumber[i].vendor})
//this.venderNumber.push({"label":this.getListProgress[i].monthes,"value":this.getListProgress[i].cost})
  this.setProjectNumberListInCost.push({"label":this.getListProjectInNumberInCost[i].monthNames,"value":this.getListProjectInNumberInCost[i].employee})
}

this.projectDetailNumberInCost = {
  "chart": {
    "theme": "fusion",
    "subCaption": "",
    "xAxisName": "",
    "pYAxisName": "",
    "sYAxisname": "",
    "showValues": "0",
    "showXAxisLine": "1",
    'paletteColors' :'7bb7ed',
    "showLineValues": "1"
  },
  "data": this.setProjectNumberListInCost
};
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
debugger;
this.Loader=false
      this.getListProjectInNumberInCostLeave=  arg.data.table
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
  "chart": {
    "theme": "fusion",
    "subCaption": " ",
    "xAxisName": " ",
    "pYAxisName": "  ",
    "sYAxisname": " ",
    "showValues": "0",
    "showXAxisLine": "1",
    'paletteColors' :'7bb7ed',
    "showLineValues": "1"
  },
  "data": this.setProjectNumberListInCostLeave
};
debugger
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
  getPbiProjectDetailProgressAndCost(data){
      let cmpcode=1
      let year='2022-02-20'
      this.getListProgress=[]
      this.dataProgress=[]
      this.dataProjectProgressList=[]
      this.setList=[]
      this.dataProjectCostList=[]
      this.Loader=true
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
this.dataProjectProgressList.push({"value":this.getListProgress[i].cost})
this.dataProjectCostList.push({"value":this.getListProgress[i].progress})
this.setList.push({"label":this.getListProgress[i].monthes,"value":this.getListProgress[i].cost})

}


this.dataProjectProgressList = {
  "chart": {
    "caption": "Progress & Cost %",
    'paletteColors' :'7cb5ec',
    "showHoverEffect": "1",
    "theme": "fusion"
},
"data":this.setList
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
  //   "data": [{
  //     "label": "Traffic",
  //     "value": "5680"
  //   },
  //   {
  //     "label": "Family Engagement",
  //     "value": "1036"
  //   },
  //   {
  //     "label": "Public Transport",
  //     "value": "950"
  //   },
  //   {
  //     "label": "Weather",
  //     "value": "500"
  //   }
  // ]

  // };
  getListProjectDetailRoadblock:any=[]
  getpbiProjectDetailRoadblock(data){
      let cmpcode=1
      let year='2022-02-20'
      this.getListProjectDetailRoadblock=[]
      this.Loader=true
      this.HTTP.getPbiProjectDetailRoadBlockList(this.setDate,this.CmpCode,data,this.departmentId).subscribe(arg => {
      this.getListProjectDetailRoadblock=  arg.data.table
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
        var tooltipShow="Billable:"+Number(this.getListProjectDetailRoadblock[i].billableHour)+", Non-Billable:"+Number(this.getListProjectDetailRoadblock[i].nonBillableHour)
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

      this.gridsFor.refresh()
    this.gridsFor.refreshColumns()
    this.gridsFor.dataSource=this.getListProjectDetailRoadblock

      })
  }
  rows(e:any)
  {

  }
  customiseCell(args)
  {
   // if (args.column.field === 'resourceName') {
      if (args.data['inActive'] ==1) {
        debugger
        args.cell.classList.add('abc');
     // }
    }
  }
  recieptIMg: any
  userImage(item) {
    debugger;
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
  getpbiProjectDetailPAndLList(){
      let cmpcode=1
      let year='2022-02-20'
      this.getprojectDetailPAndLList=[]
      this.Loader=true
      this.HTTP.getPbiProjectDetailPAndLList(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getprojectDetailPAndLList=  arg.data.table
      this.Loader=false
this.plcurrentYear= this.getprojectDetailPAndLList[0].plcurrentYear
this.plpreviousYear= this.getprojectDetailPAndLList[0].plpreviousYear


this.avgMarginCurrentYear= this.getprojectDetailPAndLList[0].avgMarginCurrentYear
this.avgMarginCurrentYearGrowth=this.getprojectDetailPAndLList[0].avgMarginCurrentYearGrowth
this.avgMarginCurrentYearGrowthPercent=(this.avgMarginCurrentYear-this.avgMarginCurrentYearGrowth)*100/this.avgMarginCurrentYearGrowth
if(this.avgMarginCurrentYearGrowth==0)
{
  this.avgMarginCurrentYearGrowthPercent=0
}

if(this.avgMarginCurrentYearGrowthPercent>=0)
{
  this.avgMarginCurrentYearGrowthPercentimg=this.downUrl
}
else{
  this.avgMarginCurrentYearGrowthPercentimg=this.upUrl
}
this.avgMarginPreviousYear=this.getprojectDetailPAndLList[0].avgMarginPreviousYear
this.avgMarginPreviousYearGrowth=this.getprojectDetailPAndLList[0].avgMarginPreviousYearGrowth

this.avgMarginPreviousYearGrowthPercent=(this.avgMarginPreviousYear-this.avgMarginPreviousYearGrowth)*100/this.avgMarginPreviousYearGrowth
if(this.avgMarginPreviousYearGrowth==0)
{
  this.avgMarginPreviousYearGrowthPercent=0
}
if(this.avgMarginPreviousYearGrowthPercent>=0)
{
  this.avgMarginPreviousYearGrowthPercentimg=this.downUrl
}
else{
  this.avgMarginPreviousYearGrowthPercentimg=this.upUrl
}
this.avgRevenueCurrentYear=this.getprojectDetailPAndLList[0].avgRevenueCurrentYear
this.avgRevenueCurrentYearGrowth=this.getprojectDetailPAndLList[0].avgRevenueCurrentYearGrowth

this.avgRevenueCurrentYearGrowthPercent=(this.avgRevenueCurrentYear-this.avgRevenueCurrentYearGrowth)*100/this.avgRevenueCurrentYearGrowth
if(this.avgRevenueCurrentYearGrowth==0)
{
  this.avgRevenueCurrentYearGrowthPercent=0
}

if(this.avgRevenueCurrentYearGrowthPercent>=0)
{
  this.avgRevenueCurrentYearGrowthPercentimg=this.downUrl
}
else{
  this.avgRevenueCurrentYearGrowthPercentimg=this.upUrl
}
this.avgRevenuePreviousYear=this.getprojectDetailPAndLList[0].avgRevenuePreviousYear
this.avgRevenuePreviousYearGrowth=this.getprojectDetailPAndLList[0].avgRevenuePreviousYearGrowth
this.avgRevenuePreviousYearGrowthPercent=(this.avgRevenuePreviousYear-this.avgRevenuePreviousYearGrowth)*100/this.avgRevenuePreviousYearGrowth
if(this.avgRevenuePreviousYearGrowth==0)
{
  this.avgRevenuePreviousYearGrowthPercent=0
}
if(this.avgRevenuePreviousYearGrowthPercent>=0)
{
  this.avgRevenuePreviousYearGrowthPercentimg=this.downUrl
}
else{
  this.avgRevenuePreviousYearGrowthPercentimg=this.upUrl
}
this.avgTenureCurrentYear=this.getprojectDetailPAndLList[0].avgTenureCurrentYear
this.avgTenureCurrentYearGrowth=this.getprojectDetailPAndLList[0].avgTenureCurrentYearGrowth
this.avgTenureCurrentYearGrowthPercent=(this.avgTenureCurrentYear-this.avgTenureCurrentYearGrowth)*100/this.avgTenureCurrentYearGrowth
if(this.avgTenureCurrentYearGrowth==0)
{
  this.avgTenureCurrentYearGrowthPercent=0
}
if(this.avgTenureCurrentYearGrowthPercent>=0)
{
  this.avgTenureCurrentYearGrowthPercentimg=this.downUrl
}
else{
  this.avgTenureCurrentYearGrowthPercentimg=this.upUrl
}

this.avgTenurePreviousYear=this.getprojectDetailPAndLList[0].avgTenurePreviousYear
this.avgTenurePreviousYearGrowth= this.getprojectDetailPAndLList[0].avgTenurePreviousYearGrowth

this.avgTenurePreviousYearGrowthPercent=(this.avgTenurePreviousYear-this.avgTenurePreviousYearGrowth)*100/this.avgTenurePreviousYearGrowth
if(this.avgTenurePreviousYearGrowth==0)
{
  this.avgTenurePreviousYearGrowthPercent=0
}
if(this.avgTenurePreviousYearGrowthPercent>=0)
{
  this.avgTenurePreviousYearGrowthPercentimg=this.downUrl
}
else{
  this.avgTenurePreviousYearGrowthPercentimg=this.upUrl
}
this.netRevenueCurrentYear= this.getprojectDetailPAndLList[0].netRevenueCurrentYear
this.netRevenueCurrentYearGrowth=this.getprojectDetailPAndLList[0].netRevenueCurrentYearGrowth

this.netRevenueCurrentYearGrowthPercent=(this.netRevenueCurrentYear-this.netRevenueCurrentYearGrowth)*100/this.netRevenueCurrentYearGrowth
if(this.netRevenueCurrentYearGrowth==0)
{
  this.netRevenueCurrentYearGrowthPercent=0
}
if(this.netRevenueCurrentYearGrowthPercent>=0)
{
  this.netRevenueCurrentYearGrowthPercentimg=this.downUrl
}
else{
  this.netRevenueCurrentYearGrowthPercentimg=this.upUrl
}

this.netRevenuePreviousYear=this.getprojectDetailPAndLList[0].netRevenuePreviousYear
this.netRevenuePreviousYearGrowth=this.getprojectDetailPAndLList[0].netRevenuePreviousYearGrowth
this.netRevenuePreviousYearGrowthPercent=(this.netRevenuePreviousYear-this.netRevenuePreviousYearGrowth)*100/this.netRevenuePreviousYearGrowth
if(this.netRevenuePreviousYearGrowth==0)
{
  this.netRevenuePreviousYearGrowthPercent=0
}
if(this.netRevenuePreviousYearGrowthPercent>=0)
{
  this.netRevenuePreviousYearGrowthPercentimg=this.downUrl
}
else{
  this.netRevenuePreviousYearGrowthPercentimg=this.upUrl
}

this.projectCostCurrentYear=this.getprojectDetailPAndLList[0].projectCostCurrentYear
this.projectCostCurrentYearGrowth=this.getprojectDetailPAndLList[0].projectCostCurrentYearGrowth
this.projectCostCurrentYearGrowthPercent=(this.projectCostCurrentYear-this.projectCostCurrentYearGrowth)*100/this.projectCostCurrentYearGrowth
if(this.projectCostCurrentYearGrowth==0)
{
  this.projectCostCurrentYearGrowthPercent=0
}
if(this.projectCostCurrentYearGrowthPercent>=0)
{
  this.projectCostCurrentYearGrowthPercentimg=this.downUrl
}
else{
  this.projectCostCurrentYearGrowthPercentimg=this.upUrl
}
this.projectCostInDollarCurrentYear=this.getprojectDetailPAndLList[0].projectCostInDollarCurrentYear
this.projectCostInDollarCurrentYearGrowth=this.getprojectDetailPAndLList[0].projectCostInDollarCurrentYearGrowth

this.projectCostInDollarCurrentYearGrowthPercent=(this.projectCostInDollarCurrentYear-this.projectCostInDollarCurrentYearGrowth)*100/this.projectCostInDollarCurrentYearGrowth
if(this.projectCostInDollarCurrentYearGrowth==0)
{
  this.projectCostInDollarCurrentYearGrowthPercent=0
}
if(this.projectCostInDollarCurrentYearGrowthPercent>=0)
{
  this.projectCostInDollarCurrentYearGrowthPercentimg=this.downUrl
}
else{
  this.projectCostInDollarCurrentYearGrowthPercentimg=this.upUrl
}

this.projectCostInDollarPerviousYear=this.getprojectDetailPAndLList[0].projectCostInDollarPerviousYear
this.projectCostInDollarPreviousYearGrowth=this.getprojectDetailPAndLList[0].projectCostInDollarPreviousYearGrowth
this.projectCostInDollarPreviousYearGrowthPercent=(this.projectCostInDollarPerviousYear-this.projectCostInDollarPreviousYearGrowth)*100/this.projectCostInDollarPreviousYearGrowth
if(this.projectCostInDollarPreviousYearGrowth==0)
{
  this.projectCostInDollarPreviousYearGrowthPercent=0
}
if(this.projectCostInDollarCurrentYearGrowthPercent>=0)
{
  this.projectCostInDollarCurrentYearGrowthPercentimg=this.downUrl
}
else{
  this.projectCostInDollarCurrentYearGrowthPercentimg=this.upUrl
}
this.projectCostPreviousYear=this.getprojectDetailPAndLList[0].projectCostPreviousYear
this.projectCostPreviousYearGrowth=this.getprojectDetailPAndLList[0].projectCostPreviousYearGrowth
this.projectCostPreviousYearGrowthPercent=(this.projectCostPreviousYear-this.projectCostPreviousYearGrowth)*100/this.projectCostPreviousYearGrowth
if(this.projectCostPreviousYearGrowth==0)
{
  this.projectCostPreviousYearGrowthPercent=0
}
if(this.projectCostPreviousYearGrowthPercent>=0)
{
  this.projectCostPreviousYearGrowthPercentimg=this.downUrl
}
else{
  this.projectCostPreviousYearGrowthPercentimg=this.upUrl
}

this.projectWithAvgMarginCurrentYear=this.getprojectDetailPAndLList[0].projectWithAvgMarginCurrentYear
this.projectWithAvgMarginCurrentYearGrowth=this.getprojectDetailPAndLList[0].projectWithAvgMarginCurrentYearGrowth
this.projectWithAvgMarginCurrentYearGrowthPercent=(this.projectWithAvgMarginCurrentYear-this.projectWithAvgMarginCurrentYearGrowth)*100/this.projectWithAvgMarginCurrentYearGrowth
if(this.projectWithAvgMarginCurrentYearGrowth==0)
{
  this.projectWithAvgMarginCurrentYearGrowthPercent=0
}
if(this.projectWithAvgMarginCurrentYearGrowthPercent>=0)
{
  this.projectWithAvgMarginCurrentYearGrowthPercentimg=this.downUrl
}
else{
  this.projectWithAvgMarginCurrentYearGrowthPercentimg=this.upUrl
}
this.projectWithAvgMarginPreviousYear=this.getprojectDetailPAndLList[0].projectWithAvgMarginPreviousYear
this.projectWithAvgMarginPreviousYearGrowth=this.getprojectDetailPAndLList[0].projectWithAvgMarginPreviousYearGrowth
this.projectWithAvgMarginPreviousYearGrowthPercent=(this.projectWithAvgMarginPreviousYear-this.projectWithAvgMarginPreviousYearGrowth)*100/this.projectWithAvgMarginPreviousYearGrowth
if(this.projectWithAvgMarginPreviousYearGrowth==0)
{
  this.projectWithAvgMarginPreviousYearGrowthPercent=0
}
if(this.projectWithAvgMarginPreviousYearGrowthPercent>=0)
{
  this.projectWithAvgMarginPreviousYearGrowthPercentimg=this.downUrl
}
else{
  this.projectWithAvgMarginPreviousYearGrowthPercentimg=this.upUrl
}

this.totalCostCurrentYear=this.getprojectDetailPAndLList[0].totalCostCurrentYear
this.totalCostCurrentYearGrowth=this.getprojectDetailPAndLList[0].totalCostCurrentYearGrowth
this.totalCostCurrentYearGrowthPercent=(this.totalCostCurrentYear-this.totalCostCurrentYearGrowth)*100/this.totalCostCurrentYearGrowth
if(this.totalCostCurrentYearGrowth==0)
{
  this.totalCostCurrentYearGrowthPercent=0
}


if(this.totalCostCurrentYearGrowthPercent>=0)
{
  this.totalCostCurrentYearGrowthPercentimg=this.downUrl
}
else{
  this.totalCostCurrentYearGrowthPercentimg=this.upUrl
}
this.totalCostPreviouYear=this.getprojectDetailPAndLList[0].totalCostPreviouYear
this.totalCostPreviouYearGrowth=this.getprojectDetailPAndLList[0].totalCostPreviouYearGrowth

this.totalCostPreviouYearGrowthPercent=(this.totalCostPreviouYear-this.totalCostPreviouYearGrowth)*100/this.totalCostPreviouYearGrowth
if(this.totalCostPreviouYearGrowth==0)
{
  this.totalCostPreviouYearGrowthPercent=0
}
if(this.totalCostPreviouYearGrowthPercent>=0)
{
  this.totalCostPreviouYearGrowthPercentimg=this.downUrl
}
else{
  this.totalCostPreviouYearGrowthPercentimg=this.upUrl
}

})
  }
  getListExpense:any=[]
  dataExpenselist:any=[]
  dataexpenselist:any
  getpbiExpense(){
      let cmpcode=1
      let year='2022-02-20'
      this.getListExpense=[]
      this.dataExpenselist=[]
      this.Loader=true
      this.HTTP.getpbiExpenseListData(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getListExpense=  arg.data.table
      this.Loader=false
      var getColor=[]

      for(var i=0;i<5;i++)
      {
        getColor.push(this.setColor[i])
      }
      var sum=0
      for(var i=0;i<5;i++)
      {
    sum=this.getListExpense[i].designationId
this.dataExpenselist.push({"label":this.getListExpense[i].designationName,"value":this.getListExpense[i].designationId})
      }
this.dataExpenselist.push({"label":'Other','value':100-sum})
      this.dataexpenselist = {
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
        "data": this.dataExpenselist
      };



      })
  }
  getListSpenderWise:any=[]
  dataSpenderWise:any=[]
  dataspenderwise:any
  columnList:any=[]
  rowList:any=[]
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
      var getColor=[]

      for(var i=0;i<this.getListSpenderWise.length;i++)
      {
        getColor.push(this.setColor[i])
      }
      for(var i=0;i<this.getListSpenderWise.length;i++)
      {
this.dataSpenderWise.push({"rowid":this.getListSpenderWise[i].rowid,"columnid":this.getListSpenderWise[i].columnid,"value":this.getListSpenderWise[i].setVAlue})

this.columnList.push({"id":this.getListSpenderWise[i].columnid,"label":this.getListSpenderWise[i].columnid,})
this.rowList.push({"id":this.getListSpenderWise[i].rowid,"label":""})

}

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
      plottooltext: "$rowlabel's $columnlabel grading score: <b>$value</b>"
    }
  };

  // dataExcat2 = {
  //   colorrange: {
  //     gradient: "1",
  //     minvalue: "0",
  //     startlabel: "Poor",
  //     palettecolors: "#002d57, #59748f",
  //     'paletteColors' :'002d57, 59748f',
  //     endlabel: "Outstanding"
  //   },
  //   dataset: [
  //     {
  //       data: [
  //         {
  //           rowid: "JA",
  //           columnid: "EN",
  //           value: "3.7"
  //         },
  //         {
  //           rowid: "JA",
  //           columnid: "PY",
  //           value: "4.3"
  //         },
  //         {
  //           rowid: "JA",
  //           columnid: "MT",
  //           value: "4.0"
  //         },
  //         {
  //           rowid: "JA",
  //           columnid: "HS",
  //           value: "3.3"
  //         },
  //         {
  //           rowid: "JA",
  //           columnid: "EC",
  //           value: "3.1"
  //         },
  //         {
  //           rowid: "EM",
  //           columnid: "EN",
  //           value: "3.6"
  //         },
  //         {
  //           rowid: "EM",
  //           columnid: "PY",
  //           value: "4.0"
  //         },
  //         {
  //           rowid: "EM",
  //           columnid: "MT",
  //           value: "3.2"
  //         },
  //         {
  //           rowid: "EM",
  //           columnid: "HS",
  //           value: "2.6"
  //         },
  //         {
  //           rowid: "EM",
  //           columnid: "EC",
  //           value: "3.2"
  //         },
  //         {
  //           rowid: "JY",
  //           columnid: "EN",
  //           value: "3.8"
  //         },
  //         {
  //           rowid: "JY",
  //           columnid: "PY",
  //           value: "4.1"
  //         },
  //         {
  //           rowid: "JY",
  //           columnid: "MT",
  //           value: "3.9"
  //         },
  //         {
  //           rowid: "JY",
  //           columnid: "HS",
  //           value: "2.6"
  //         },
  //         {
  //           rowid: "JY",
  //           columnid: "EC",
  //           value: "2"
  //         },
  //         {
  //           rowid: "WL",
  //           columnid: "EN",
  //           value: "3.4"
  //         },
  //         {
  //           rowid: "WL",
  //           columnid: "PY",
  //           value: "3.2"
  //         },
  //         {
  //           rowid: "WL",
  //           columnid: "MT",
  //           value: "4"
  //         },
  //         {
  //           rowid: "WL",
  //           columnid: "HS",
  //           value: "2.5"
  //         },
  //         {
  //           rowid: "WL",
  //           columnid: "EC",
  //           value: "3.1"
  //         }
  //       ]
  //     }
  //   ],
  //   columns: {
  //     column: [
  //       {
  //         id: "EN",
  //         label: "English"
  //       },
  //       {
  //         id: "MT",
  //         label: "Maths"
  //       },
  //       {
  //         id: "PY",
  //         label: "Physics"
  //       },
  //       {
  //         id: "HS",
  //         label: "History"
  //       },
  //       {
  //         id: "EC",
  //         label: "Economics"
  //       }
  //     ]
  //   },
  //   rows: {
  //     row: [
  //       {
  //         id: "JA",
  //         label: ""
  //       },
  //       {
  //         id: "EM",
  //         label: ""
  //       },
  //       {
  //         id: "JY",
  //         label: ""
  //       },
  //       {
  //         id: "WL",
  //         label: ""
  //       }
  //     ]
  //   },
  //   chart: {
  //     theme: "fusion",
  //     caption: "",
  //     subcaption: "",
  //     xaxisname: "",
  //     yaxisname: "",
  //     showvalues: "1",
  //     valuefontcolor: "#ffffff",
  //     plottooltext: "$rowlabel's $columnlabel grading score: <b>$value</b>"
  //   }
  // };


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
      debugger
      this.Loader=false
      var getColor=[]
var sum=0
      for(var i=0;i<this.getListDesignation.length;i++)
      {
        getColor.push(this.setColor[i])
      }
      debugger
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
      this.dataExpenseDepartment=[]
      this.Loader=true
      this.HTTP.getPbiExpenseProject(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getListExpenseProject=  arg.data.table
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
      category: this.dataExpenseCatProject
    }
  ],
  dataset: [
    {
      seriesname: "2016",
      data: this.dataExpensePreviousProject
    },
    {
      seriesname: "2017",
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
  resourceList:any=[]
  resouceBillableList:any=[]
  resouceNonBillableList:any=[]
  popup:boolean=false
  getResouceList(projectid)
  {
    this.resouceNonBillableList=[]
    this.resourceList=[]
  this.resouceBillableList=[]
  this.popup=true
this.Loader=true
    this.HTTP.getpbiResourceList(this.setDate,this.CmpCode,projectid,this.departmentId).subscribe(arg => {
      this.resourceList=  arg.data.table
      debugger
      this.Loader=false
      for(var i=0;i<this.resourceList.length;i++)
      {
        if(this.resourceList[i].contribution==1)
        {
this.resouceBillableList.push({'billid':this.resourceList[i].resourceName})
        }
        if(this.resourceList[i].contribution==0)
        {
this.resouceNonBillableList.push({'billid':this.resourceList[i].resourceName})
        }
      }
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
  dataempoyeevsvendor:any
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
   debugger;
      this.getListProjectVsVendor=  arg.data.table
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
        seriesname: "Deployee",
        data:this.dataProjectdeployeeBill
      },
      {
        seriesname: "On Bench",
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
    this.Loader=false
//       designationId: 15
// designationName:
if(this.getListProjectVsBenchBillEmployeeCountVsExpense.length>=0)
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
        category:this.dataProjectVsDeployeeBillEmployeeCountVsExpense
      }
    ],
    dataset: [
      {
        seriesname: "Employee Count",
        data:this.dataProjectdeployeeBillEmployeeCountVsExpense
      },
      {
        seriesname: "Expense",
        data:this.dataVendorBenchBillEmployeeCountVsExpense
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
    this.Loader=false
//       designationId: 15
// designationName:
if(this.getListProjectVsBenchBillProjectCountVsExpense.length>=0)
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
        seriesname: "Employee Count",
        data:this.dataProjectdeployeeBillProjectCountVsExpense
      },
      {
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
dataprojectDeployeeVsBenchBillCustomerVsService:any=[]
getpbiProjecDeployeeVsBenchBillCustomerVsService(){
  let cmpcode=1
  let year='2022-02-20'
  this.dataProjectVsDeployeeBillCustomerVsService=[]
  this.getListProjectVsBenchBillCustomerVsService=[]
  this.dataProjectdeployeeBillProjectCountVsExpense=[]
  this.dataVendorBenchBillProjectCountVsExpense=[]
  this.Loader=true
  this.HTTP.getpbiProjecDeployeeVsBenchBillCustomerVsService(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
    this.getListProjectVsBenchBillCustomerVsService=  arg.data.table
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
        seriesname: "Employee Count",
        data:this.dataProjectdeployeeBillCustomerVsService
      },
      {
        seriesname: "Expense",
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
        category:this.dataEmployeeAddition
      }
    ],
    dataset: [
      {
        seriesname: "Total Employee",
      //  plottooltext: "Employee: $dataValue",
        data:this.cateList
      },

      {
        seriesname: "Percentage",
        parentyaxis: "S",
        renderas: "line",
       // plottooltext: "$dataValue subsidies received",
        //showvalues: "0",
        data: this.cateList
      }
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
// debugger
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

  // dateformat(datas)
  // {
  //   return this.datePipe.transform(datas, 'dd/MM/yyyy')

  // }
  // DateFormat:any
  // Dateformat(datas:string){
  // //  this.DateFormat= this.getdateFormat();
  // this.DateFormat= '-1'

  //   if (this.DateFormat=='1')
  //   {
  //     return this.datePipe.transform(datas, 'MM/dd/yyyy')
  //   }
  //   if(this.DateFormat=='2')
  //   {
  //     return this.datePipe.transform(datas, 'dd/MM/yyyy')
  //   }
  //   if(this.DateFormat== '3')
  //   {
  //     return this.datePipe.transform(datas, 'yyyy/MM/dd')
  //   }
  // }
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
  getPerformance()
  {

    this.getListEmployeePerformance=[]
    this.Loader=true
    this.HTTP.getPbiReportEmployeePerformance(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
    this.getListEmployeePerformance=  arg.data.
    this.Loader=false
    if(this.getListEmployeePerformance.length>=0)
    {

      this.grids.refresh()
      this.grids.refreshColumns()
      this.grids.dataSource=this.getListEmployeePerformance
    }

    })
  }
  getListProjectPortfoliyo:any=[]
  getProjectPortFoliyo()
  {
    this.getListEmployeePerformance=[]
    this.Loader=true
    this.HTTP.getPbiProjectPortfoliyo(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
    this.getListProjectPortfoliyo=  arg.data.table
    this.Loader=false
    for(var i=0;i<this.getListProjectPortfoliyo.length;i++)
    {
      if(this.getListProjectPortfoliyo[i].V_Billable==null || this.getListProjectPortfoliyo[i].V_Billable=='')
      {
        this.getListProjectPortfoliyo[i].V_Billable=0
      }
      if(this.getListProjectPortfoliyo[i].billablePer==null || this.getListProjectPortfoliyo[i].billablePer=='')
      {
        this.getListProjectPortfoliyo[i].billablePer=0
      }
      var tooltipBillableCount='E-Billable:'+Number(this.getListProjectPortfoliyo[i].billablePer)+'</br> V-Billable:'+Number(this.getListProjectPortfoliyo[i].V_Billable)
  this.getListProjectPortfoliyo[i].tooltipBillableCount=tooltipBillableCount

    var total=Number(this.getListProjectPortfoliyo[i].V_Billable)+Number(this.getListProjectPortfoliyo[i].billablePer)
  let billablePercent= Number(this.getListProjectPortfoliyo[i].billablePer)*100/total
  this.getListProjectPortfoliyo[i].billablePercent=billablePercent
  let vbillablePercent= Number(this.getListProjectPortfoliyo[i].V_Billable)*100/total
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
  if(this.getListProjectPortfoliyo[i].V_BillableAmount==null || this.getListProjectPortfoliyo[i].V_BillableAmount=='')
  {
    this.getListProjectPortfoliyo[i].V_BillableAmount=0
  }
  var tooltipBillableAmount='E-Billable Amount:'+Number(this.getListProjectPortfoliyo[i].billable)+'<br/> V-BillableAmount:'+Number(this.getListProjectPortfoliyo[i].V_BillableAmount)
  this.getListProjectPortfoliyo[i].tooltipBillableAmount=tooltipBillableAmount
  var totalbillAmount=Number(this.getListProjectPortfoliyo[i].billable)+Number(this.getListProjectPortfoliyo[i].V_BillableAmount)
let billablePercentAmount= Number(this.getListProjectPortfoliyo[i].billable)*100/totalbillAmount
this.getListProjectPortfoliyo[i].billablePercentAmount=billablePercentAmount
let vbillablePercentAmount= Number(this.getListProjectPortfoliyo[i].V_BillableAmount)*100/totalbillAmount
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
var tooltipmom='Open Mom:'+Number(this.getListProjectPortfoliyo[i].momopen)+'<br/>Close Mom:'+Number(this.getListProjectPortfoliyo[i].momclose)


this.getListProjectPortfoliyo[i].tooltipmom=tooltipmom
var totalmom=Number(this.getListProjectPortfoliyo[i].momopen)+Number(this.getListProjectPortfoliyo[i].momclose)
let momopenpercent= Number(this.getListProjectPortfoliyo[i].momopen)*100/totalmom
this.getListProjectPortfoliyo[i].momopenpercent=momopenpercent
let momclosepercent= Number(this.getListProjectPortfoliyo[i].momclose)*100/totalmom
this.getListProjectPortfoliyo[i].momclosepercent=momclosepercent
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
var tooltiptime='Total:'+total+'<br/>Time Pending:'+Number(this.getListProjectPortfoliyo[i].timepending)+'<br/>Time Approved:'+Number(this.getListProjectPortfoliyo[i].timeapproved)+'<br/>Time Rejected:'+Number(this.getListProjectPortfoliyo[i].timerejected)

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
  getProjectProjectDetailRevnueAndCost(data)
  {
    this.getListProjectDetailRevnureAndCost=[]
    this.Loader=true
    this.HTTP.getProjectProjectDetailRevnueAndCost(this.setDate,this.CmpCode,data,this.departmentId).subscribe(arg => {
    this.getListProjectDetailRevnureAndCost=  arg.data.table
    this.Loader=false
    this.costFirst=this.getListProjectDetailRevnureAndCost[0].cost
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
  getListProjectDetailPAndLGridList:any=[]
  getProjectProjectDetailPAndLGridList()
  {
    this.getListProjectDetailPAndLGridList=[]
    this.Loader=true
    this.HTTP.getPbiProjectDetailPAndLGridList(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
    this.getListProjectDetailPAndLGridList=  arg.data.table
    this.Loader=false
    for(var i=0;i<this.getListProjectDetailPAndLGridList.length;i++)
    {
      if(this.getListProjectDetailPAndLGridList[i].margin==null)
      {
this.getListProjectDetailPAndLGridList[i].margin=0
      }
      var margintwo=100-Number(this.getListProjectDetailPAndLGridList[i].margin)
      var marginpercent=Number(this.getListProjectDetailPAndLGridList[i].margin)
    }

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
expenseCurrentYear
expensePreviousYear
totalExpenseCurrentYearGrowthPercentimg:any
  getProjectExpenseDetailList()
  {
    this.getListExpenseDetailList=[]
    this.Loader=true
    this.HTTP.getPbiExpenseDetailList(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
    this.getListExpenseDetailList=  arg.data.table
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

if(this.customerExpenseCurrentYearGrowthPercent>=0)
{
  this.customerExpenseCurrentYearGrowthPercentimg=this.downUrl
}
else{
  this.customerExpenseCurrentYearGrowthPercentimg=this.upUrl
}


this.customerExpenseCurrentYearGrowthYoy=this.getListExpenseDetailList[0].customerExpenseCurrentYearGrowthYoy

    this.customerExpenseCurrentYearYoy=this.getListExpenseDetailList[0].customerExpenseCurrentYearYoy
    this.customerExpenseCurrentYearGrowthYoyPercent=(this.customerExpenseCurrentYearYoy-this.customerExpenseCurrentYearGrowthYoy)*100/this.customerExpenseCurrentYearGrowthYoy
    if(this.customerExpenseCurrentYearGrowthYoy==0)
    {
      this.customerExpenseCurrentYearGrowthYoyPercent=0
    }
    if(this.customerExpenseCurrentYearGrowthYoyPercent>=0)
{
  this.customerExpenseCurrentYearGrowthYoyPercentimg=this.downUrl
}
else{
  this.customerExpenseCurrentYearGrowthYoyPercentimg=this.upUrl
}

    this.customerExpensePreviousYear=this.getListExpenseDetailList[0].customerExpensePreviousYear
    this.customerExpensePreviousYearGrowth=this.getListExpenseDetailList[0].customerExpensePreviousYearGrowth
   this.customerExpensePreviousYearGrowthPercent=(this.customerExpensePreviousYear-this.customerExpensePreviousYearGrowth)*100/this.customerExpensePreviousYearGrowth
   if(this.customerExpensePreviousYearGrowth==0)
    {
      this.customerExpensePreviousYearGrowthPercent=0
    }

   if(this.customerExpensePreviousYearGrowthPercent>=0)
   {
     this.customerExpensePreviousYearGrowthPercentimg=this.downUrl
   }
   else{
     this.customerExpensePreviousYearGrowthPercentimg=this.upUrl
   }
    this.serviceProviderCurrentYear=this.getListExpenseDetailList[0].serviceProviderCurrentYear
    this.serviceProviderCurrentYearGrowth=this.getListExpenseDetailList[0].serviceProviderCurrentYearGrowth

    this.serviceProviderCurrentYearGrowthPercent=(this.serviceProviderCurrentYearGrowth-this.serviceProviderCurrentYearGrowth)*100/this.serviceProviderCurrentYearGrowth

    if(this.serviceProviderCurrentYearGrowth==0)
    {
      this.serviceProviderCurrentYearGrowthPercent=0
    }
    if(this.serviceProviderCurrentYearGrowthPercent>=0)
   {
     this.serviceProviderCurrentYearGrowthPercentimg=this.downUrl
   }
   else{
     this.serviceProviderCurrentYearGrowthPercentimg=this.upUrl
   }

   this.serviceProviderCurrentYearGrowthYoy=this.getListExpenseDetailList[0].serviceProviderCurrentYearGrowthYoy
    this.serviceProviderCurrentYearYoy=this.getListExpenseDetailList[0].serviceProviderCurrentYearYoy
    this.serviceProviderCurrentYearGrowthYoyPercent=(this.serviceProviderCurrentYearYoy-this.serviceProviderCurrentYearGrowthYoy)*100/this.serviceProviderCurrentYearGrowthYoy
    if(this.serviceProviderCurrentYearGrowthYoy==0)
    {
      this.serviceProviderCurrentYearGrowthYoyPercent=0
    }

    if(this.serviceProviderCurrentYearGrowthYoyPercent>=0)
    {
      this.serviceProviderCurrentYearGrowthYoyPercentimg=this.downUrl
    }
    else{
      this.serviceProviderCurrentYearGrowthYoyPercentimg=this.upUrl
    }
    this.serviceProviderPreviousYear=this.getListExpenseDetailList[0].serviceProviderPreviousYear

this.serviceProviderPreviousYearGrowth=this.getListExpenseDetailList[0].serviceProviderPreviousYearGrowth
    this.serviceProviderPreviousYearGrowthPercent=(this.serviceProviderPreviousYear-this.serviceProviderPreviousYearGrowth)*100/this.serviceProviderPreviousYearGrowth
    if(this.serviceProviderPreviousYearGrowth==0)
    {
      this.serviceProviderPreviousYearGrowthPercent=0
    }

    if(this.serviceProviderPreviousYearGrowthPercent>=0)
    {
      this.serviceProviderPreviousYearGrowthPercentimg=this.downUrl
    }
    else{
      this.serviceProviderPreviousYearGrowthPercentimg=this.upUrl
    }

   this.totalExpenseCurrentYear=this.getListExpenseDetailList[0].totalExpenseCurrentYear
    this.totalExpenseCurrentYearGrowth=this.getListExpenseDetailList[0].totalExpenseCurrentYearGrowth
 this.totalExpenseCurrentYearGrowthPercent=(this.totalExpenseCurrentYear-this.totalExpenseCurrentYearGrowth)*100/this.totalExpenseCurrentYearGrowth
 if(this.totalExpenseCurrentYearGrowth==0)
 {
   this.totalExpenseCurrentYearGrowthPercent=0
 }

 if(this.totalExpenseCurrentYearGrowthPercent>=0)
 {
   this.totalExpenseCurrentYearGrowthPercentimg=this.downUrl
 }
 else{
   this.totalExpenseCurrentYearGrowthPercentimg=this.upUrl
 }

    this.totalExpensePreviousYear=this.getListExpenseDetailList[0].totalExpensePreviousYear
this.totalExpensePreviousYearGrowth=this.getListExpenseDetailList[0].totalExpensePreviousYearGrowth
this.totalExpensePreviousYearGrowthPercent=(this.totalExpensePreviousYear-this.totalExpensePreviousYearGrowth)*100/this.totalExpensePreviousYearGrowth
if(this.totalExpensePreviousYearGrowth==0)
{
  this.totalExpensePreviousYearGrowthPercent=0
}

if(this.totalExpensePreviousYearGrowthPercent>=0)
{
  this.totalExpensePreviousYearGrowthPercentimg=this.downUrl
}
else{
  this.totalExpensePreviousYearGrowthPercentimg=this.upUrl
}

this.totalExpenseCurrentYearYoy=this.getListExpenseDetailList[0].totalExpenseCurrentYearYoy
this.totalExpenseCurrentYearYoyGrowth=this.getListExpenseDetailList[0].totalExpenseCurrentYearYoyGrowth
this.totalExpenseCurrentYearYoyGrowthPercent=(this.totalExpenseCurrentYearYoy-this.totalExpenseCurrentYearYoyGrowth)*100/this.totalExpenseCurrentYearYoyGrowth

if(this.totalExpenseCurrentYearYoyGrowth==0)
{
  this.totalExpenseCurrentYearYoyGrowthPercent=0
}

if(this.totalExpenseCurrentYearYoyGrowthPercent>=0)
{
  this.totalExpenseCurrentYearYoyGrowthPercentimg=this.downUrl
}
else{
  this.totalExpenseCurrentYearYoyGrowthPercentimg=this.upUrl
}

})
  }
  getListEmployeePerformance:any=[]
  getpbiPeopleEmployeePerformance(){
      let cmpcode=1
      let year='2022-02-20'
      this.getListEmployeePerformance=[]
      this.Loader=true
      this.HTTP.getPbiReportEmployeePerformance(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getListEmployeePerformance=  arg.data.table
      this.Loader=false
      this.grids.refresh()
      this.grids.refreshColumns()
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
      seriesname: "Total Employee",
    //  plottooltext: "Employee: $dataValue",
      data:this.dataEmployeeAttrition
    },

    {
      seriesname: "Percentage",
      parentyaxis: "S",
      renderas: "line",
     // plottooltext: "$dataValue subsidies received",
      showvalues: "0",
      data: this.dataEmployeeAttrition
    }
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
if(this.totalCurrentGrowthyoyPercent>=0)
{
  this.imgUrl19=this.downUrl
}
else{
  this.imgUrl19=this.upUrl
}
this.totalVendorCurrentyoyYear=this.getListData[0].totalVendorCurrentyoyYear
this.totalVendorGrowthCurrentyoyYear=this.getListData[0].totalVendorGrowthCurrentyoyYear
this.totalVendorCurrentGrowthYoyPercent=(this.totalVendorCurrentyoyYear-this.totalVendorGrowthCurrentyoyYear)*100/this.totalVendorGrowthCurrentyoyYear
if(this.totalVendorCurrentGrowthYoyPercent==0)
{
  this.totalVendorCurrentGrowthYoyPercent=0
}
if(this.totalVendorCurrentGrowthYoyPercent>=0)
{
  this.imgUrl20=this.downUrl
}
else{
  this.imgUrl20=this.upUrl
}
this.totalCurrentAdditionyoyYear=this.getListData[0].totalCurrentAdditionyoyYear
this.totalGrowthCurrentAdditionyoyYear=this.getListData[0].totalGrowthCurrentAdditionyoyYear

this.totalGrowthCurrentAdditionyoyYearPercent=(this.totalCurrentAdditionyoyYear-this.totalGrowthCurrentAdditionyoyYear)*100/this.totalGrowthCurrentAdditionyoyYear
if(this.totalAdditionGrowthYoyYearPercent==0)
{
this.totalGrowthCurrentAdditionyoyYearPercent=0
}
if(this.totalGrowthCurrentAdditionyoyYearPercent>=0)
{
  this.imgUrl21=this.downUrl
}
else{
  this.imgUrl21=this.upUrl
}
this.totalVendorCurrentAdditionyoyYear=this.getListData[0].totalVendorCurrentAdditionyoyYear
this.totalVendorGrowthCurrentAdditionyoyYear=this.getListData[0].totalVendorGrowthCurrentAdditionyoyYear
this.totalVendorGrowthCurrentAdditionyoyYearPercent=(this.totalVendorCurrentAdditionyoyYear -this.totalVendorGrowthCurrentAdditionyoyYear)*100/this.totalVendorGrowthCurrentAdditionyoyYear
if(this.totalVendorGrowthCurrentAdditionyoyYear==0)
{
this.totalVendorGrowthCurrentAdditionyoyYearPercent=0
}
if(this.totalVendorGrowthCurrentAdditionyoyYearPercent>=0)
{
  this.imgUrl22=this.downUrl
}
else{
  this.imgUrl22=this.upUrl
}
this.totalCurrentAttritionyoyYear=this.getListData[0].totalCurrentAttritionyoyYear
this.totalCurrentGrowthAttritionyoyYear=this.getListData[0].totalCurrentGrowthAttritionyoyYear
this.totalCurrentGrowthAttritionyoyYearPercent=(this.totalCurrentAttritionyoyYear-this.totalCurrentGrowthAttritionyoyYear)*100/this.totalCurrentGrowthAttritionyoyYear
if(this.totalCurrentGrowthAttritionyoyYear==0)
{
this.totalCurrentGrowthAttritionyoyYearPercent=0
}
if(this.totalCurrentGrowthAttritionyoyYearPercent>=0)
{
  this.imgUrl23=this.downUrl
}
else{
  this.imgUrl23=this.upUrl
}
this.totalVendorCurrentAttritionyoyYear=this.getListData[0].totalVendorCurrentAttritionyoyYear
this.totalVendorCurrentGrowthAttritionyoyYear=this.getListData[0].totalVendorCurrentGrowthAttritionyoyYear
this.totalVendorCurrentGrowthAttritionyoyYearPercent=(this.totalVendorCurrentAttritionyoyYear-this.totalVendorCurrentGrowthAttritionyoyYear)*100/this.totalVendorCurrentGrowthAttritionyoyYear
if(this.totalVendorCurrentGrowthAttritionyoyYear==0)
{
  this.totalVendorCurrentGrowthAttritionyoyYearPercent=0
}

if(this.totalVendorCurrentGrowthAttritionyoyYearPercent>=0)
{
  this.imgUrl24=this.downUrl
}
else{
  this.imgUrl24=this.upUrl
}











if(this.totalGrowthPrevousYearPercent==0)
{
  this.employeePercentage=0
}
else{
  this.employeePercentage =(this.totalPrevousYear-this.totalGrowthPrevousYearPercent) *100 / this.totalGrowthPrevousYearPercent

}
if(this.employeePercentage>=0)
{
  this.imgUrl=this.downUrl
}
else{
  this.imgUrl=this.upUrl
}
if(this.currentGrowthYearPercent==0)
{
this.employeePerviousYearpercentage=0
}
else{
  this.employeePerviousYearpercentage=(this.valcurrentYear-this.currentGrowthYearPercent)*100/this.currentGrowthYearPercent

}
if(this.employeePerviousYearpercentage>=0)
{
  this.imgUrl1=this.downUrl
}
else{
  this.imgUrl1=this.upUrl
}

if(this.totalGrowthYoyYearPercent==0)
{
this.employeeyoyprecentage=0
}
else{
  this.employeeyoyprecentage=(this.totalyoyYear-this.totalGrowthYoyYearPercent)/this.totalGrowthYoyYearPercent*100

}
if(this.employeeyoyprecentage>=0)
{
  this.imgUrl2=this.downUrl
}
else{
  this.imgUrl2=this.upUrl
}
if( this.totalGrowthAdditionPreviousYearPercent==0)
{
  this.employeeAdditionPercentage=0
}
else{
  this.employeeAdditionPercentage=(this.totalAdditionPreviousYear-this.totalGrowthAdditionPreviousYearPercent)*100/this.totalGrowthAdditionPreviousYearPercent

}
if(this.employeeAdditionPercentage>=0)
{
  this.imgUrl3=this.downUrl
}
else{
  this.imgUrl3=this.upUrl
}
if(this.currentGrowthAddtionYearPercent==0)
{
  this.employeeAdditionCurrentYearPercentage=0
}
else{
this.employeeAdditionCurrentYearPercentage=(this.currentAddtionYear-this.currentGrowthAddtionYearPercent)*100/this.currentGrowthAddtionYearPercent

}
if(this.employeeAdditionCurrentYearPercentage>=0)
{
  this.imgUrl4=this.downUrl
}
else{
  this.imgUrl4=this.upUrl
}
if(this.totalAdditionGrowthYoyYearPercent==0)
{
  this.employeeAdditionyoypercentage=0
}
else{
  this.employeeAdditionyoypercentage=(this.totalAdditionyoyYear-this.totalAdditionGrowthYoyYearPercent)*100/this.totalAdditionGrowthYoyYearPercent

}
if(this.employeeAdditionyoypercentage>=0)
{
  this.imgUrl5=this.downUrl
}
else{
  this.imgUrl5=this.upUrl
}

if(this.totalGrowthattritionPerviousYearPercent==0)
{
  this.employeeAttritionPercentage=0
}
else{
  this.employeeAttritionPercentage=(this.totalattritionPerviousYear-this.totalGrowthattritionPerviousYearPercent)*100/this.totalattritionPerviousYear

}
if(this.employeeAttritionPercentage>=0)
{
  this.imgUrl6=this.downUrl
}
else{
  this.imgUrl6=this.upUrl
}
if(this.currentGrowthattritionYearPercent==0)
{
this.employeeAttritionCurrentPercent=0
}
else{
  this.employeeAttritionCurrentPercent=(this.currentattritionYear-this.currentGrowthattritionYearPercent)*100/this.currentGrowthattritionYearPercent
}
if(this.employeeAttritionCurrentPercent>=0)
{
  this.imgUrl7=this.downUrl
}
else{
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
if(this.employeeAttritionYoyPercentage>=0)
{
  this.imgUrl8=this.downUrl
}
else{
  this.imgUrl8=this.upUrl
}
if(this.totalVendorGrowthPrevoisYearPercent==0)
{
  this.VendorPreviousPercentage=0
}
else{
this.VendorPreviousPercentage=(this.totalVendorPrevoisYear-this.totalVendorGrowthPrevoisYearPercent)*100/this.totalVendorGrowthPrevoisYearPercent

}
if(this.VendorPreviousPercentage>=0)
{
  this.imgUrl9=this.downUrl
}
else{
  this.imgUrl9=this.upUrl
}

if(this.currentGrowthVendorYearPercent==0)
{
  this.VendorCurrentYearPercentage=0
}
else{
this.VendorCurrentYearPercentage=(this.currentVendorYear-this.currentGrowthVendorYearPercent)*100/this.currentGrowthVendorYearPercent
}
if(this.VendorCurrentYearPercentage>=0)
{
  this.imgUrl10=this.downUrl
}
else{
  this.imgUrl10=this.upUrl
}
if(this.totalVendorGrowthYoyYearPercent==0)
{
  this.VendorYoyPercentage=0
}
else{
this.VendorYoyPercentage=(this.totalVendoryoyYear-this.totalVendorGrowthYoyYearPercent)*100/this.totalVendorGrowthYoyYearPercent

}
if(this.VendorYoyPercentage>=0)
{
  this.imgUrl11=this.downUrl
}
else{
  this.imgUrl11=this.upUrl
}
if(this.totalGrowthAdditionVendorPreviousYearPercent==0)
{
  this.VendorAddtionprevousPercentage=0
}
else{
this.VendorAddtionprevousPercentage=(this.totalAdditionVendorPreviousYear-this.totalGrowthAdditionVendorPreviousYearPercent)*100/this.totalGrowthAdditionVendorPreviousYearPercent
}
if(this.VendorAddtionprevousPercentage>=0)
{
  this.imgUrl12=this.downUrl
}
else{
  this.imgUrl12=this.upUrl
}
if(this.currentGrowthVendorAddtionYearPercent==0)
{
  this.VendorAddtionCurrentPercentage=0
}
else{
this.VendorAddtionCurrentPercentage=(this.currentVendorAddtionYear-this.currentGrowthVendorAddtionYearPercent)*100/this.currentGrowthVendorAddtionYearPercent
}
if(this.VendorAddtionCurrentPercentage>=0)
{
  this.imgUrl13=this.downUrl
}
else{
  this.imgUrl13=this.upUrl
}
if(this.totalVendorAdditionGrowthYoyYearPercent==0)
{
  this.VendorAddtionYoyPercentage=0
}
else{
this.VendorAddtionYoyPercentage=(this.totalVendorAdditionyoyYear-this.totalVendorAdditionGrowthYoyYearPercent)*100/this.totalVendorAdditionGrowthYoyYearPercent
}
if(this.VendorAddtionYoyPercentage>=0)
{
  this.imgUrl14=this.downUrl
}
else{
  this.imgUrl14=this.upUrl
}
if(this.totalGrowthVendorattritionYearPercent==0)
{
  this.VendorAttritionPercentage=0
}
else{
this.VendorAttritionPercentage=(this.totalVendorattritionYear-this.totalGrowthVendorattritionYearPercent)*100/this.totalGrowthVendorattritionYearPercent
}
if(this.VendorAttritionPercentage>=0)
{
  this.imgUrl15=this.downUrl
}
else{
  this.imgUrl15=this.upUrl
}
if(this.totalGrowthVendorattritionYearPercent==0)
{
  this.currentVendorAttritionPercentage=0
}
else{
this.currentVendorAttritionPercentage=(this.currentVendorAttritionYear-this.currentGrowthVendorattritionYearPercent)*100/this.currentGrowthVendorattritionYearPercent
}
if(this.currentVendorAttritionPercentage>=0)
{
  this.imgUrl16=this.downUrl
}
else{
  this.imgUrl16=this.upUrl
}
if(this.totalVendorAttritionGrowthYoyYearPercent==0)
{
  this.currentVendorAttritionYoyPercentage=0
}
else{
this.currentVendorAttritionYoyPercentage=(this.totalVendorAttritionyoyYear-this.totalVendorAttritionGrowthYoyYearPercent)*100/this.totalVendorAttritionGrowthYoyYearPercent
}
if(this.currentVendorAttritionYoyPercentage>=0)
{
  this.imgUrl17=this.downUrl
}
else{
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
  getpbiProjectDetailList(){
    let cmpcode=1
    let year='2022-02-20'
    this.getProjectListData=[]
    this.Loader=true
    this.HTTP.getPbiProjectDetail(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
this.Loader=false
  this.getProjectListData=  arg.data.table
 // if(this.getProjectListData>=0)
  //{

this.avgLeavePercent=this.getProjectListData[0].avgLeavePercent
this.avgLeaveTotal=this.getProjectListData[0].avgLeaveTotal
this.avgLeaveTotalPercentage=(this.avgLeaveTotal-this.avgLeavePercent)*100/this.avgLeavePercent
if(this.avgLeavePercent==0)
{
this.avgLeaveTotalPercentage=0
}


if(this.avgLeaveTotalPercentage>=0)
{
  this.imgavgLeaveTotalPercentage=this.downUrl
}
else{
  this.imgavgLeaveTotalPercentage=this.upUrl
}

this.cost =this.getProjectListData[0].cost
this.costPercentageGrowth=this.getProjectListData[0].costPercentageGrowth
this.costPercentageGrowthValue=(this.cost-this.costPercentageGrowth)*100/this.costPercentageGrowth
if(this.costPercentageGrowth==0)
{
  this.costPercentageGrowthValue=0
}
if(this.costPercentageGrowthValue>=0)
{
  this.imgcostPercentageGrowthValue=this.downUrl
}
else{
  this.imgcostPercentageGrowthValue=this.upUrl
}
this.leaveTotalYoy=this.getProjectListData[0].leaveTotalYoy
this.leaveTotalYoyPercent=this.getProjectListData[0].leaveTotalYoyPercent
this.leaveTotalYoyPercentGrowth=(this.leaveTotalYoy-this.leaveTotalYoyPercent)*100/this.leaveTotalYoyPercent
if(this.leaveTotalYoyPercent==0)
{
this.leaveTotalYoyPercentGrowth=0
}
if(this.leaveTotalYoyPercentGrowth>=0)
{
  this.imgleaveTotalYoyPercentGrowth=this.downUrl
}
else{
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
if(this.nonBillableResourceTotalPercentGrowth>=0)
{
  this.imgnonBillableResourceTotalPercentGrowth=this.downUrl
}
else{
  this.imgnonBillableResourceTotalPercentGrowth=this.upUrl
}
this.nonBillableResourceTotalYoy=this.getProjectListData[0].nonBillableResourceTotalYoy
this.nonBillableResourceTotalYoyPercent=this.getProjectListData[0].nonBillableResourceTotalYoyPercent
this.nonBillableResourceTotalYoyPercentGrowth=(this.nonBillableResourceTotalYoy-this.nonBillableResourceTotalYoyPercent)*100/this.nonBillableResourceTotalYoyPercent
if(this.nonBillableResourceTotalYoyPercent==0)
{
  this.nonBillableResourceTotalYoyPercentGrowth=0
}

if(this.nonBillableResourceTotalYoyPercentGrowth>=0)
{
  this.imgnonBillableResourceTotalYoyPercentGrowth=this.downUrl
}
else{
  this.imgnonBillableResourceTotalYoyPercentGrowth=this.upUrl
}
this.onBenchTotalYoy=this.getProjectListData[0].onBenchTotalYoy
this.OnBenchTotalYoyPercent=this.getProjectListData[0].onBenchTotalYoyPercent
this.onBenchTotalYoyPercentGrowth=(this.onBenchTotalYoy-this.OnBenchTotalYoyPercent)*100/this.OnBenchTotalYoyPercent
if(this.OnBenchTotalYoyPercent==0)
{
  this.onBenchTotalYoyPercentGrowth=0
}

if(this.onBenchTotalYoyPercentGrowth>=0)
{
  this.imgonBenchTotalYoyPercentGrowth=this.downUrl
}
else{
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

if(this.revenueCostTotalYoyPercentGrowth>=0)
{
  this.imgrevenueCostTotalYoyPercentGrowth=this.downUrl
}
else{
  this.imgrevenueCostTotalYoyPercentGrowth=this.upUrl
}
this.revenuePercentageGrowth=this.getProjectListData[0].revenuePercentageGrowth
this.revenuePercentageGrowthPercent=(this.revenue-this.revenuePercentageGrowth)*100/this.revenuePercentageGrowthPercent
if(this.revenuePercentageGrowth==0)
{
  this.revenuePercentageGrowthPercent=0
}
if(this.revenuePercentageGrowthPercent>=0)
{
  this.imgrevenuePercentageGrowthPercent=this.downUrl
}
else{
  this.imgrevenuePercentageGrowthPercent=this.upUrl
}

this.serviceProviderTotalResource=this.getProjectListData[0].serviceProviderTotalResource
this.serviceProviderTotalResourcePercentage=this.getProjectListData[0].serviceProviderTotalResourcePercentage
this.serviceProviderTotalResourcePercentageGrowth=(this.serviceProviderTotalResource-this.serviceProviderTotalResourcePercentage)*100/this.serviceProviderTotalResourcePercentage
if(this.serviceProviderTotalResourcePercentage==0)
  {
    this.serviceProviderTotalResourcePercentageGrowth=0
  }
  if(this.serviceProviderTotalResourcePercentageGrowth>=0)
{
  this.imgserviceProviderTotalResourcePercentageGrowth=this.downUrl
}
else{
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
if(this.totalGrowthCloseProjectPercentGrowth>=0)
{
  this.imgtotalGrowthCloseProjectPercentGrowth=this.downUrl
}
else{
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
if(this.totalLeaveResourcePercentGrowth>=0)
{
  this.imgtotalLeaveResourcePercentGrowth=this.downUrl
}
else{
  this.imgtotalLeaveResourcePercentGrowth=this.upUrl
}
this.totalOpenProject=this.getProjectListData[0].totalOpenProject
this.totalGrowthOpenProjectPercentGrowth=(this.totalOpenProject-this.totalGrowthOpenProjectPercent)*100/this.totalGrowthOpenProjectPercent
if(this.totalGrowthOpenProjectPercent==0)
{
  this.totalGrowthOpenProjectPercentGrowth=0
}
if(this.totalGrowthOpenProjectPercentGrowth>=0)
{
  this.imgtotalGrowthOpenProjectPercentGrowth=this.downUrl
}
else{
  this.imgtotalGrowthOpenProjectPercentGrowth=this.upUrl
}
this.totalResourcePercent=this.getProjectListData[0].totalResourcePercent
this.totalResourcePercentGrowth=(this.totalResource-this.totalResourcePercent)*100/this.totalResourcePercent
if(this.totalResourcePercent==0)
{
  this.totalResourcePercentGrowth=0

}
if(this.totalResourcePercentGrowth>=0)
{
  this.imgtotalResourcePercentGrowth=this.downUrl
}
else{
  this.imgtotalResourcePercentGrowth=this.upUrl
}
this.totalResourcePercentGrowthPercentGrowth=(this.totalResourcePercent-this.totalResourcePercentGrowth)*100/this.totalResourcePercentGrowth
if(this.totalResourcePercentGrowth==0)
{
  this.totalResourcePercentGrowthPercentGrowth=0
}
if(this.totalResourcePercentGrowthPercentGrowth>=0)
{
  this.imgtotalResourcePercentGrowthPercentGrowth=this.downUrl
}
else{
  this.imgtotalResourcePercentGrowthPercentGrowth=this.upUrl
}

this.totalProjectyoyYear=this.getProjectListData[0].totalProjectyoyYear
this.totalGrowthProjectYoyYearPercent=this.getProjectListData[0].totalGrowthProjectYoyYearPercent
this.totalGrowthProjectYoyYearPercentGrowth=(this.totalProjectyoyYear-this.totalGrowthProjectYoyYearPercent)*100/this.totalGrowthOpenProjectPercent
if(this.totalGrowthProjectYoyYearPercent==0)
{
  this.totalGrowthProjectYoyYearPercentGrowth=0
}
if(this.totalGrowthProjectYoyYearPercentGrowth>=0)
{
  this.imgtotalGrowthProjectYoyYearPercentGrowth=this.downUrl
}
else{
  this.imgtotalGrowthProjectYoyYearPercentGrowth=this.upUrl
}

this.vendorTotalResource=this.getProjectListData[0].vendorTotalResource
this.vendorTotalResourcePercentage=this.getProjectListData[0].vendorTotalResourcePercentage
this.vendorTotalResourcePercentageGrowth=(this.vendorTotalResource-this.vendorTotalResourcePercentage)*100/this.vendorTotalResourcePercentage
if(this.vendorTotalResourcePercentage==0)
{
  this.vendorTotalResourcePercentageGrowth=0
}
if(this.vendorTotalResourcePercentageGrowth>=0)
{
  this.imgvendorTotalResourcePercentageGrowth=this.downUrl
}
else{
  this.imgvendorTotalResourcePercentageGrowth=this.upUrl
}
this.vendorTotalYoy=this.getProjectListData[0].vendorTotalYoy
this.vendorTotalYoyPercent=this.getProjectListData[0].vendorTotalYoyPercent
this.vendorTotalYoyPercentGrowth=(this.vendorTotalYoy-this.vendorTotalYoyPercent)*100/this.vendorTotalYoyPercent
if(this.vendorTotalYoyPercent==0)
{
  this.vendorTotalYoyPercentGrowth=0

}
if(this.vendorTotalYoyPercentGrowth>=0)
{
  this.imgvendorTotalYoyPercentGrowth=this.downUrl
}
else{
  this.imgvendorTotalYoyPercentGrowth=this.upUrl
}

this.onBenchTotalResource=this.getProjectListData[0].onBenchTotalResource;
//this.onBenchTotalResouPercent=this.getProjectListData[0].onBenchTotalResourcePercent;
this.onBenchTotalResouPercent=0;
this.onBenchTotalResourcePercentGrowth=(this.onBenchTotalResource-this.onBenchTotalResouPercent)/this.onBenchTotalResource
(this.onBenchTotalResouPercent==0)
{
  this.onBenchTotalResourcePercentGrowth=0
}
if(this.onBenchTotalResourcePercentGrowth>=0)
{
  this.imgonBenchTotalResourcePercentGrowth=this.downUrl
}
else{
  this.imgonBenchTotalResourcePercentGrowth=this.upUrl
}
this.billableResourceTotalPercent=this.getProjectListData[0].billableResourceTotalPercent
this.billableResourceTotalPercent=0;
//this.billableResourceTotalPercentGrowth=(this.billableResourceTotal-this.billableResourceTotalPercent)*100/this.getProjectListData[0].billableResourceTotalPercent
(this.billableResourceTotalPercent==0)
{
  this.billableResourceTotalPercentGrowth=0
}
if(this.billableResourceTotalPercentGrowth>=0)
{
  this.imgbillableResourceTotalPercentGrowth=this.downUrl
}
else{
  this.imgbillableResourceTotalPercentGrowth=this.upUrl
}
  //}
    })
  }
  getDate:any
  setDate:any
  monthName:any
  changeDate(e)
  {
var date=e.target.value
let latest_date =this. datepipe. transform(new Date(date), 'yyyy-MM-dd');
this.setDate=latest_date
let getdate = new Date(date); // 2020-06-21.
let shortMonth = getdate. toLocaleString('en-us', { month: 'short' }); /* Jun */
this.monthName=shortMonth
this.getpbiPeopleDetailList()
this.getpbiPeopleTenureWiseEmployee()
this.getpbiPeopleResources()
this.getpbiPeopleEmployeeVsVendor()

this.getpbiPeopleDesignation()
this.getpbiExpenseDepartment()
this.getpbiExpense()
this.getpbiSpenderWise()
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
this.getPbiProjectInNumber()
this.getPbiProjectInNumberInCost()
this.getPbiProjectInNumberInCostLeave()
this.getpbiExpenseProject()

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
    this.category=[]
    this.deployeeList=[]
    this.employeeList=[]
this.Loader=true
    this.HTTP.getPbiPeopleResources(this.setDate,this.CmpCode,this.departmentId).subscribe(arg => {
      this.getResourcesDetail=arg.data.table
      this.Loader=false
//       deployeeproject: 10
// mm: 9
// monthNames: "September"
// totalemployee: 60
// yy: 2021
if(this.getResourcesDetail.length>=0)
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







