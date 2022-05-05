import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExcelExportProperties, GridComponent } from '@syncfusion/ej2-angular-grids';
import { AnimationModel, FontModel } from '@syncfusion/ej2-angular-progressbar';
import { GroupModel } from '@syncfusion/ej2-angular-schedule';
import { ToasterService } from '../toaster/toaster.service';


type AOA = any[][];


@Component({
  selector: 'app-power-bireport',
  templateUrl: './power-bireport.component.html',
  styleUrls: ['./power-bireport.component.scss']
})
export class PowerBIReportComponent implements OnInit {

  public selectedDate: Date = new Date(2021, 3, 4);
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
      "numberPrefix": "$",
      "bgColor": "#ffffff",
      "startingAngle": "100",
      "showLegend": "1",
      "defaultCenterLabel": "Total revenue: $64.08K",
      "centerLabel": "Revenue from $label: $value",
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
      "label": "Traffic",
      "value": "2000"
  }, {
      "label": "Family",
      "value": "1800"
  }, {
      "label": "Public",
      "value": "1600"
  }, {
      "label": "Weather",
      "value": "1400"
  }, {
      "label": "Emergency",
      "value": "1200"
  }, {
      "label": "Others",
      "value": "1000"
  }]
  };


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
      'paletteColors' :'7bb7ed, e4d556, 2b8f8d, f55d5c, 93e8e1',
      "theme": "fusion"
    },
    "data": [{
        "label": "Travel",
        "value": "28504"
      },
      {
        "label": "Customer Welfare",
        "value": "14633"
      },
      {
        "label": "Food",
        "value": "10507"
      },
      {
        "label": "Fuel/Mileage",
        "value": "4910"
      },
      {
        "label": "Office Supplies",
        "value": "4910"
      }
    ]
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
      },
      {
        "label": "Emergency",
        "value": "140"
      },
      {
        "label": "Others",
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



  tentureDetails = {
    chart: {
      caption: "",
      pyaxisname: "Monthly Active Users [MAU]",
      syaxisname: "Growth Ratio",
      numbersuffix: "M",
      numdivlines: "7",
      adjustdiv: "0",
      syaxismaxvalue: "5",
      syaxisminvalue: "-3",
      yaxisminvalue: "-30",
      yaxismaxvalue: "30",
      theme: "fusion",
      drawcustomlegendicon: "1",
      plottooltext: "$label, $seriesname: $dataValue",
      palettecolors: "#7cb5ec,#ed8f1d"
    },
    categories: [
      {
        category: [
          {
            label: "January"
          },
          {
            label: "February"
          },
          {
            label: "March"
          },
          {
            label: "April"
          },
          {
            label: "May"
          },
          {
            label: "June"
          }
        ]
      }
    ],
    dataset: [
      {
        dataset: [
          {
            seriesname: "Churned",
            data: [
              {
                value: "-8"
              },
              {
                value: "-7"
              },
              {
                value: "-5"
              },
              {
                value: "-21"
              },
              {
                value: "-23"
              },
              {
                value: "-15"
              }
            ]
          },
          {
            seriesname: "New",
            data: [
              {
                value: "8"
              },
              {
                value: "8"
              },
              {
                value: "22"
              },
              {
                value: "24"
              },
              {
                value: "14"
              },
              {
                value: "4"
              }
            ]
          }
        ]
      }
    ],

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
  public height: string = '240px';
  public fields: Object = { text: 'text', value: 'value' };
  public item: number[] = [1, 2, 3, 4, 5];
  roleIds: any;
  UserType: any



  constructor(

  ) { }
  ngOnInit(): void {

    this.Planwk1 = [
      {
        field: 'wK1_Week40feeet',
        headerText: 'Open',


      },
      {
        field: 'wK1_Week20Feet',
        headerText: 'Pending',

      },
      {
        field: 'wK1_ConfirmFourtyFeet',
        headerText: 'Close',


      },

    ]
    this.Planwk2 = [
      {
        field: 'wK2_Week40feeet',
        headerText: 'Open',



      },
      {
        field: 'wK2_Week20Feet',
        headerText: 'WIP',

      },
      {
        field: 'wK2_ConfirmFourtyFeet',
        headerText: 'Close',


      },
    ]
    this.Planwk3 = [
      {
        field: 'wK3_Week40feeet',
        headerText: 'Open',


      },
      {
        field: 'wK3_Week20Feet',
        headerText: 'Close',

      },
    ]
    this.Planwk4 = [
      {
        field: 'wK4_Week40feeet',
        headerText: 'Approved',


      },
      {
        field: 'wK4_Week20Feet',
        headerText: 'Reject',

      },
    ];
  }
 




}